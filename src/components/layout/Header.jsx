import { House, SquaresFour, User, Article, Envelope, ChatDots, Sun, Moon, Translate, Code } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Header Component
 * Contains the main navigation, theme controls, and language toggle
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: t('nav.home'), href: '#home', icon: House },
    { name: t('nav.about'), href: '#about', icon: User },
    { name: t('nav.portfolio'), href: '#portfolio', icon: SquaresFour },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: t('nav.contact'), href: '#contact', icon: Envelope },
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`
        fixed left-0 top-0 pt-30 h-screen w-80 bg-base-tint border-r border-white/10 z-50 md:hidden
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Menu Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold gradient-text">Menu</h2>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-bright hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <item.icon weight="bold" className="text-2xl text-wine group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <a 
            href="mailto:leroi.kakatsi@epitech.eu"
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-wine/20 border border-wine/30 text-text-bright hover:bg-wine/30 transition-all duration-300 group w-full"
          >
            <span className="text-lg font-bold">{t('nav.letsTalk')}</span>
            <ChatDots weight="bold" className="text-2xl text-wine group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>

      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-6 md:px-12 md:py-10 flex justify-between items-center ${
          isScrolled ? 'bg-base/80 backdrop-blur-md py-4 md:py-8' : ''
        }`}
      >
        {/* Navigation Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-3 bg-base-tint/80 backdrop-blur-sm p-3 rounded-2xl border border-white/10">
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl text-text-bright hover:text-white hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="text-lg font-semibold">{item.name}</span>
                  <item.icon weight="bold" className="text-2xl group-hover:text-wine transition-colors" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-3 rounded-xl bg-base-tint/80 border border-white/10 text-text-bright hover:bg-white/10 hover:border-wine/30 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <SquaresFour weight="bold" size={28} />
        </button>

        {/* Header Controls */}
        <div className="flex items-center gap-4">
          {/* Language Toggle - Commented out for now, keeping site in English */}
          {/* <button 
            onClick={toggleLanguage}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-base-tint/80 border border-white/10 text-text-bright hover:text-accent hover:border-accent/30 transition-all duration-300 font-bold text-lg"
            aria-label="Toggle language"
          >
            {language === 'en' ? 'FR' : 'EN'}
          </button> */}

          {/* Theme Switcher - Commented out for now */}
          {/* <button 
            onClick={toggleTheme}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-base-tint/80 border border-white/10 text-text-bright hover:text-accent hover:border-accent/30 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun weight="bold" size={24} /> : <Moon weight="bold" size={24} />}
          </button> */}

          {/* Let's Talk Button */}
          <a 
            href="mailto:leroi.kakatsi@epitech.eu"
            className="flex items-center gap-3 px-8 h-14 rounded-full bg-base-tint/80 border border-white/10 text-text-bright hover:bg-white/10 hover:border-accent/30 transition-all duration-300 group"
          >
            <span className="text-lg font-bold tracking-wide">{t('nav.letsTalk')}</span>
            <ChatDots weight="bold" className="text-2xl text-wine group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;

