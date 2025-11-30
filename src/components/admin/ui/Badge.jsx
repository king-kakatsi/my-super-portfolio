/**
 * Badge Component
 * Status badges for displaying states (published, draft, read, unread, etc.)
 * 
 * @param {Object} props
 * @param {string} props.variant - 'success' | 'warning' | 'danger' | 'info' | 'default'
 * @param {string} props.size - 'sm' | 'md'
 */
const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    default: 'bg-white/10 text-text-medium border-white/20'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center
        rounded-full border font-medium
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
