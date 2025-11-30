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
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${x}px ${y}px, rgba(139, 21, 56, 0.15), transparent 80%)`,
        }}
      />
    </div>
  );
};

export default TorchEffect;
