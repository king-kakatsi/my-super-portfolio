import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: 'Home',
      portfolio: 'Portfolio',
      about: 'About Me',
      resume: 'Resume',
      contact: 'Contact',
      letsTalk: "Let's Talk"
    },
    hero: {
      subtitle: "Let's meet!",
      greeting: "I'm Leroi King Kakatsi",
      role: "Full stack developer Mobile and web",
      buttons: {
        works: "My Works",
        cv: "Download CV"
      },
      scroll: "Scroll for More * Scroll for More *"
    },
    about: {
      title: "About Me",
      stats: {
        clients: "Happy clients",
        experience: "Years of experience",
        projects: "Projects completed"
      },
      bio: {
        headline: "Passionate about creating seamless digital experiences.",
        description: "I am a Full Stack Developer specializing in Mobile and Web technologies. With a strong background in mathematics and computer science, I build robust, secure, and high-performance solutions. I love learning new technologies and solving complex problems."
      },
      services: "Services"
    },
    resume: {
      title: "Education & Experience",
      education: "Education",
      experience: "Experience"
    },
    contact: {
      title: "Let's work together!",
      subtitle: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        sending: "Sending..."
      },
      success: "Message sent successfully! I'll get back to you soon."
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      portfolio: 'Portfolio',
      about: 'À propos',
      resume: 'CV',
      contact: 'Contact',
      letsTalk: "Discutons"
    },
    hero: {
      subtitle: "Enchanté !",
      greeting: "Je suis Leroi King Kakatsi",
      role: "Développeur Full stack Mobile et Web",
      buttons: {
        works: "Mes Projets",
        cv: "Télécharger CV"
      },
      scroll: "Défiler pour plus * Défiler pour plus *"
    },
    about: {
      title: "À propos",
      stats: {
        clients: "Clients satisfaits",
        experience: "Années d'expérience",
        projects: "Projets terminés"
      },
      bio: {
        headline: "Passionné par la création d'expériences numériques fluides.",
        description: "Je suis un développeur Full Stack spécialisé dans les technologies mobiles et Web. Avec une solide formation en mathématiques et en informatique, je conçois des solutions robustes, sécurisées et performantes. J'aime apprendre de nouvelles technologies et résoudre des problèmes complexes."
      },
      services: "Services"
    },
    resume: {
      title: "Formation & Expérience",
      education: "Formation",
      experience: "Expérience"
    },
    contact: {
      title: "Travaillons ensemble !",
      subtitle: "Je suis toujours ouvert à la discussion de nouveaux projets, d'idées créatives ou d'opportunités de faire partie de votre vision.",
      form: {
        name: "Votre Nom",
        email: "Votre Email",
        subject: "Sujet",
        message: "Message",
        send: "Envoyer le message",
        sending: "Envoi..."
      },
      success: "Message envoyé avec succès ! Je vous recontacterai bientôt."
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  const t = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], translations[language]) || path;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
