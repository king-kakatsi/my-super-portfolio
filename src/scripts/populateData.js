/**
 * Data Population Script
 * Run this script to populate Firestore with skills and certifications
 * 
 * Usage: Open browser console on localhost:5173/admin and paste this script
 */

import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase/config';

// Technical Skills Data
const technicalSkills = [
  // Frontend
  { name: 'React', category: 'frontend', proficiency: 90 },
  { name: 'JavaScript', category: 'frontend', proficiency: 95 },
  { name: 'TypeScript', category: 'frontend', proficiency: 85 },
  { name: 'HTML/CSS', category: 'frontend', proficiency: 95 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 90 },
  
  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 85 },
  { name: 'Python', category: 'backend', proficiency: 80 },
  { name: 'REST API', category: 'backend', proficiency: 90 },
  { name: 'Firebase', category: 'backend', proficiency: 85 },
  
  // Mobile
  { name: 'Flutter', category: 'mobile', proficiency: 85 },
  { name: 'React Native', category: 'mobile', proficiency: 75 },
  { name: 'Android', category: 'mobile', proficiency: 80 },
  { name: 'iOS', category: 'mobile', proficiency: 75 },
  
  // Fullstack
  { name: 'MERN Stack', category: 'fullstack', proficiency: 85 },
  { name: 'Next.js', category: 'fullstack', proficiency: 80 },
  
  // Tools
  { name: 'Git', category: 'tools', proficiency: 90 },
  { name: 'Postman', category: 'tools', proficiency: 95 },
  { name: 'VS Code', category: 'tools', proficiency: 95 },
  { name: 'Figma', category: 'tools', proficiency: 80 },
];

// Soft Skills Data
const softSkills = [
  { name: 'Problem Solving', category: 'soft', proficiency: 90 },
  { name: 'Communication', category: 'soft', proficiency: 85 },
  { name: 'Team Collaboration', category: 'soft', proficiency: 90 },
  { name: 'Time Management', category: 'soft', proficiency: 85 },
  { name: 'Adaptability', category: 'soft', proficiency: 90 },
  { name: 'Critical Thinking', category: 'soft', proficiency: 85 },
];

// Certifications Data
const certifications = [
  {
    name: 'Postman API Expert',
    issuer: 'Postman',
    date: '2024',
    credentialId: 'POSTMAN-EXPERT-2024',
    description: 'Advanced API testing and development certification'
  },
  {
    name: 'IBM Mobile Application Development',
    issuer: 'IBM',
    date: '2023',
    credentialId: 'IBM-MOBILE-2023',
    description: 'Professional certification in mobile app development'
  },
  {
    name: 'Python Master Certification',
    issuer: 'Python Institute',
    date: '2023',
    credentialId: 'PYTHON-MASTER-2023',
    description: 'Advanced Python programming and development'
  },
  {
    name: 'Mobile Development with C#',
    issuer: 'Microsoft',
    date: '2022',
    credentialId: 'MS-CSHARP-MOBILE-2022',
    description: 'Xamarin and .NET MAUI mobile development'
  },
];

// Function to add skills
async function addSkills() {
  console.log('Adding skills to Firestore...');
  const skillsRef = collection(db, 'skills');
  
  const allSkills = [...technicalSkills, ...softSkills];
  
  for (const skill of allSkills) {
    try {
      await addDoc(skillsRef, skill);
      console.log(`✅ Added skill: ${skill.name}`);
    } catch (error) {
      console.error(`❌ Error adding skill ${skill.name}:`, error);
    }
  }
  
  console.log('✅ All skills added!');
}

// Function to add certifications
async function addCertifications() {
  console.log('Adding certifications to Firestore...');
  const certificationsRef = collection(db, 'certifications');
  
  for (const cert of certifications) {
    try {
      await addDoc(certificationsRef, cert);
      console.log(`✅ Added certification: ${cert.name}`);
    } catch (error) {
      console.error(`❌ Error adding certification ${cert.name}:`, error);
    }
  }
  
  console.log('✅ All certifications added!');
}

// Function to check and update project categories
async function updateProjectCategories() {
  console.log('Checking project categories...');
  const projectsRef = collection(db, 'projects');
  const snapshot = await getDocs(projectsRef);
  
  snapshot.forEach(async (docSnapshot) => {
    const project = docSnapshot.data();
    if (!project.category) {
      // Default to 'Web' if no category set
      await updateDoc(doc(db, 'projects', docSnapshot.id), {
        category: 'Web'
      });
      console.log(`✅ Updated project ${project.name} with category: Web`);
    }
  });
  
  console.log('✅ Project categories checked!');
}

// Run all functions
export async function populateDatabase() {
  try {
    await addSkills();
    await addCertifications();
    await updateProjectCategories();
    console.log('🎉 Database population complete!');
  } catch (error) {
    console.error('❌ Error populating database:', error);
  }
}

// Auto-run if this file is imported
// populateDatabase();
