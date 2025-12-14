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
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        className={`
          relative w-full ${sizes[size]} 
          bg-base border border-white/10 rounded-2xl 
          shadow-2xl shadow-accent/20 my-8
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/30 transition-all duration-300 z-10"
          aria-label="Close modal"
        >
          <X size={20} weight="bold" className="text-white transition-colors" />
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
