import { useLocation, Link } from 'react-router-dom';
import { House, CaretRight, SquaresFour } from '@phosphor-icons/react';

/**
 * Admin Header
 * Top header with breadcrumbs and page title
 */
const AdminHeader = ({ toggleMobileMenu }) => {
  const location = useLocation();

  /**
   * Generate breadcrumbs from path
   */
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    
    return paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1);
      
      return { href, label };
    });
  };

  /**
   * Get page title from path
   */
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const titles = {
      dashboard: 'Dashboard',
      profile: 'Profile Settings',
      projects: 'Projects Management',
      skills: 'Skills Management',
      resume: 'Resume Editor',
      messages: 'Messages Inbox'
    };
    return titles[path] || 'Admin';
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-base-tint border-b border-white/10 px-4 md:px-8 py-4 md:py-6">
      <div className="flex items-center gap-4 mb-3">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <SquaresFour size={24} weight="bold" className="text-text-bright" />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-text-muted flex-1">
          <Link 
            to="/" 
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <House size={16} weight="bold" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <CaretRight size={12} />
              {index === breadcrumbs.length - 1 ? (
                <span className="text-text-bright font-medium">
                  {crumb.label}
                </span>
              ) : (
                <Link 
                  to={crumb.href}
                  className="hover:text-accent transition-colors"
                >
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-text-bright">
        {getPageTitle()}
      </h1>
    </header>
  );
};

export default AdminHeader;

