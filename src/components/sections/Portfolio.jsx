import { SquaresFour } from '@phosphor-icons/react';

/**
 * Portfolio Section
 * Displays a grid of project cards with enhanced visibility
 * Cards feature improved borders and backgrounds for better visual hierarchy
 */
const Portfolio = ({ projects: projectsProp }) => {
  // Fallback data for when Firestore data is not available
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
          <SquaresFour weight="bold" className="text-wine" />
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
            className={`group relative rounded-3xl overflow-hidden bg-base-tint/50 border border-white/10 hover:border-accent/50 transition-all duration-500 will-change-transform hover:shadow-lg hover:shadow-accent/10 ${
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
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-transparent opacity-80"></div>
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 will-change-transform">
                {/* Technology tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies?.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-base/90 backdrop-blur-sm text-sm font-medium text-white border border-white/20">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Project title */}
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                
                {/* Project description - visible on hover */}
                <p className="text-text-muted line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-full bg-purple-800 text-white font-medium hover:bg-purple-900 transition-colors"
                    >
                      Visit
                    </a>
                  )}
                  {project.sourceUrl && (
                    <a 
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-full border border-purple-800 text-white font-medium hover:bg-purple-800 transition-colors"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
