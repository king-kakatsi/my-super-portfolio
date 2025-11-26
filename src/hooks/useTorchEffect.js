import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for the torch/spotlight effect that follows the cursor
 * Optimized with requestAnimationFrame for maximum smoothness
 * 
 * Features:
 * - Smooth cursor tracking with interpolation
 * - Performance-optimized with RAF
 * - Automatic cleanup on unmount
 * 
 * @returns {{ x: number, y: number }} - Current cursor position
 * 
 * @example
 * const { x, y } = useTorchEffect();
 * // Use x and y to position the spotlight
 */
export const useTorchEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse move handler - updates target position
    const handleMouseMove = (e) => {
      targetRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Animation loop with smooth interpolation
    const animate = () => {
      // Lerp (linear interpolation) for smooth movement
      // 0.1 = smoothing factor (lower = smoother but slower)
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1;

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Start listening and animating
    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return position;
};
