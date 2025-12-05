import { useState, useMemo } from 'react';
import { SquaresFour, MagnifyingGlass, Funnel, X } from '@phosphor-icons/react';
import ProjectDetailsModal from './ProjectDetailsModal';
import PortfolioFilterModal from './PortfolioFilterModal';
import { useFirestore } from '../../hooks/useFirestore';

/**
 * Portfolio Section
 * 
 * **Interactive Project Showcase**
 * Displays a grid of project cards with search and filter capabilities.
 * Features include:
 * - Real-time search across project names, descriptions, and technologies
 * - Multi-select filtering by category, technology, and status
 * - Responsive filter UI (modal on desktop, bottom sheet on mobile)
 * - Active filter chips with removal capability
 * - Dynamic result count display
 */
const Portfolio = ({ projects: projectsProp }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    technologies: [],
    featured: false,
    hasLiveUrl: false,
    hasGithubUrl: false
  });
  
  // Fetch skills to resolve IDs to names
  const { data: skills } = useFirestore('skills');
  
  /**
   * Helper function to resolve skill ID to skill name
   * 
   * **Skill Name Resolution**
   * Handles both IDs and names for backward compatibility with database.
   * 
   * @param {string} techId - Technology ID or name
   * @returns {string} Resolved skill name
   */
  const getSkillName = (techId) => {
    const skill = skills?.find(s => s.id === techId || s.name === techId);
    return skill ? skill.name : techId;
  };




  /**
   * Handle project card click
   */
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };




  /**
   * Handle modal close
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };




  /**
   * Handle filter modal toggle
   */
  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };




  /**
   * Apply filters from filter modal
   */
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };




  /**
   * Remove a specific filter
   */
  const removeFilter = (filterType, value) => {
    if (filterType === 'category') {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== value)
      }));
    } else if (filterType === 'technology') {
      setFilters(prev => ({
        ...prev,
        technologies: prev.technologies.filter(t => t !== value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: false
      }));
    }
  };




  /**
   * Clear all filters and search
   */
  const clearAllFilters = () => {
    setFilters({
      categories: [],
      technologies: [],
      featured: false,
      hasLiveUrl: false,
      hasGithubUrl: false
    });
    setSearchQuery('');
  };




  // Fallback data for when Firestore data is not available
  const fallbackProjects = [
    {
      id: 1,
      name: 'Isometric House',
      technologies: ['Illustrations', '3D Render'],
      imageUrl: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio.',
      category: 'Design'
    },
    {
      id: 2,
      name: 'Dashboard Template',
      technologies: ['UI Design', 'Figma'],
      imageUrl: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.',
      category: 'Web'
    }
  ];

  const allProjects = (projectsProp && projectsProp.length > 0) ? projectsProp : fallbackProjects;




  /**
   * Extract unique categories from projects
   */
  const availableCategories = useMemo(() => {
    const cats = new Set();
    allProjects.forEach(project => {
      if (project.category) {
        cats.add(project.category);
      }
    });
    return Array.from(cats).sort();
  }, [allProjects]);




  /**
   * Extract unique technologies from projects
   */
  const availableTechnologies = useMemo(() => {
    const techs = new Set();
    allProjects.forEach(project => {
      if (project.technologies && Array.isArray(project.technologies)) {
        project.technologies.forEach(tech => {
          const techName = getSkillName(tech);
          techs.add(techName);
        });
      }
    });
    return Array.from(techs).sort();
  }, [allProjects, skills]);




  /**
   * Filter and search projects
   * 
   * **Smart Filtering Logic**
   * Searches across project name, description, and technologies.
   * Applies multiple filters with AND logic (all selected filters must match).
   */
  const filteredProjects = useMemo(() => {
    return allProjects.filter(project => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = project.name?.toLowerCase().includes(query);
        const matchesDescription = project.description?.toLowerCase().includes(query);
        const matchesTech = project.technologies?.some(tech => 
          getSkillName(tech).toLowerCase().includes(query)
        );
        
        if (!matchesName && !matchesDescription && !matchesTech) {
          return false;
        }
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(project.category)) {
          return false;
        }
      }

      // Technology filter
      if (filters.technologies.length > 0) {
        const projectTechs = project.technologies?.map(t => getSkillName(t)) || [];
        const hasMatchingTech = filters.technologies.some(filterTech => 
          projectTechs.includes(filterTech)
        );
        if (!hasMatchingTech) {
          return false;
        }
      }

      // Featured filter
      if (filters.featured && !project.featured) {
        return false;
      }

      // Has live URL filter
      if (filters.hasLiveUrl && !project.liveUrl) {
        return false;
      }

      // Has GitHub URL filter
      if (filters.hasGithubUrl && !project.githubUrl) {
        return false;
      }

      return true;
    });
  }, [allProjects, searchQuery, filters, skills]);




  /**
   * Get active filter count
   */
  const activeFilterCount = filters.categories.length + 
                            filters.technologies.length + 
                            (filters.featured ? 1 : 0) +
                            (filters.hasLiveUrl ? 1 : 0) +
                            (filters.hasGithubUrl ? 1 : 0);




  /**
   * Check if any filters are active
   */
  const hasActiveFilters = activeFilterCount > 0 || searchQuery.length > 0;

  return (
    <section id="portfolio" className="py-20 md:py-32">
      
      {/* Section Title */}
      <div className="mb-12 md:mb-16">
        <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
          <SquaresFour weight="bold" className="text-wine" />
          <span className="uppercase tracking-widest text-sm font-medium">Portfolio</span>
        </div>
        <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
          Check out my featured projects
        </h2>
      </div>






      {/* %%%%%%%% SEARCH AND FILTER BAR %%%%%%%% */}
      <div className="mb-8 space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex gap-3">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <MagnifyingGlass 
              size={20} 
              weight="bold" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name or technology..."
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-base-tint/50 border border-white/10 text-text-bright placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:bg-base-tint/70 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-text-muted hover:text-text-bright transition-colors"
              >
                <X size={16} weight="bold" />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={toggleFilterModal}
            className={`relative px-6 py-4 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
              activeFilterCount > 0
                ? 'bg-wine text-white border border-wine shadow-lg shadow-wine/30'
                : 'bg-base-tint/50 text-text-muted border border-white/10 hover:border-white/30 hover:text-text-bright'
            }`}
          >
            <Funnel size={20} weight="bold" />
            <span className="hidden sm:inline">Filter</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-text-muted font-medium">Active filters:</span>
            
            {/* Category chips */}
            {filters.categories.map(category => (
              <button
                key={category}
                onClick={() => removeFilter('category', category)}
                className="px-3 py-1.5 rounded-full bg-wine/20 text-wine border border-wine/30 text-sm font-medium flex items-center gap-1.5 hover:bg-wine/30 transition-colors"
              >
                {category}
                <X size={14} weight="bold" />
              </button>
            ))}

            {/* Technology chips */}
            {filters.technologies.map(tech => (
              <button
                key={tech}
                onClick={() => removeFilter('technology', tech)}
                className="px-3 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-medium flex items-center gap-1.5 hover:bg-accent/30 transition-colors"
              >
                {tech}
                <X size={14} weight="bold" />
              </button>
            ))}

            {/* Featured chip */}
            {filters.featured && (
              <button
                onClick={() => removeFilter('featured')}
                className="px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-sm font-medium flex items-center gap-1.5 hover:bg-yellow-500/30 transition-colors"
              >
                ⭐ Featured
                <X size={14} weight="bold" />
              </button>
            )}

            {/* Has Live URL chip */}
            {filters.hasLiveUrl && (
              <button
                onClick={() => removeFilter('hasLiveUrl')}
                className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-500 border border-green-500/30 text-sm font-medium flex items-center gap-1.5 hover:bg-green-500/30 transition-colors"
              >
                🔗 Live Demo
                <X size={14} weight="bold" />
              </button>
            )}

            {/* Has GitHub URL chip */}
            {filters.hasGithubUrl && (
              <button
                onClick={() => removeFilter('hasGithubUrl')}
                className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-500 border border-blue-500/30 text-sm font-medium flex items-center gap-1.5 hover:bg-blue-500/30 transition-colors"
              >
                💻 GitHub
                <X size={14} weight="bold" />
              </button>
            )}

            {/* Clear all button */}
            <button
              onClick={clearAllFilters}
              className="px-3 py-1.5 rounded-full bg-red-500/20 text-red-500 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Results Count */}
        <div className="text-sm text-text-muted">
          Showing <span className="font-bold text-text-bright">{filteredProjects.length}</span> of{' '}
          <span className="font-bold text-text-bright">{allProjects.length}</span> projects
        </div>
      </div>
      {/* %%%%%%%% END - SEARCH AND FILTER BAR %%%%%%%% */}






      {/* %%%%%%%% PROJECTS GRID %%%%%%%% */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-6 text-6xl">🔍</div>
          <h3 className="text-2xl font-bold text-text-bright mb-3">No projects found</h3>
          <p className="text-text-muted mb-6">Try adjusting your search or filters</p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 rounded-xl bg-wine text-white font-medium hover:bg-wine/90 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
          <div 
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className={`group relative rounded-3xl overflow-hidden bg-base-tint/50 border border-white/10 hover:border-accent/50 transition-all duration-500 will-change-transform hover:shadow-lg hover:shadow-accent/10 cursor-pointer ${
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
                  {project.technologies?.map((techId, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-base/90 backdrop-blur-sm text-sm font-medium text-white border border-white/20">
                      {getSkillName(techId)}
                    </span>
                  ))}
                </div>
                
                {/* Project title */}
                <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                
                {/* Project description - visible on hover */}
                <p className="text-text-muted line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                  {project.description}
                </p>

                {/* View Details Button */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                    className="px-6 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/30"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
      {/* %%%%%%%% END - PROJECTS GRID %%%%%%%% */}






      {/* %%%%%%%% MODALS %%%%%%%% */}
      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      {/* Filter Modal */}
      <PortfolioFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
        categories={availableCategories}
        technologies={availableTechnologies}
      />
      {/* %%%%%%%% END - MODALS %%%%%%%% */}


    </section>
  );
};

export default Portfolio;
