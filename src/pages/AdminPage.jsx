import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import AdminLayout from '../components/admin/AdminLayout';
import DashboardOverview from '../components/admin/dashboard/DashboardOverview';
import ProfileEditor from '../components/admin/profile/ProfileEditor';
import ProjectsList from '../components/admin/projects/ProjectsList';
import SkillsManager from '../components/admin/skills/SkillsManager';
import ResumeEditor from '../components/admin/resume/ResumeEditor';
import MessagesList from '../components/admin/messages/MessagesList';

/**
 * Admin Page Router
 * Handles all admin routes
 */
const AdminPage = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="login" element={<LoginForm />} />

      {/* Protected Admin Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="profile" element={<ProfileEditor />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="resume" element={<ResumeEditor />} />
        <Route path="messages" element={<MessagesList />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
