import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll-triggered animations using GSAP
 * 
 * @param {string} type - Animation type: 'fade-up', 'fade-in', 'slide-left', 'slide-right', 'scale'
 * @returns {React.RefObject} - Ref to attach to the element to be animated
 * 
 * @example
 * const ref = useScrollAnimation('fade-up');
 * return <div ref={ref}>Animated content</div>
 */
export const useScrollAnimation = (type = 'fade-up') => {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Animation configurations
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

    // Create GSAP animation with ScrollTrigger
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

    // Cleanup function
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
