import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import TorchEffect from './components/layout/TorchEffect';
import './App.css';

function App() {
  // Initialiser Lenis smooth scroll
  useLenis();

  return (
    <div className="app">
      {/* Effet torch/spotlight */}
      <TorchEffect />

      {/* Contenu principal */}
      <main className="main-content">
        <section className="hero">
          <h1>Portfolio React + Firebase</h1>
          <p>Avec animations GSAP et effet torch 🔦</p>
        </section>
      </main>
    </div>
  );
}

export default App;
