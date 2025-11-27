import { DribbbleLogo, BehanceLogo, InstagramLogo, TwitchLogo, PinterestLogo } from '@phosphor-icons/react';

/**
 * Sidebar Component (Avatar Block)
 * Displays user profile, logo, and social links
 * Fixed on the left side for desktop layouts
 */
const Sidebar = () => {
  return (
    <aside className="w-full lg:w-[300px] xl:w-[350px] lg:fixed lg:top-0 lg:left-0 lg:h-screen bg-base-tint/30 backdrop-blur-sm border-r border-white/5 p-8 flex flex-col justify-between z-40 overflow-y-auto scrollbar-hide">
      
      {/* Logo & Avatar Section */}
      <div className="flex flex-col gap-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative">
            <svg viewBox="0 0 85 85" className="w-full h-full drop-shadow-[0_0_15px_rgba(170,112,224,0.3)]">
              <defs>
                <linearGradient id="gradientFill" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#aa70e0" />
                  <stop offset="100%" stopColor="#7059e2" />
                </linearGradient>
              </defs>
              <path 
                fill="url(#gradientFill)" 
                d="M51,0H34C15.2,0,0,15.2,0,34v17c0,14.3,8.9,26.6,21.4,31.6c0,0,0,0,0,0l0,0C25.3,84.1,29.5,85,34,85h17
                c6,0,11.7-1.6,16.6-4.3c0.1-0.1,0.2-0.1,0.3-0.2C78.1,74.6,85,63.6,85,51V34C85,15.2,69.8,0,51,0z M83,51c0,10.7-5.3,20.2-13.4,26
                v-2.5v-3.9h3.9v-3.9h-3.9v-3.9h3.9v-3.9h-3.9H67v-3.9V51h-3.9v3.9v3.9h2.6v3.9v3.9v3.9h-3.9h-3.9v3.9h3.9h3.9v3.9v1
                C61.3,81.7,56.3,83,51,83H34c-4.5,0-8.7-0.9-12.6-2.6v-2v-3.9h3.9h3.9v-3.9h-3.9h-3.9v-3.9v-3.9v-3.9H24v-3.9V51h-3.9v3.9v3.9h-2.6
                h-3.9v3.9h3.9v3.9h-3.9v3.9h3.9v3.9v3.9C8.2,72.8,2,62.6,2,51V34C2,16.4,16.4,2,34,2h17c17.6,0,32,14.4,32,32V51z M50.1,54.9H54
                v3.9v3.9h-3.9v-3.9V54.9z M33.1,54.9H37v3.9v3.9h-3.9v-3.9V54.9z M27.9,51H24v-3.9v-3.9v-3.9h3.9v3.9v3.9V51z M31.8,39.3h-3.9v-3.9
                h3.9V39.3z M31.8,43.2v-3.9h3.9v3.9H31.8z M63.1,47.1V51h-3.9v-3.9v-3.9v-3.9h3.9v3.9V47.1z M35.7,47.1v-3.9h3.9h3.9h3.9h3.9v3.9
                h-3.9h-3.9h-3.9H35.7z M59.2,39.3h-3.9v-3.9h3.9V39.3z M55.3,43.2h-3.9v-3.9h3.9V43.2z"
              />
            </svg>
          </div>
          <div className="font-bold leading-tight">
            <span className="block text-xl text-text-bright">Alex</span>
            <span className="block text-xl text-text-bright">Walker</span>
          </div>
        </div>

        {/* Avatar Image */}
        <div className="w-full aspect-square rounded-3xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
          <img 
            src="https://dummyimage.com/1024x1024/4d4d4d/636363" 
            alt="Avatar" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
          />
        </div>

        {/* Info Blocks */}
        <div className="space-y-6">
          <div>
            <span className="text-sm uppercase tracking-wider text-text-muted block mb-3 font-medium">Specialization:</span>
            <h3 className="text-xl font-semibold text-text-bright leading-relaxed">UI/UX designer<br/>and frontend developer</h3>
          </div>
          <div>
            <span className="text-sm uppercase tracking-wider text-text-muted block mb-3 font-medium">Based in:</span>
            <h3 className="text-xl font-semibold text-text-bright">Odesa, Ukraine</h3>
          </div>
        </div>
      </div>

      {/* Socials & CTA */}
      <div className="flex flex-col gap-6 mt-8 lg:mt-0">
        <ul className="flex justify-between items-center">
          {[
            { icon: DribbbleLogo, href: '#' },
            { icon: BehanceLogo, href: '#' },
            { icon: InstagramLogo, href: '#' },
            { icon: TwitchLogo, href: '#' },
            { icon: PinterestLogo, href: '#' },
          ].map((social, index) => (
            <li key={index}>
              <a 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent transition-colors text-xl p-2 block"
              >
                <social.icon weight="bold" />
              </a>
            </li>
          ))}
        </ul>

        <a 
          href="#contact" 
          className="w-full py-4 rounded-xl bg-accent text-white font-bold text-center hover:bg-accent-dark hover:shadow-[0_0_20px_rgba(139,21,56,0.4)] transition-all duration-300 transform hover:-translate-y-1"
        >
          Let's Work Together!
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
