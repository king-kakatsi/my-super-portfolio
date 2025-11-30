import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignIn } from '@phosphor-icons/react';
import toast from 'react-hot-toast';
import Input from '../admin/ui/Input';
import Button from '../admin/ui/Button';

/**
 * Login Form Component
 * Email/password authentication form
 */
const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  /**
   * Validate form
   */
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!', {
        style: {
          background: '#8B1538',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password', {
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-3">
            Admin Portal
          </h1>
          <p className="text-text-muted">
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Login Form */}
        <form 
          onSubmit={handleSubmit}
          className="bg-base-tint border border-white/10 rounded-2xl p-8"
        >
          <div className="space-y-6">
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              icon={<SignIn weight="bold" />}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        </form>

        {/* Footer Note */}
        <p className="text-center text-text-muted text-sm mt-6">
          Protected area • Authorized access only
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
