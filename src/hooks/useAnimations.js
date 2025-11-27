import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to handle global animations based on CSS classes
 * Replicates the animation logic from the original template
 */
export const useAnimations = (deps = []) => {
  useEffect(() => {
    // Animate elements with .animate-in-up class
    const animateInUpElements = document.querySelectorAll('.animate-in-up');
    animateInUpElements.forEach((element) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Simple fade-in for card-3 elements (Resume section) - no scroll trigger
    const card3Elements = document.querySelectorAll('.animate-card-3');
    card3Elements.forEach((element, index) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true
          }
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, deps);
};
