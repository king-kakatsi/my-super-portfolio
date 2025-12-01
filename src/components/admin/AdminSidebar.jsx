import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  SquaresFour, 
  User, 
  FolderOpen, 
  Lightbulb, 
  GraduationCap,
  Envelope,
  SignOut
} from '@phosphor-icons/react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

/**
 * Admin Sidebar Navigation
 * Fixed sidebar with navigation links and logout
 */
const AdminSidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
  const { logout, user } = useAuth();

  /**
   * Navigation items
   */
  const navItems = [
    { path: '/admin/dashboard', icon: SquaresFour, label: 'Dashboard' },
    { path: '/admin/profile', icon: User, label: 'Profile' },
    { path: '/admin/projects', icon: FolderOpen, label: 'Projects' },
    { path: '/admin/skills', icon: Lightbulb, label: 'Skills' },
    { path: '/admin/resume', icon: GraduationCap, label: 'Resume' },
    { path: '/admin/messages', icon: Envelope, label: 'Messages' },
  ];

  /**
   * Handle logout
   */
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully', {
        style: {
          background: '#8B1538',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  /**
   * Close mobile menu when clicking a nav link
   */
  const handleNavClick = () => {
    closeMobileMenu();
  };

  /**
   * Prevent body scroll when mobile menu is open
   */
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

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-base-tint border-r border-white/10 flex flex-col z-50
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo/Brand */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold gradient-text">
            Admin Panel
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={handleNavClick}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      transition-all duration-300 font-medium
                      ${isActive 
                        ? 'bg-accent/10 text-accent border border-accent/20' 
                        : 'text-text-muted hover:bg-white/5 hover:text-text-bright'
                      }
                    `}
                  >
                    <Icon size={20} weight="bold" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-white/10">
          <div className="mb-3 px-4 py-2">
            <p className="text-sm text-text-muted">Signed in as</p>
            <p className="text-text-bright font-medium truncate">
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 font-medium"
          >
            <SignOut size={20} weight="bold" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

