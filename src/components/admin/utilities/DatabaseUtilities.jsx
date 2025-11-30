import { useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import toast from 'react-hot-toast';
import { Database, CheckCircle } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Button from '../ui/Button';

/**
 * Database Utilities Component
 * Admin tool to populate database with initial data
 */
const DatabaseUtilities = () => {
  const [loading, setLoading] = useState(false);

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

  const populateSkills = async () => {
    setLoading(true);
    try {
      const skillsRef = collection(db, 'skills');
      const allSkills = [...technicalSkills, ...softSkills];
      
      for (const skill of allSkills) {
        await addDoc(skillsRef, skill);
      }
      
      toast.success(`Added ${allSkills.length} skills to database!`);
    } catch (error) {
      console.error('Error adding skills:', error);
      toast.error('Failed to add skills');
    } finally {
      setLoading(false);
    }
  };

  const populateCertifications = async () => {
    setLoading(true);
    try {
      const certificationsRef = collection(db, 'certifications');
      
      for (const cert of certifications) {
        await addDoc(certificationsRef, cert);
      }
      
      toast.success(`Added ${certifications.length} certifications to database!`);
    } catch (error) {
      console.error('Error adding certifications:', error);
      toast.error('Failed to add certifications');
    } finally {
      setLoading(false);
    }
  };

  const updateProjectCategories = async () => {
    setLoading(true);
    try {
      const projectsRef = collection(db, 'projects');
      const snapshot = await getDocs(projectsRef);
      let updated = 0;
      
      for (const docSnapshot of snapshot.docs) {
        const project = docSnapshot.data();
        if (!project.category) {
          await updateDoc(doc(db, 'projects', docSnapshot.id), {
            category: 'Web'
          });
          updated++;
        }
      }
      
      toast.success(`Updated ${updated} projects with categories!`);
    } catch (error) {
      console.error('Error updating projects:', error);
      toast.error('Failed to update project categories');
    } finally {
      setLoading(false);
    }
  };

  const populateAll = async () => {
    setLoading(true);
    try {
      await populateSkills();
      await populateCertifications();
      await updateProjectCategories();
      toast.success('Database population complete!');
    } catch (error) {
      console.error('Error populating database:', error);
      toast.error('Failed to populate database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Body>
          <div className="flex items-center gap-3 mb-6">
            <Database size={32} weight="bold" className="text-accent" />
            <div>
              <h2 className="text-2xl font-bold text-text-bright">Database Utilities</h2>
              <p className="text-text-muted">Populate database with initial data</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="primary"
              onClick={populateSkills}
              loading={loading}
              icon={<CheckCircle weight="bold" />}
            >
              Add Skills ({technicalSkills.length + softSkills.length})
            </Button>

            <Button
              variant="primary"
              onClick={populateCertifications}
              loading={loading}
              icon={<CheckCircle weight="bold" />}
            >
              Add Certifications ({certifications.length})
            </Button>

            <Button
              variant="primary"
              onClick={updateProjectCategories}
              loading={loading}
              icon={<CheckCircle weight="bold" />}
            >
              Update Project Categories
            </Button>

            <Button
              variant="accent"
              onClick={populateAll}
              loading={loading}
              icon={<Database weight="bold" />}
              className="md:col-span-2"
            >
              Populate All Data
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DatabaseUtilities;
