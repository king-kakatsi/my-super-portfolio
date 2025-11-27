import { SquaresFour } from '@phosphor-icons/react';

/**
 * Portfolio Section
 * Displays a grid of project cards with batch animations
 */
const Portfolio = ({ projects: projectsProp }) => {
  // Fallback data
  const fallbackProjects = [
    {
      id: 1,
      name: 'Isometric House',
      technologies: ['Illustrations', '3D Render'],
      imageUrl: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio.'
    },
    {
      id: 2,
      name: 'Dashboard Template',
      technologies: ['UI Design', 'Figma'],
      imageUrl: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
    }
  ];

  const projects = (projectsProp && projectsProp.length > 0) ? projectsProp : fallbackProjects;

  return (
    <section id="portfolio" className="py-20 md:py-32">
      
      {/* Section Title */}
      <div className="mb-16 md:mb-24">
        <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
          <SquaresFour weight="bold" className="text-accent" />
          <span className="uppercase tracking-widest text-sm font-medium">Portfolio</span>
        </div>
        <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
          Check out my featured projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={`animate-card-2 group relative rounded-3xl overflow-hidden bg-base-tint border border-white/5 hover:border-accent/30 transition-all duration-500 will-change-transform ${
              index % 2 === 1 ? 'md:translate-y-16' : ''
            }`}
          >
            {/* Image Container */}
            <div className="aspect-[4/3] overflow-hidden will-change-transform">
              <img 
                src={project.imageUrl} 
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 will-change-transform">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-base/80 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                <p className="text-text-muted line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
