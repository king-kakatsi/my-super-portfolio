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

    // Batch animations for cards (.animate-card-2)
    ScrollTrigger.batch('.animate-card-2', {
      interval: 0.1,
      batchMax: 2,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          overwrite: true,
          duration: 1,
          ease: 'power3.out'
        });
      },
      onLeave: (batch) => {
        gsap.set(batch, { opacity: 0, y: 100, overwrite: true });
      },
      onEnterBack: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          overwrite: true,
          duration: 1,
          ease: 'power3.out'
        });
      },
      onLeaveBack: (batch) => {
        gsap.set(batch, { opacity: 0, y: 100, overwrite: true });
      },
      start: 'top 85%',
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, deps);
};
