import { ChartBar, Code } from '@phosphor-icons/react';

/**
 * Skills Section
 * Displays project statistics and technologies used
 */
const Skills = ({ projects }) => {
  // Calculate project statistics from real data
  const totalProjects = projects?.length || 0;
  const webProjects = projects?.filter(p => p.category === 'Web')?.length || 0;
  const mobileProjects = projects?.filter(p => p.category === 'Mobile')?.length || 0;

  // Count projects by technology - using real data from projects
  const techCounts = {};
  projects?.forEach(project => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach(tech => {
        techCounts[tech] = (techCounts[tech] || 0) + 1;
      });
    }
  });

  // Sort technologies by count (most used first)
  const sortedTechs = Object.entries(techCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([name, count]) => ({ name, count }));

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
            Technologies & Expertise
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
        </div>

        {/* Technologies Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Code weight="bold" className="text-3xl text-accent" />
            <h3 className="text-2xl font-bold text-text-bright">Technologies</h3>
          </div>
          
          {sortedTechs.length === 0 ? (
            <p className="text-text-muted text-center py-12">No technologies found in projects</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedTechs.map((tech, index) => (
                <div 
                  key={index} 
                  className="animate-card-3 opacity-0 translate-y-[100px] p-6 rounded-2xl bg-base-tint/30 border border-white/10 hover:border-accent/50 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                      <Code size={32} weight="bold" className="text-accent" />
                    </div>
                    <h4 className="text-lg font-bold text-text-bright mb-2">{tech.name}</h4>
                    <p className="text-accent font-bold text-2xl">{tech.count}</p>
                    <p className="text-text-muted text-sm">
                      {tech.count === 1 ? 'project' : 'projects'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Soft Skills - Commented out for now */}
        {/* 
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <Users weight="bold" className="text-3xl text-accent" />
            <h3 className="text-2xl font-bold text-text-bright">Soft Skills</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            // Soft skills content here
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default Skills;
