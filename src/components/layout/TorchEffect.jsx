import { useTorchEffect } from '../../hooks/useTorchEffect';
import './TorchEffect.css';

/**
 * Composant pour l'effet torch/spotlight
 * Crée un halo de lumière qui suit le curseur
 */
const TorchEffect = () => {
  const { x, y } = useTorchEffect();

  return (
    <div
      className="torch-effect"
      style={{
        background: `radial-gradient(
          circle 300px at ${x}px ${y}px,
          rgba(255, 255, 255, 0.15),
          transparent 80%
        )`
      }}
    />
  );
};

export default TorchEffect;
