import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { useTorchEffect } from './hooks/useTorchEffect';
import { useAnimations } from './hooks/useAnimations';
import TorchEffect from './components/layout/TorchEffect';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Hero from './components/sections/Hero';
import Portfolio from './components/sections/Portfolio';
import About from './components/sections/About';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact';
import { LanguageProvider } from './context/LanguageContext';
import { usePortfolioData } from './hooks/usePortfolioData';
import AdminPage from './pages/AdminPage';

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
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminPage />} />

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

                {/* Sidebar (Avatar & Info) */}
                <Sidebar profile={data.profile} />

                {/* Main Content Area */}
                <main className="relative z-10 lg:ml-[300px] xl:ml-[350px] px-6 md:px-12 lg:px-20 overflow-hidden">
                  <Hero profile={data.profile} />
                  <Portfolio projects={data.projects} />
                  <About about={data.about} skills={data.skills} />
                  <Resume resume={data.resume} />
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

