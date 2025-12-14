import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlass, X, Check, CaretDown } from '@phosphor-icons/react';

/**
 * MultiSelect Component
 * 
 * **Searchable Multi-Select Dropdown**
 * Elegant dropdown with search functionality, alphabetical sorting, and multi-selection support.
 * Features include keyboard navigation, click-outside-to-close, and selected items as removable chips.
 * 
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {Array} props.options - Array of {value, label} objects
 * @param {Array} props.value - Array of selected values
 * @param {Function} props.onChange - Callback function when selection changes (receives array of selected values)
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Required field indicator
 * @param {string} props.placeholder - Placeholder text for search input
 * @param {string} props.className - Additional CSS classes
 */
const MultiSelect = ({ 
  label, 
  options = [],
  value = [],
  onChange,
  error, 
  required = false,
  placeholder = "Search and select...",
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // %%%%%%%% FILTER AND SORT OPTIONS %%%%%%%
  /**
   * Filter and sort options based on search query
   * 
   * **Alphabetical Filtering**
   * Filters options by search query and sorts them alphabetically by label.
   * 
   * @returns {Array} Filtered and sorted options
   */
  const filteredOptions = () => {
    const filtered = options.filter(option => 
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.sort((a, b) => a.label.localeCompare(b.label));
  };

  // %%%%%%%% END - FILTER AND SORT OPTIONS %%%%%%%%




  // %%%%%%%% CLICK OUTSIDE HANDLER %%%%%%%
  /**
   * Handle click outside to close dropdown
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);
  // %%%%%%%% END - CLICK OUTSIDE HANDLER %%%%%%%%




  // %%%%%%%% KEYBOARD NAVIGATION %%%%%%%
  /**
   * Handle keyboard navigation
   * 
   * **Keyboard Support**
   * Supports Arrow keys for navigation, Enter for selection, Escape to close.
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      const filtered = filteredOptions();

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => 
            prev < filtered.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filtered.length) {
            handleToggle(filtered[focusedIndex].value);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearchQuery('');
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex, searchQuery]);
  // %%%%%%%% END - KEYBOARD NAVIGATION %%%%%%%%




  // %%%%%%%% SCROLL TO FOCUSED ITEM %%%%%%%
  /**
   * Scroll to focused item when navigating with keyboard
   */
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({ 
          block: 'nearest', 
          behavior: 'smooth' 
        });
      }
    }
  }, [focusedIndex]);
  // %%%%%%%% END - SCROLL TO FOCUSED ITEM %%%%%%%%




  // %%%%%%%% FOCUS SEARCH INPUT ON OPEN %%%%%%%
  /**
   * Focus search input when dropdown opens
   */
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  // %%%%%%%% END - FOCUS SEARCH INPUT ON OPEN %%%%%%%%




  // %%%%%%%% TOGGLE OPTION SELECTION %%%%%%%
  /**
   * Toggle option selection
   * 
   * **Selection Logic**
   * Adds or removes value from selected array and calls onChange callback.
   * 
   * @param {string} optionValue - Value of the option to toggle
   */
  const handleToggle = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };
  // %%%%%%%% END - TOGGLE OPTION SELECTION %%%%%%%%




  // %%%%%%%% REMOVE SELECTED ITEM %%%%%%%
  /**
   * Remove selected item
   * 
   * **Item Removal**
   * Removes a specific value from the selected array.
   * 
   * @param {string} itemValue - Value to remove
   * @param {Event} e - Click event
   */
  const handleRemove = (itemValue, e) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== itemValue));
  };
  // %%%%%%%% END - REMOVE SELECTED ITEM %%%%%%%%




  // %%%%%%%% GET SELECTED LABELS %%%%%%%
  /**
   * Get labels for selected values
   * 
   * **Label Resolution**
   * Returns array of labels corresponding to selected values.
   * 
   * @returns {Array} Array of selected option labels
   */
  const getSelectedLabels = () => {
    return value.map(val => {
      const option = options.find(opt => opt.value === val);
      return option ? option.label : val;
    });
  };
  // %%%%%%%% END - GET SELECTED LABELS %%%%%%%%



  const filtered = filteredOptions();

  return (
    <div className={`w-full ${className}`} ref={wrapperRef} {...props}>
      {label && (
        <label className="block text-text-medium font-medium mb-3">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* ooooooooooooo TRIGGER BUTTON ooooooooooooo */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-6 py-4 rounded-xl 
            bg-base-tint border 
            ${error ? 'border-red-500' : 'border-white/10'} 
            text-text-bright 
            focus:border-accent focus:outline-none 
            transition-colors
            cursor-pointer
            flex items-center justify-between gap-3
            min-h-[56px]
          `}
        >
          <div className="flex-1 flex flex-wrap items-center gap-2">
            {value.length === 0 ? (
              <span className="text-text-muted">{placeholder}</span>
            ) : (
              getSelectedLabels().map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent text-sm rounded-full border border-accent/30"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => handleRemove(value[index], e)}
                    className="hover:text-accent-light transition-colors"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </span>
              ))
            )}
          </div>
          <CaretDown 
            size={20} 
            weight="bold" 
            className={`text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        {/* ooooooooooooo END - TRIGGER BUTTON ooooooooooooo */}



        {/* ooooooooooooo DROPDOWN MENU ooooooooooooo */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-base-tint border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            {/* ============ SEARCH INPUT ============= */}
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <MagnifyingGlass 
                  size={20} 
                  weight="bold" 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" 
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFocusedIndex(-1);
                  }}
                  placeholder="Search options..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-base border border-white/10 text-text-bright placeholder:text-text-muted focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>
            {/* ============ END - SEARCH INPUT ============= */}



            {/* ============ OPTIONS LIST ============= */}
            <div 
              ref={listRef}
              className="max-h-[300px] overflow-y-auto custom-scrollbar"
            >
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-text-muted text-sm">
                  No options found
                </div>
              ) : (
                filtered.map((option, index) => {
                  const isSelected = value.includes(option.value);
                  const isFocused = index === focusedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleToggle(option.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={`
                        w-full px-4 py-3 flex items-center gap-3 
                        text-left transition-colors
                        ${isFocused ? 'bg-white/5' : ''}
                        ${isSelected ? 'bg-accent/10' : 'hover:bg-white/5'}
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center
                        ${isSelected 
                          ? 'bg-accent border-accent' 
                          : 'border-white/20'
                        }
                      `}>
                        {isSelected && (
                          <Check size={14} weight="bold" className="text-white" />
                        )}
                      </div>
                      <span className={`flex-1 ${isSelected ? 'text-accent font-medium' : 'text-text-bright'}`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
            {/* ============ END - OPTIONS LIST ============= */}
          </div>
        )}
        {/* ooooooooooooo END - DROPDOWN MENU ooooooooooooo */}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </div>
  );
};

export default MultiSelect;

