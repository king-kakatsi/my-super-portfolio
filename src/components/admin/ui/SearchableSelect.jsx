import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlass, CaretDown, Check } from '@phosphor-icons/react';

/**
 * SearchableSelect Component
 * 
 * **Searchable Single-Select Dropdown**
 * Elegant dropdown with search functionality and alphabetical sorting for single selection.
 * Features include keyboard navigation, click-outside-to-close, and clean UI.
 * 
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {Array} props.options - Array of {value, label} objects
 * @param {string} props.value - Selected value
 * @param {Function} props.onChange - Callback function when selection changes (receives selected value via event object)
 * @param {string} props.name - Input name attribute
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Required field indicator
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 */
const SearchableSelect = ({ 
  label, 
  options = [],
  value = '',
  onChange,
  name,
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
            handleSelect(filtered[focusedIndex].value);
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




  // %%%%%%%% SELECT OPTION %%%%%%%
  /**
   * Handle option selection
   * 
   * **Selection Logic**
   * Selects value and calls onChange with event object to match native select behavior.
   * 
   * @param {string} optionValue - Value of the option to select
   */
  const handleSelect = (optionValue) => {
    // Create a synthetic event object to match native select onChange behavior
    const syntheticEvent = {
      target: {
        name: name,
        value: optionValue
      }
    };
    onChange(syntheticEvent);
    setIsOpen(false);
    setSearchQuery('');
    setFocusedIndex(-1);
  };
  // %%%%%%%% END - SELECT OPTION %%%%%%%%




  // %%%%%%%% GET SELECTED LABEL %%%%%%%
  /**
   * Get label for selected value
   * 
   * **Label Resolution**
   * Returns label corresponding to selected value.
   * 
   * @returns {string} Selected option label or placeholder
   */
  const getSelectedLabel = () => {
    if (!value) return placeholder;
    const option = options.find(opt => opt.value === value);
    return option ? option.label : placeholder;
  };
  // %%%%%%%% END - GET SELECTED LABEL %%%%%%%%



  const filtered = filteredOptions();
  const selectedLabel = getSelectedLabel();

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
            ${value ? 'text-text-bright' : 'text-text-muted'}
            focus:border-accent focus:outline-none 
            transition-colors
            cursor-pointer
            flex items-center justify-between gap-3
            text-left
          `}
        >
          <span className="flex-1 truncate">{selectedLabel}</span>
          <CaretDown 
            size={20} 
            weight="bold" 
            className={`text-text-muted transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
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
                  const isSelected = value === option.value;
                  const isFocused = index === focusedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      className={`
                        w-full px-4 py-3 flex items-center gap-3 
                        text-left transition-colors
                        ${isFocused ? 'bg-white/5' : ''}
                        ${isSelected ? 'bg-accent/10' : 'hover:bg-white/5'}
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0
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

export default SearchableSelect;

