/**
 * Card Component
 * Reusable card container with optional header, body, and footer
 * 
 * @param {Object} props
 * @param {string} props.variant - 'default' | 'bordered' | 'elevated'
 * @param {string} props.className - Additional CSS classes
 */
const Card = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-base-tint border border-white/10',
    bordered: 'bg-base-tint border-2 border-accent/30',
    elevated: 'bg-base-tint border border-white/10 shadow-lg shadow-accent/10'
  };

  return (
    <div className={`rounded-xl overflow-hidden ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card Header
 */
Card.Header = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-white/10 ${className}`}>
    {children}
  </div>
);

/**
 * Card Body
 */
Card.Body = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

/**
 * Card Footer
 */
Card.Footer = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-white/10 ${className}`}>
    {children}
  </div>
);

export default Card;
