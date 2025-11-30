import { useState } from 'react';
import { Envelope, PaperPlaneTilt } from '@phosphor-icons/react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import toast, { Toaster } from 'react-hot-toast';

/**
 * Contact Section
 * Contact form with validation and toast notifications
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save message to Firestore
      await addDoc(collection(db, 'messages'), {
        ...formData,
        read: false,
        createdAt: Timestamp.now()
      });

      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 4000,
        style: {
          background: '#8B1538',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.', {
        style: {
          background: '#ef4444',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <Toaster position="bottom-right" />
      
      {/* Section Title */}
      <div className="mb-16 md:mb-24">
        <div className="animate-in-up flex items-center gap-3 mb-6 text-text-muted">
          <Envelope weight="bold" className="text-accent" />
          <span className="uppercase tracking-widest text-sm font-medium">Contact</span>
        </div>
        <h2 className="animate-in-up text-4xl md:text-6xl font-bold text-text-bright max-w-3xl">
          Let's work together!
        </h2>
        <p className="animate-in-up text-xl text-text-muted mt-6 max-w-2xl">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
      </div>

      {/* Contact Form */}
      {/* Contact Form Card */}
      <div className="max-w-4xl mx-auto animate-in-up bg-gray-800 rounded-xl p-8 md:p-12 border border-white/5 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-text-medium font-medium mb-3">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl bg-base border border-white/10 text-text-bright focus:border-accent focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-text-medium font-medium mb-3">
                Your Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl bg-base border border-white/10 text-text-bright focus:border-accent focus:outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-text-medium font-medium mb-3">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 rounded-xl bg-base border border-white/10 text-text-bright focus:border-accent focus:outline-none transition-colors"
              placeholder="Project Inquiry"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-text-medium font-medium mb-3">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full px-6 py-4 rounded-xl bg-base border border-white/10 text-text-bright focus:border-accent focus:outline-none transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto group flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-wine text-white font-bold hover:bg-wine-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            <PaperPlaneTilt weight="bold" className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>

    </section>
  );
};

export default Contact;
