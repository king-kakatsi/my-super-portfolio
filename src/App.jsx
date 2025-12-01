import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { useTorchEffect } from './hooks/useTorchEffect';
import { useAnimations } from './hooks/useAnimations';
import TorchEffect from './components/layout/TorchEffect';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';
import { LanguageProvider } from './context/LanguageContext';
import { usePortfolioData } from './hooks/usePortfolioData';

// Admin Imports
import LoginForm from './components/auth/LoginForm';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import DashboardOverview from './components/admin/dashboard/DashboardOverview';
import ProfileEditor from './components/admin/profile/ProfileEditor';
import ProjectsList from './components/admin/projects/ProjectsList';
import SkillsManager from './components/admin/skills/SkillsManager';
import ResumeEditor from './components/admin/resume/ResumeEditor';
import MessagesList from './components/admin/messages/MessagesList';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();
  
  // Initialize Torch effect logic
  useTorchEffect();

  // Fetch data from Firestore
  const { loading, data } = usePortfolioData();

  // Initialize global animations (re-run when loading finishes)
  useAnimations([loading]);

  return (
    <Routes>
      {/* Admin Login */}
      <Route path="/admin/login" element={<LoginForm />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="profile" element={<ProfileEditor />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="skills" element={<SkillsManager />} />
        <Route path="resume" element={<ResumeEditor />} />
        <Route path="messages" element={<MessagesList />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Main Portfolio Route */}
      <Route
        path="/*"
        element={
          loading ? (
            <div className="min-h-screen bg-base flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <LanguageProvider>
              <div className="min-h-screen bg-base text-text-medium selection:bg-accent selection:text-white">
                {/* Torch Effect Layer */}
                <TorchEffect />

                {/* Header (Navigation) */}
                <Header />

                {/* Main Content Area */}
                <main className="relative z-10 lg:ml-[300px] xl:ml-[350px] px-6 md:px-12 lg:px-20 overflow-hidden">
                  <Hero profile={data.profile} />

                  {/* Sidebar (Avatar & Info) */}
                  <Sidebar profile={data.profile} />
                  
                  <About about={data.about} skills={data.skills} />
                  <Portfolio projects={data.projects} />
                  <Skills projects={data.projects} />
                  {/* Resume section commented out - Education and Experience not needed for now */}
                  {/* <Resume resume={data.resume} /> */}
                  <Contact />
                </main>
              </div>
            </LanguageProvider>
          )
        }
      />
    </Routes>
  );
}

export default App;

