import { useEffect } from 'react';
import { X } from '@phosphor-icons/react';

/**
 * Modal Component
 * Dialog modal with backdrop, animations, and close functionality
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Modal open state
 * @param {Function} props.onClose - Close handler
 * @param {string} props.size - 'sm' | 'md' | 'lg' | 'xl'
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={`
          relative w-full ${sizes[size]} 
          bg-base border border-white/10 rounded-2xl 
          shadow-2xl shadow-accent/20
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} className="text-text-muted" />
        </button>

        {children}
      </div>
    </div>
  );
};

/**
 * Modal Header
 */
Modal.Header = ({ children, className = '' }) => (
  <div className={`px-8 py-6 border-b border-white/10 ${className}`}>
    <h2 className="text-2xl font-bold text-text-bright pr-8">
      {children}
    </h2>
  </div>
);

/**
 * Modal Body
 */
Modal.Body = ({ children, className = '' }) => (
  <div className={`px-8 py-6 max-h-[70vh] overflow-y-auto ${className}`}>
    {children}
  </div>
);

/**
 * Modal Footer
 */
Modal.Footer = ({ children, className = '' }) => (
  <div className={`px-8 py-6 border-t border-white/10 flex items-center justify-end gap-4 ${className}`}>
    {children}
  </div>
);

export default Modal;
