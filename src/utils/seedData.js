import { db } from '../services/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';

// Hardcoded data from the current application
const portfolioData = {
  // Profile / Hero Data
  profile: {
    name: "Alex Walker",
    title: "Digital designer and illustrator",
    specialization: "UI/UX designer and frontend developer",
    location: "Odesa, Ukraine",
    email: "example@example.com",
    socials: [
      { platform: "Dribbble", url: "https://dribbble.com/" },
      { platform: "Behance", url: "https://www.behance.net/" },
      { platform: "Instagram", url: "https://www.instagram.com/" },
      { platform: "Twitch", url: "https://www.twitch.tv/" },
      { platform: "Pinterest", url: "https://www.pinterest.com/" }
    ]
  },

  // About Section Data
  about: {
    stats: [
      { number: '40+', label: 'Happy clients' },
      { number: '2+', label: 'Years of experience' },
      { number: '50+', label: 'Projects completed' }
    ],
    bio: {
      headline: "I wonder if I've been changed in the night? Let me think. Was I the same when I got up this morning?",
      description: "I am a creative designer and developer, who aims to work with small businesses and marginalized communities to bring their passions to life. I offer both design and development services of web applications or websites!"
    },
    services: [
      'Web Development',
      'UI/UX Design',
      'Mobile Apps',
      'Brand Identity'
    ]
  },

  // Resume / Experience Data
  resume: {
    education: [
      {
        period: '2018 - 2022',
        title: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        description: 'Focused on software engineering, web development, and UI/UX design principles.'
      },
      {
        period: '2016 - 2018',
        title: 'High School Diploma',
        institution: 'Central High School',
        description: 'Specialized in Mathematics and Computer Science.'
      }
    ],
    experience: [
      {
        period: '2022 - Present',
        title: 'Senior Frontend Developer',
        company: 'Tech Solutions Inc.',
        description: 'Leading frontend development for enterprise applications using React, TypeScript, and modern web technologies.'
      },
      {
        period: '2020 - 2022',
        title: 'UI/UX Designer',
        company: 'Creative Agency',
        description: 'Designed user interfaces and experiences for various clients, focusing on modern and accessible design.'
      }
    ]
  },

  // Portfolio Projects Data
  projects: [
    {
      id: 1,
      title: 'Isometric House',
      category: 'Illustrations',
      tags: ['Illustrations', '3D Render'],
      image: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio.'
    },
    {
      id: 2,
      title: 'Dashboard Template',
      category: 'UI Design',
      tags: ['UI Design', 'Figma'],
      image: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
    },
    {
      id: 3,
      title: 'Notification Icon',
      category: 'Illustrations',
      tags: ['Illustrations', '3D Render'],
      image: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
    },
    {
      id: 4,
      title: 'Smart Penguin',
      category: 'Illustrations',
      tags: ['Illustrations', 'AI Experiment'],
      image: 'https://dummyimage.com/800x800/3c3c3c/636363',
      description: 'Mauris porttitor lobortis ligula, quis molestie lorem scelerisque eu. Morbi aliquam enim odio, a mollis ipsum tristique eu.'
    }
  ]
};

/**
 * Function to seed the database with initial data
 */
export const seedDatabase = async () => {
  try {
    const batch = writeBatch(db);

    console.log("Starting database seed...");

    // 1. Seed Profile
    const profileRef = doc(db, 'content', 'profile');
    batch.set(profileRef, portfolioData.profile);

    // 2. Seed About
    const aboutRef = doc(db, 'content', 'about');
    batch.set(aboutRef, portfolioData.about);

    // 3. Seed Resume
    const resumeRef = doc(db, 'content', 'resume');
    batch.set(resumeRef, portfolioData.resume);

    // 4. Seed Projects (as a separate collection)
    // First, delete existing projects to avoid duplicates if re-running
    // (In a real app, we'd query and delete, but for seeding we'll just overwrite by ID if we used specific IDs)
    // Here we'll just add them.
    
    for (const project of portfolioData.projects) {
      // Use the project ID as the document ID for stability
      const projectRef = doc(db, 'projects', project.id.toString());
      batch.set(projectRef, project);
    }

    await batch.commit();
    console.log("Database seeded successfully! 🚀");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
};
