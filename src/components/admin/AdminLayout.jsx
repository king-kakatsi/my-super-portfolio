import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

/**
 * Mobile Menu Context
 */
const MobileMenuContext = createContext();

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within AdminLayout');
  }
  return context;
};

/**
 * Admin Layout Component
 * Main wrapper for admin pages with sidebar and header
 */
const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <MobileMenuContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}>
      <div className="min-h-screen bg-base">
        <Toaster position="bottom-right" />
        
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="lg:ml-64 transition-all duration-300">
          {/* Header */}
          <AdminHeader />

          {/* Page Content */}
          <main className="p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </MobileMenuContext.Provider>
  );
};

export default AdminLayout;

