import { SquaresFour } from '@phosphor-icons/react';

const projects = [
  {
    id: 1,
    title: 'Isometric House',
    category: 'Illustrations',
    tags: ['Illustrations', '3D Render'],
    image: 'https://dummyimage.com/800x800/3c3c3c/636363',
    description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio.'
  },
  {
    id: 2,
    title: 'Dashboard Template',
    category: 'UI Design',
    tags: ['UI Design', 'Figma'],
    image: 'https://dummyimage.com/800x800/3c3c3c/636363',
    description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
  },
  {
    id: 3,
    title: 'Notification Icon',
    category: 'Illustrations',
    tags: ['Illustrations', '3D Render'],
    image: 'https://dummyimage.com/800x800/3c3c3c/636363',
    description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
  },
  {
    id: 4,
    title: 'Smart Penguin',
    category: 'Illustrations',
    tags: ['Illustrations', 'AI Experiment'],
    image: 'https://dummyimage.com/800x800/3c3c3c/636363',
    description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
  }
];

/**
 * Portfolio Section
 * Displays a grid of project cards with batch animations
 */
const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 md:py-32">
      
      {/* Section Title */}
      <div className="mb-16 md:mb-24">
        <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
          <SquaresFour weight="bold" className="text-accent" />
          <span className="uppercase tracking-widest text-sm font-medium">Portfolio</span>
        </div>
        <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright">
          Check out my featured projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
        {projects.map((project, index) => (
          <figure 
            key={project.id} 
            className={`group relative overflow-hidden animate-card-2 opacity-0 translate-y-[100px] ${
              index % 2 === 0 ? 'md:pr-8 md:pb-16' : 'md:pl-8 md:pt-16'
            }`}
          >
            {/* Image Container */}
            <a href="#" className="block overflow-hidden rounded-3xl relative aspect-square">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </a>

            {/* Caption */}
            <figcaption className="mt-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-text-bright group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-text-muted border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-text-muted leading-relaxed">
                {project.description}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

    </section>
  );
};

export default Portfolio;
