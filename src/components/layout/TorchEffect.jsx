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
  const TORCH_SIZE = 300; // Size of the spotlight in pixels
  const TORCH_OPACITY = 0.15; // Opacity of the light (0-1)

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen transition-all duration-50 ease-out md:block hidden"
      style={{
        background: `radial-gradient(
          circle ${TORCH_SIZE}px at ${x}px ${y}px,
          rgba(255, 255, 255, ${TORCH_OPACITY}),
          transparent 80%
        )`
      }}
      aria-hidden="true"
    />
  );
};

export default TorchEffect;
