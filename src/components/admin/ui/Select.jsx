/**
 * Select Component
 * Dropdown select with label, validation states, and error messages
 * 
 * @param {Object} props
 * @param {string} props.label - Select label
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Required field indicator
 * @param {Array} props.options - Array of {value, label} objects
 */
const Select = ({ 
  label, 
  error, 
  required = false,
  options = [],
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-medium font-medium mb-3">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      
      <select
        className={`
          w-full px-6 py-4 rounded-xl 
          bg-base-tint border 
          ${error ? 'border-red-500' : 'border-white/10'} 
          text-text-bright 
          focus:border-accent focus:outline-none 
          transition-colors
          cursor-pointer
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default Select;
