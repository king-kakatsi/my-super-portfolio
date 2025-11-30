import { DribbbleLogo, BehanceLogo, InstagramLogo, TwitchLogo, PinterestLogo } from '@phosphor-icons/react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Sidebar Component
 * Displays user profile, avatar, and social links
 * Fixed on desktop, hidden on mobile
 */
const Sidebar = ({ profile }) => {
  if (!profile) return null;

  return (
    <aside className="fixed top-0 left-0 h-full w-[300px] xl:w-[350px] hidden lg:flex flex-col justify-between p-12 bg-base border-r border-white/5 z-40">
      
      {/* Top Content */}
      <div>
        {/* Logo */}
        <div className="mb-12">
          <a href="#" className="text-2xl font-bold tracking-tighter">
            <span className="text-white">King</span>
            <span className="text-wine">.</span>
          </a>
        </div>

        {/* Avatar Block */}
        <div className="mb-12 group">
          <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-8 transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
            <img 
              src="https://dummyimage.com/400x400/3c3c3c/636363" 
              alt={profile.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>

        {/* Info Blocks */}
        <div className="space-y-6">
          <div>
            <span className="text-sm uppercase tracking-wider text-text-muted block mb-3 font-medium">Specialization:</span>
            <h3 className="text-xl font-semibold text-text-bright leading-relaxed">{profile.specialization}</h3>
          </div>
          <div>
            <span className="text-sm uppercase tracking-wider text-text-muted block mb-3 font-medium">Based in:</span>
            <h3 className="text-xl font-semibold text-text-bright">{profile.location || 'Remote'}</h3>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex gap-4">
        {profile.socials?.map((social, index) => (
          <a 
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:bg-wine hover:border-wine transition-all duration-300"
            aria-label={social.platform}
          >
            {/* Display first letter of platform as icon placeholder since we don't have dynamic icon mapping yet */}
            <span className="text-xs font-bold">{social.platform[0]}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
