import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook pour animer les éléments au scroll
 * @param {string} type - Type d'animation: 'fade-up', 'fade-in', 'slide-left', etc.
 * @returns {React.RefObject} - Ref à attacher à l'élément
 */
export const useScrollAnimation = (type = 'fade-up') => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Différents types d'animations
    const animations = {
      'fade-up': {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 }
      },
      'fade-in': {
        from: { opacity: 0 },
        to: { opacity: 1 }
      },
      'slide-left': {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 }
      },
      'slide-right': {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 }
      },
      'scale': {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 }
      }
    };

    const anim = animations[type] || animations['fade-up'];

    // Animation GSAP avec ScrollTrigger
    gsap.fromTo(
      element,
      anim.from,
      {
        ...anim.to,
        ease: 'sine',
        scrollTrigger: {
          trigger: element,
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [type]);

  return ref;
};
