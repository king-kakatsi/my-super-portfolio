/**
 * Textarea Component
 * Form textarea with label, validation states, and error messages
 * 
 * @param {Object} props
 * @param {string} props.label - Textarea label
 * @param {string} props.error - Error message
 * @param {boolean} props.required - Required field indicator
 * @param {string} props.helperText - Helper text below textarea
 */
const Textarea = ({ 
  label, 
  error, 
  required = false,
  helperText,
  className = '',
  rows = 4,
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
      
      <textarea
        rows={rows}
        className={`
          w-full px-6 py-4 rounded-xl 
          bg-base-tint border 
          ${error ? 'border-red-500' : 'border-white/10'} 
          text-white
          focus:border-accent focus:outline-none 
          transition-colors
          placeholder:text-text-muted
          resize-none
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-text-muted text-sm mt-2">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;
