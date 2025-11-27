import { useTorchEffect } from '../../hooks/useTorchEffect';

/**
 * TorchEffect Component
 * 
 * Creates a spotlight/torch effect that follows the user's cursor.
 * Uses a radial gradient with blend mode for a glowing effect.
 * 
 * Features:
 * - Smooth cursor tracking via useTorchEffect hook
 * - Screen blend mode for light effect
 * - Disabled on mobile for performance
 * - Customizable size and opacity
 * 
 * @component
 * @example
 * return (
 *   <div className="app">
 *     <TorchEffect />
 *     <main>Your content</main>
 *   </div>
 * )
 */
const TorchEffect = () => {
  const { x, y } = useTorchEffect();

  // Torch configuration
  const TORCH_SIZE = 600; // Size of the spotlight in pixels
  const TORCH_OPACITY = 0.4; // Increased opacity for better visibility

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 hidden md:block"
      aria-hidden="true"
    >
      <div
        className="absolute rounded-full blur-[100px] transition-opacity duration-300"
        style={{
          width: `${TORCH_SIZE}px`,
          height: `${TORCH_SIZE}px`,
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(139, 21, 56, ${TORCH_OPACITY}) 0%, rgba(139, 21, 56, ${TORCH_OPACITY * 0.5}) 40%, transparent 70%)`,
          opacity: x === 0 && y === 0 ? 0 : 1,
        }}
      />
    </div>
  );
};

export default TorchEffect;
