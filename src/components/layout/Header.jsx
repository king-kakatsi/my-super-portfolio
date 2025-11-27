import { House, SquaresFour, User, Article, Envelope, ChatDots, Sun, Moon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

/**
 * Header Component
 * Contains the main navigation and theme controls
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    return localStorage.getItem('theme') || 'dark';
  });

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navItems = [
    { name: 'Home', href: '#home', icon: House },
    { name: 'Portfolio', href: '#portfolio', icon: SquaresFour },
    { name: 'About Me', href: '#about', icon: User },
    { name: 'Resume', href: '#resume', icon: Article },
    { name: 'Contact', href: '#contact', icon: Envelope },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-6 md:px-12 md:py-10 flex justify-between items-center ${
        isScrolled ? 'bg-base/80 backdrop-blur-md py-4 md:py-8' : ''
      }`}
    >
      {/* Navigation Menu */}
      <nav className="hidden md:block">
        <ul className="flex gap-3 bg-base-tint/80 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href}
                className="flex items-center gap-3 px-6 py-3 rounded-xl text-text-bright hover:text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <item.icon weight="bold" className="text-2xl group-hover:text-accent transition-colors" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button (Placeholder) */}
      <button className="md:hidden text-text-bright text-3xl">
        <SquaresFour weight="bold" />
      </button>

      {/* Header Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <button 
          onClick={toggleTheme}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-base-tint/80 border border-white/10 text-text-bright hover:text-accent hover:border-accent/30 transition-all duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun weight="bold" size={24} /> : <Moon weight="bold" size={24} />}
        </button>

        {/* Let's Talk Button */}
        <a 
          href="mailto:example@example.com"
          className="flex items-center gap-3 px-8 h-14 rounded-full bg-base-tint/80 border border-white/10 text-text-bright hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group"
        >
          <span className="text-lg font-bold tracking-wide">Let's Talk</span>
          <ChatDots weight="bold" className="text-2xl text-accent group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </header>
  );
};

export default Header;
