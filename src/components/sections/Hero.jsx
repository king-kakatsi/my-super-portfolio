import { SquaresFour, DownloadSimple, ArrowDown } from '@phosphor-icons/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

/**
 * Hero Section
 * Main introduction section with animated headline and rotating scroll button
 */
const Hero = () => {
  const containerRef = useRef(null);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Staggered animation for headline elements
    tl.fromTo('.animate-headline',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.15,
        delay: 0.2
      }
    );

    // Rotating button animation
    gsap.to('.rotating-text', {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'linear'
    });

  }, { scope: containerRef });

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative pt-20 pb-20" ref={containerRef}>
      
      {/* Headline Content */}
      <div className="max-w-4xl z-10">
        
        {/* Subtitle */}
        <div className="animate-headline flex items-center gap-3 mb-6 text-text-muted">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" className="text-accent">
            <path d="M5.6,12.6c-0.5-0.8-0.7-2.4-1.7-3.5c-1-1-2.7-1.2-3.5-1.7C-0.1,7-0.1,6,0.4,5.6c0.8-0.5,2.3-0.6,3.5-1.8 C5,2.8,5.1,1.2,5.6,0.4C6-0.1,7-0.1,7.4,0.4c0.5,0.8,0.7,2.4,1.8,3.5c1.2,1.2,2.6,1.2,3.5,1.7c0.6,0.4,0.6,1.4,0,1.7 C11.8,7.9,10.2,8,9.1,9.1c-1,1-1.2,2.7-1.7,3.5C7,13.1,6,13.1,5.6,12.6z"/>
          </svg>
          <span className="uppercase tracking-widest text-sm font-medium">Let's meet!</span>
        </div>

        {/* Main Title */}
        <h1 className="animate-headline text-[clamp(4rem,8vw,8.5rem)] font-bold leading-[1.1] mb-10 text-text-bright">
          I'm Alex Walker<br/>
          <span className="text-text-medium">Digital designer and illustrator.</span>
        </h1>

        {/* Buttons */}
        <div className="animate-headline flex flex-col sm:flex-row gap-6">
          <a 
            href="#portfolio" 
            className="group flex items-center justify-between px-8 py-4 rounded-xl bg-transparent border border-white/10 text-text-bright hover:border-accent transition-all duration-300 w-full sm:w-auto min-w-[200px]"
          >
            <span className="font-bold">My Works</span>
            <SquaresFour weight="bold" className="text-xl group-hover:text-accent transition-colors" />
          </a>

          <a 
            href="#" 
            className="group flex items-center justify-between px-8 py-4 rounded-xl bg-transparent border border-white/10 text-text-bright hover:border-white/30 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
          >
            <span className="font-bold">Download CV</span>
            <DownloadSimple weight="bold" className="text-xl group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Rotating Scroll Button */}
      <div className="absolute bottom-10 right-0 hidden md:block z-10">
        <a href="#portfolio" className="relative block w-40 h-40 group">
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowDown weight="bold" className="text-3xl text-accent group-hover:translate-y-1 transition-transform duration-300" />
          </div>
          <svg viewBox="0 0 120 120" className="w-full h-full rotating-text text-accent/80 group-hover:text-accent transition-colors duration-300">
            <defs>
              <path id="textPath" d="M110,59.5c0,27.6-22.4,50-50,50s-50-22.4-50-50s22.4-50,50-50S110,31.9,110,59.5z"/>
            </defs>
            <text>
              <textPath xlinkHref="#textPath" className="text-[11px] uppercase tracking-[3px] fill-current font-semibold">
                Scroll for More * Scroll for More * 
              </textPath>
            </text>
          </svg>
        </a>
      </div>

    </section>
  );
};

export default Hero;
