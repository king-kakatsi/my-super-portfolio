import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

/**
 * Admin Layout Component
 * Main wrapper for admin pages with sidebar and header
 */
const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-base">
      <Toaster position="bottom-right" />
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
