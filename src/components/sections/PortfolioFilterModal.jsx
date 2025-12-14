import { X, Check } from '@phosphor-icons/react';
import { useEffect } from 'react';

/**
 * Portfolio Filter Modal Component
 * 
 * **Responsive Filter Interface**
 * Modal on desktop, bottom sheet on mobile for filtering portfolio projects.
 * Supports category, technology, and featured filters with multi-select capability.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {Object} props.filters - Current active filters
 * @param {Function} props.onApplyFilters - Function to apply selected filters
 * @param {Array} props.categories - Available categories for filtering
 * @param {Array} props.technologies - Available technologies for filtering
 */
const PortfolioFilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onApplyFilters,
  categories,
  technologies 
}) => {
  // Local state for temporary filter selections
  const [tempFilters, setTempFilters] = useState({
    categories: filters.categories || [],
    technologies: filters.technologies || [],
    featured: filters.featured || false,
    hasLiveUrl: filters.hasLiveUrl || false,
    hasGithubUrl: filters.hasGithubUrl || false
  });




  /**
   * Handle ESC key to close modal
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);




  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);




  /**
   * Toggle category filter
   */
  const toggleCategory = (category) => {
    setTempFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };




  /**
   * Toggle technology filter
   */
  const toggleTechnology = (tech) => {
    setTempFilters(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };




  /**
   * Toggle boolean filter
   */
  const toggleBooleanFilter = (filterName) => {
    setTempFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };




  /**
   * Apply filters and close modal
   */
  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };




  /**
   * Clear all filters
   */
  const handleClearAll = () => {
    const emptyFilters = {
      categories: [],
      technologies: [],
      featured: false,
      hasLiveUrl: false,
      hasGithubUrl: false
    };
    setTempFilters(emptyFilters);
  };




  /**
   * Get active filter count
   */
  const getActiveFilterCount = () => {
    return tempFilters.categories.length + 
           tempFilters.technologies.length + 
           (tempFilters.featured ? 1 : 0) +
           (tempFilters.hasLiveUrl ? 1 : 0) +
           (tempFilters.hasGithubUrl ? 1 : 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 dark:bg-black/60 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />






      {/* %%%%%%%% MODAL CONTAINER %%%%%%%% */}
      {/* Desktop: Modal, Mobile: Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center z-50 pointer-events-none">
        <div 
          className="pointer-events-auto bg-base border border-white/10 dark:border-white/10 border-gray-300/50 w-full md:w-[600px] md:max-h-[80vh] md:rounded-3xl overflow-hidden shadow-2xl animate-slide-up md:animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >




          {/* ooooooooooooo HEADER ooooooooooooo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-white/10 border-gray-300/50 bg-base-tint/30">
            <div>
              <h3 className="text-2xl font-bold text-text-bright">Filter Projects</h3>
              <p className="text-sm text-text-muted mt-1">
                {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full dark:hover:bg-white/10 hover:bg-gray-100 transition-colors text-text-muted hover:text-text-bright"
            >
              <X size={24} weight="bold" />
            </button>
          </div>
          {/* ooooooooooooo END - HEADER ooooooooooooo */}





          {/* ooooooooooooo FILTER CONTENT ooooooooooooo */}
          <div className="overflow-y-auto max-h-[60vh] md:max-h-[50vh] p-6 space-y-6">



            {/* ============ CATEGORY FILTER ============= */}
            {categories.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-text-bright mb-3">Category</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        tempFilters.categories.includes(category)
                          ? 'bg-wine text-white border border-wine'
                          : 'bg-base-tint/30 text-text-muted border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/30 dark:hover:border-white/30 hover:border-gray-400/50'
                      }`}
                    >
                      {tempFilters.categories.includes(category) && (
                        <Check size={16} weight="bold" className="inline mr-1" />
                      )}
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* ============ END - CATEGORY FILTER ============= */}




            {/* ============ TECHNOLOGY FILTER ============= */}
            {technologies.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-text-bright mb-3">Technology</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => toggleTechnology(tech)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        tempFilters.technologies.includes(tech)
                          ? 'bg-accent text-white border border-accent'
                          : 'bg-base-tint/30 text-text-muted border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/30 dark:hover:border-white/30 hover:border-gray-400/50'
                      }`}
                    >
                      {tempFilters.technologies.includes(tech) && (
                        <Check size={16} weight="bold" className="inline mr-1" />
                      )}
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* ============ END - TECHNOLOGY FILTER ============= */}




            {/* ============ STATUS FILTERS ============= */}
            <div>
              <h4 className="text-lg font-bold text-text-bright mb-3">Status & Links</h4>
              <div className="space-y-3">
                {/* Featured */}
                <label className="flex items-center justify-between p-4 rounded-xl bg-base-tint/30 border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/20 dark:hover:border-white/20 hover:border-gray-400/50 transition-colors cursor-pointer">
                  <span className="text-text-bright font-medium">Featured Projects</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.featured}
                    onChange={() => toggleBooleanFilter('featured')}
                    className="w-5 h-5 rounded border-white/20 dark:border-white/20 border-gray-400/50 bg-base-tint text-accent focus:ring-2 focus:ring-accent/50"
                  />
                </label>

                {/* Has Live URL */}
                <label className="flex items-center justify-between p-4 rounded-xl bg-base-tint/30 border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/20 dark:hover:border-white/20 hover:border-gray-400/50 transition-colors cursor-pointer">
                  <span className="text-text-bright font-medium">Has Live Demo</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.hasLiveUrl}
                    onChange={() => toggleBooleanFilter('hasLiveUrl')}
                    className="w-5 h-5 rounded border-white/20 dark:border-white/20 border-gray-400/50 bg-base-tint text-accent focus:ring-2 focus:ring-accent/50"
                  />
                </label>

                {/* Has GitHub URL */}
                <label className="flex items-center justify-between p-4 rounded-xl bg-base-tint/30 border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/20 dark:hover:border-white/20 hover:border-gray-400/50 transition-colors cursor-pointer">
                  <span className="text-text-bright font-medium">Has GitHub Repo</span>
                  <input
                    type="checkbox"
                    checked={tempFilters.hasGithubUrl}
                    onChange={() => toggleBooleanFilter('hasGithubUrl')}
                    className="w-5 h-5 rounded border-white/20 dark:border-white/20 border-gray-400/50 bg-base-tint text-accent focus:ring-2 focus:ring-accent/50"
                  />
                </label>
              </div>
            </div>
            {/* ============ END - STATUS FILTERS ============= */}


          </div>
          {/* ooooooooooooo END - FILTER CONTENT ooooooooooooo */}





          {/* ooooooooooooo FOOTER ACTIONS ooooooooooooo */}
          <div className="p-6 border-t border-white/10 dark:border-white/10 border-gray-300/50 bg-base-tint/30 flex gap-3">
            <button
              onClick={handleClearAll}
              className="flex-1 px-6 py-3 rounded-xl font-medium text-text-muted bg-base-tint/50 hover:bg-base-tint hover:text-text-bright border border-white/10 dark:border-white/10 border-gray-300/50 hover:border-white/20 dark:hover:border-white/20 hover:border-gray-400/50 transition-all duration-300"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-wine hover:bg-wine/90 transition-all duration-300 shadow-lg shadow-wine/30"
            >
              Apply Filters
            </button>
          </div>
          {/* ooooooooooooo END - FOOTER ACTIONS ooooooooooooo */}


        </div>
      </div>
      {/* %%%%%%%% END - MODAL CONTAINER %%%%%%%% */}


    </>
  );
};

// Add useState import at the top
import { useState } from 'react';

export default PortfolioFilterModal;

