import { ChartBar, Code, Users } from '@phosphor-icons/react';

/**
 * Skills Section
 * Displays project statistics, technical skills, and soft skills
 * Organized into three main blocks
 */
const Skills = ({ projects, skills: skillsProp }) => {
  // Calculate project statistics
  const totalProjects = projects?.length || 0;
  const webProjects = projects?.filter(p => p.category === 'Web').length || 0;
  const mobileProjects = projects?.filter(p => p.category === 'Mobile').length || 0;

  // Count projects by technology stack
  const stackCounts = {};
  projects?.forEach(project => {
    project.technologies?.forEach(tech => {
      stackCounts[tech] = (stackCounts[tech] || 0) + 1;
    });
  });

  // Get top 6 technologies
  const topStacks = Object.entries(stackCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, count]) => ({ name, count }));

  // Separate skills by category
  const technicalSkills = skillsProp?.filter(s => 
    ['frontend', 'backend', 'fullstack', 'mobile', 'tools'].includes(s.category)
  ) || [];
  
  const softSkills = skillsProp?.filter(s => s.category === 'soft') || [];

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
            <Code weight="bold" className="text-accent" />
            <span className="uppercase tracking-widest text-sm font-medium">Skills & Stats</span>
          </div>
          <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
            Expertise & Achievements
          </h2>
        </div>

        {/* Stats Block */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <ChartBar weight="bold" className="text-3xl text-accent" />
            <h3 className="text-2xl font-bold text-text-bright">Project Statistics</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Projects */}
            <div className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/10 hover:border-accent/50 transition-all duration-300 group">
              <p className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform origin-left">
                {totalProjects}
              </p>
              <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
                Total Projects
              </p>
            </div>

            {/* Web Projects */}
            <div className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/10 hover:border-accent/50 transition-all duration-300 group">
              <p className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform origin-left">
                {webProjects}
              </p>
              <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
                Web Applications
              </p>
            </div>

            {/* Mobile Projects */}
            <div className="animate-card-3 opacity-0 translate-y-[100px] p-8 rounded-3xl bg-base-tint/30 border border-white/10 hover:border-accent/50 transition-all duration-300 group">
              <p className="text-5xl md:text-6xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform origin-left">
                {mobileProjects}
              </p>
              <p className="text-text-muted uppercase tracking-wider text-sm font-medium">
                Mobile Applications
              </p>
            </div>
          </div>

          {/* Top Technologies */}
          <div className="bg-base-tint/30 p-8 rounded-3xl border border-white/10">
            <h4 className="text-xl font-bold text-text-bright mb-6">Most Used Technologies</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {topStacks.map((stack, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent/30 transition-colors">
                  <span className="text-text-medium font-medium">{stack.name}</span>
                  <span className="text-accent font-bold">{stack.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical & Soft Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
          
          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Code weight="bold" className="text-3xl text-accent" />
              <h3 className="text-2xl font-bold text-text-bright">Technical Skills</h3>
            </div>
            
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="animate-card-3 opacity-0 translate-y-[100px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-medium font-medium">{skill.name}</span>
                    <span className="text-accent font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-base-tint rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-1000 ease-out"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Users weight="bold" className="text-3xl text-accent" />
              <h3 className="text-2xl font-bold text-text-bright">Soft Skills</h3>
            </div>
            
            <div className="space-y-6">
              {softSkills.map((skill, index) => (
                <div key={index} className="animate-card-3 opacity-0 translate-y-[100px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-medium font-medium">{skill.name}</span>
                    <span className="text-accent font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-2 bg-base-tint rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent transition-all duration-1000 ease-out"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
