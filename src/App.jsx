import { useEffect } from 'react';
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
import { seedDatabase } from './utils/seedData';
import { useState } from 'react';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();
  
  // Initialize Torch effect logic
  useTorchEffect();

  // Initialize global animations
  useAnimations();

  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (confirm('This will overwrite existing data in Firestore. Continue?')) {
      setSeeding(true);
      const success = await seedDatabase();
      if (success) {
        alert('Database seeded successfully!');
      } else {
        alert('Error seeding database. Check console for details.');
      }
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-base text-text-medium selection:bg-accent selection:text-white">
      {/* Torch Effect Layer */}
      <TorchEffect />

      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://dummyimage.com/2560x1440/4d4d4d/636363')] bg-cover bg-center bg-no-repeat grayscale mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-base via-transparent to-base"></div>
      </div>

      {/* Seed Button (Temporary) */}
      <button 
        onClick={handleSeed}
        disabled={seeding}
        className="fixed bottom-4 left-4 z-[100] px-4 py-2 bg-red-600 text-white text-xs font-bold rounded shadow-lg hover:bg-red-700 transition-colors"
      >
        {seeding ? 'Seeding...' : 'SEED DB'}
      </button>

      {/* Header (Navigation) */}
      <Header />

      {/* Sidebar (Avatar & Info) */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="relative z-10 lg:ml-[300px] xl:ml-[350px] px-6 md:px-12 lg:px-20 overflow-hidden">
        <Hero />
        <Portfolio />
        <About />
        <Resume />
        <Contact />
      </main>
    </div>
  );
}

export default App;
