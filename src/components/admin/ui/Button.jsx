/**
 * Button Component
 * Reusable button with variants, sizes, loading states, and icon support
 * 
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {boolean} props.loading - Show loading spinner
 * @param {ReactNode} props.icon - Icon element
 * @param {boolean} props.disabled - Disabled state
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  icon = null,
  disabled = false,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-dark',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'border border-white/10 text-text-medium hover:border-accent hover:text-accent'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 
        rounded-xl font-bold 
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && <span className="text-xl">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
