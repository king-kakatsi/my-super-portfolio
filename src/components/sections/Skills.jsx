import { ChartBar, Code, DeviceMobile, Globe, Database, Wrench, Question, Stack, Cloud, Table, Users, HardDrives } from '@phosphor-icons/react';

/**
 * Skills Section
 * Displays project statistics and skills organized by category from database
 */
const Skills = ({ projects, skills }) => {
  // Calculate project statistics from real data
  const totalProjects = projects?.length || 0;
  const webProjects = projects?.filter(p => p.category?.toUpperCase() === 'WEB')?.length || 0;
  const mobileProjects = projects?.filter(p => p.category?.toUpperCase() === 'MOBILE')?.length || 0;

  // Create skill ID to skill object mapping for efficient lookups
  const skillIdToSkill = {};
  const skillNameToSkill = {};
  skills?.forEach(skill => {
    skillIdToSkill[skill.id] = skill;
    skillNameToSkill[skill.name] = skill;
  });

  // Count projects by technology (handles both IDs and names for backward compatibility)
  const techCounts = {};
  projects?.forEach(project => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach(tech => {
        // Check if tech is an ID or a name
        const skill = skillIdToSkill[tech] || skillNameToSkill[tech];
        if (skill) {
          techCounts[skill.id] = (techCounts[skill.id] || 0) + 1;
        }
      });
    }
  });

  // Categorize skills based on their category field from database
  const categorizedSkills = {
    mobile: [],
    frontend: [],
    backend: [],
    fullstack: [],
    database: [],
    infrastructure: [],
    orm: [],
    tools: [],
    soft: [],
    others: []
  };

  // Group skills by their category and add project counts
  skills?.forEach(skill => {
    const skillWithCount = {
      ...skill,
      count: techCounts[skill.id] || 0
    };
    
    const category = skill.category?.toLowerCase();
    
    // Map to our category structure
    if (categorizedSkills.hasOwnProperty(category)) {
      categorizedSkills[category].push(skillWithCount);
    } else {
      // Put in "others" if category not recognized
      categorizedSkills.others.push(skillWithCount);
    }
  });

  // Sort each category by proficiency (if available) or count
  Object.keys(categorizedSkills).forEach(category => {
    categorizedSkills[category].sort((a, b) => {
      // First sort by proficiency if available
      if (a.proficiency && b.proficiency) {
        return b.proficiency - a.proficiency;
      }
      // Then by project count
      return b.count - a.count;
    });
  });

  // Category configurations
  const categories = [
    {
      id: 'mobile',
      title: 'Mobile Development',
      icon: DeviceMobile,
      gradient: 'from-purple-600/20 via-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      hoverBorder: 'hover:border-purple-500/60',
      iconColor: 'text-purple-500',
      skills: categorizedSkills.mobile
    },
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: Globe,
      gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/60',
      iconColor: 'text-blue-500',
      skills: categorizedSkills.frontend
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: HardDrives,
      gradient: 'from-wine/20 via-wine/10 to-transparent',
      borderColor: 'border-wine/30',
      hoverBorder: 'hover:border-wine/60',
      iconColor: 'text-wine',
      skills: categorizedSkills.backend
    },
    {
      id: 'fullstack',
      title: 'Fullstack Development',
      icon: Stack,
      gradient: 'from-orange-600/20 via-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      hoverBorder: 'hover:border-orange-500/60',
      iconColor: 'text-orange-500',
      skills: categorizedSkills.fullstack
    },
    {
      id: 'database',
      title: 'Databases',
      icon: Database,
      gradient: 'from-yellow-600/20 via-yellow-500/10 to-transparent',
      borderColor: 'border-yellow-500/30',
      hoverBorder: 'hover:border-yellow-500/60',
      iconColor: 'text-yellow-500',
      skills: categorizedSkills.database
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure & Cloud',
      icon: Cloud,
      gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-cyan-500/30',
      hoverBorder: 'hover:border-cyan-500/60',
      iconColor: 'text-cyan-500',
      skills: categorizedSkills.infrastructure
    },
    {
      id: 'orm',
      title: 'ORM & Data Access',
      icon: Table,
      gradient: 'from-pink-600/20 via-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      hoverBorder: 'hover:border-pink-500/60',
      iconColor: 'text-pink-500',
      skills: categorizedSkills.orm
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      icon: Wrench,
      gradient: 'from-green-600/20 via-green-500/10 to-transparent',
      borderColor: 'border-green-500/30',
      hoverBorder: 'hover:border-green-500/60',
      iconColor: 'text-green-500',
      skills: categorizedSkills.tools
    },
    {
      id: 'soft',
      title: 'Soft Skills',
      icon: Users,
      gradient: 'from-teal-600/20 via-teal-500/10 to-transparent',
      borderColor: 'border-teal-500/30',
      hoverBorder: 'hover:border-teal-500/60',
      iconColor: 'text-teal-500',
      skills: categorizedSkills.soft
    },
    {
      id: 'others',
      title: 'Other Skills',
      icon: Question,
      gradient: 'from-gray-600/20 via-gray-500/10 to-transparent',
      borderColor: 'border-gray-500/30',
      hoverBorder: 'hover:border-gray-500/60',
      iconColor: 'text-gray-400',
      skills: categorizedSkills.others
    }
  ];

  /**
   * Get technology icon URL from Simple Icons CDN
   * 
   * **Dynamic Icon Color Support**
   * Returns icon URL with specified color. Color should be a hex code without the #.
   * 
   * @param {string} techName - Technology name
   * @param {string} color - Hex color code (without #) or Tailwind color class converted to hex
   * @returns {string} Icon URL
   */
  const getTechIcon = (techName, color = '9333EA') => {
    const iconMap = {
      'React': 'react',
      'React.js': 'react',
      'React Native': 'react',
      'Vue': 'vuedotjs',
      'Vue.js': 'vuedotjs',
      'Angular': 'angular',
      'JavaScript': 'javascript',
      'TypeScript': 'typescript',
      'Node.js': 'nodedotjs',
      'Node': 'nodedotjs',
      'Python': 'python',
      'Java': 'openjdk',
      'C#': 'csharp',
      'PHP': 'php',
      'Ruby': 'ruby',
      'Go': 'go',
      'Rust': 'rust',
      'Swift': 'swift',
      'Kotlin': 'kotlin',
      'Flutter': 'flutter',
      'Dart': 'dart',
      'Android': 'android',
      'iOS': 'apple',
      'HTML': 'html5',
      'HTML5': 'html5',
      'CSS': 'css3',
      'CSS3': 'css3',
      'HTML/CSS': 'html5',
      'Tailwind': 'tailwindcss',
      'Tailwind CSS': 'tailwindcss',
      'Bootstrap': 'bootstrap',
      'Sass': 'sass',
      'SCSS': 'sass',
      'MongoDB': 'mongodb',
      'MySQL': 'mysql',
      'PostgreSQL': 'postgresql',
      'Redis': 'redis',
      'Firebase': 'firebase',
      'Supabase': 'supabase',
      'Docker': 'docker',
      'Kubernetes': 'kubernetes',
      'Git': 'git',
      'GitHub': 'github',
      'GitLab': 'gitlab',
      'AWS': 'amazonaws',
      'Azure': 'microsoftazure',
      'GCP': 'googlecloud',
      'Google Cloud': 'googlecloud',
      'Vercel': 'vercel',
      'Netlify': 'netlify',
      'Next.js': 'nextdotjs',
      'Next': 'nextdotjs',
      'Nuxt': 'nuxtdotjs',
      'Nuxt.js': 'nuxtdotjs',
      'Express': 'express',
      'Express.js': 'express',
      'NestJS': 'nestjs',
      'Django': 'django',
      'Flask': 'flask',
      'Laravel': 'laravel',
      'Spring': 'spring',
      'GraphQL': 'graphql',
      'REST API': 'fastapi',
      'Webpack': 'webpack',
      'Vite': 'vite',
      'Babel': 'babel',
      'ESLint': 'eslint',
      'Prettier': 'prettier',
      'Jest': 'jest',
      'Cypress': 'cypress',
      'Figma': 'figma',
      'Adobe XD': 'adobexd',
      'Sketch': 'sketch',
      'Postman': 'postman',
      'VS Code': 'visualstudiocode',
      'Hive': 'hive',
      'AI Models': 'openai',
      'MERN Stack': 'mongodb',
    };

    const slug = iconMap[techName] || techName.toLowerCase().replace(/\s+/g, '').replace(/\./g, 'dot');
    return `https://cdn.simpleicons.org/${slug}/${color}`;
  };

  /**
   * Convert Tailwind color class to hex code
   * 
   * **Color Mapping Helper**
   * Maps common Tailwind color classes to their hex equivalents for use with Simple Icons.
   * 
   * @param {string} colorClass - Tailwind color class (e.g., 'text-purple-500')
   * @returns {string} Hex color code without #
   */
  const getColorHex = (colorClass) => {
    const colorMap = {
      'text-purple-500': '9333EA',
      'text-blue-500': '3B82F6',
      'text-wine': '8B1538',
      'text-orange-500': 'F97316',
      'text-yellow-500': 'EAB308',
      'text-cyan-500': '06B6D4',
      'text-pink-500': 'EC4899',
      'text-green-500': '22C55E',
      'text-teal-500': '14B8A6',
      'text-gray-400': '9CA3AF',
    };
    return colorMap[colorClass] || '9333EA';
  };

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
            <Code weight="bold" className="text-wine" />
            <span className="uppercase tracking-widest text-sm font-medium">Skills & Stats</span>
          </div>
          <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
            Skills & Expertise
          </h2>
        </div>

        {/* Stats Block */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ChartBar weight="bold" className="text-3xl text-wine" />
            <h3 className="text-2xl font-bold text-text-bright">Project Statistics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 dark:bg-gray-800 bg-gray-100 p-10 rounded-lg">
            {/* Total Projects */}
            <div className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-accent/50 transition-all duration-300 group">
              <p className="text-5xl md:text-6xl font-bold text-wine mb-2 group-hover:scale-110 transition-transform origin-left">
                {totalProjects}
              </p>
              <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
                Total Projects
              </p>
            </div>

            {/* Web Projects */}
            <div className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-accent/50 transition-all duration-300 group">
              <p className="text-5xl md:text-6xl font-bold text-wine mb-2 group-hover:scale-110 transition-transform origin-left">
                {webProjects}
              </p>
              <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
                Web Applications
              </p>
            </div>

            {/* Mobile Projects */}
            <div className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/10 hover:border-wine/50 transition-all duration-300 group">
              <p className="text-5xl md:text-6xl font-bold text-wine mb-2 group-hover:scale-110 transition-transform origin-left">
                {mobileProjects}
              </p>
              <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
                Mobile Applications
              </p>
            </div>
          </div>
        </div>

        {/* Skills by Category */}
        <div className="space-y-8">
          {categories.map((category, categoryIndex) => (
            category.skills.length > 0 && (
              <div 
                key={category.id}
                className={`animate-card-3 opacity-0 translate-y-[100px] relative overflow-hidden rounded-3xl border ${category.borderColor} ${category.hoverBorder} transition-all duration-500 group`}
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8 md:p-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} border ${category.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon weight="bold" className={`text-3xl ${category.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-text-bright">{category.title}</h3>
                      <p className="text-text-muted text-sm mt-1">
                        {category.skills.length} {category.skills.length === 1 ? 'skill' : 'skills'}
                      </p>
                    </div>
                  </div>

                  {/* Skill Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div 
                        key={skillIndex}
                        className="p-5 rounded-xl bg-base-tint/40 backdrop-blur-sm border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/30 dark:hover:border-white/30 hover:border-gray-400/50 hover:bg-base-tint/60 transition-all duration-300 group/card"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-14 h-14 rounded-full bg-white/10 dark:bg-white/10 bg-gray-200/50 flex items-center justify-center mb-3 group-hover/card:bg-white/20 dark:group-hover/card:bg-white/20 group-hover/card:bg-gray-300/50 transition-colors p-2.5">
                            <img 
                              src={getTechIcon(skill.name, getColorHex(category.iconColor))} 
                              alt={skill.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `<svg class="w-7 h-7 ${category.iconColor}" fill="currentColor" viewBox="0 0 256 256"><path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path></svg>`;
                              }}
                            />
                          </div>
                          <h4 className="text-base font-bold text-text-bright leading-tight">{skill.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
