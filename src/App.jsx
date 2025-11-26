import { useLenis } from './hooks/useLenis';
import TorchEffect from './components/layout/TorchEffect';

/**
 * Main App Component
 * 
 * Features:
 * - Lenis smooth scroll initialization
 * - Torch/spotlight effect
 * - Gradient text hero section
 * 
 * @component
 */
function App() {
  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <div className="min-h-screen bg-base">
      {/* Torch spotlight effect */}
      <TorchEffect />

      {/* Main content */}
      <main className="relative z-10">
        {/* Hero section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-8 lg:px-16 text-center">
          <h1 className="text-[clamp(3.8rem,8vw,8rem)] font-bold gradient-text mb-8">
            Portfolio React + Firebase
          </h1>
          <p className="text-[clamp(1.6rem,3vw,2.4rem)] text-text-muted">
            With GSAP animations and torch effect 🔦
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
