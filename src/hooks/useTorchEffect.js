import { useEffect, useState, useRef } from 'react';

/**
 * Hook pour l'effet torch/spotlight qui suit le curseur
 * Optimisé avec requestAnimationFrame pour une fluidité maximale
 * @returns {{ x: number, y: number }} - Position du curseur
 */
export const useTorchEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Handler pour le mouvement de la souris
    const handleMouseMove = (e) => {
      targetRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Animation loop avec interpolation smooth
    const animate = () => {
      // Interpolation pour un mouvement fluide
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.1;

      setPosition({
        x: currentRef.current.x,
        y: currentRef.current.y
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    // Démarrer l'animation
    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return position;
};
