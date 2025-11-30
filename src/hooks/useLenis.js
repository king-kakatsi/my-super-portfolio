import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to initialize Lenis smooth scroll
 * This is THE SECRET to the site's ultra-smooth scrolling experience!
 * 
 * Lenis provides:
 * - Native-like smooth scrolling
 * - Momentum and inertia handling
 * - Perfect integration with GSAP ScrollTrigger
 * 
 * @example
 * function App() {
 *   useLenis(); // Initialize smooth scroll
 *   return <div>Your content</div>
 * }
 */
export const useLenis = () => {
  useEffect(() => {
    // Configure Lenis with optimal settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Animation loop using requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);
};
