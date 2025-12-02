import { useState } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
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
    { name: 'MongoDB', category: 'backend', proficiency: 80 },
    { name: 'Express', category: 'backend', proficiency: 80 },
    
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

  // Categories Data
  const categories = [
    { 
      id: 'mobile', 
      name: 'Mobile', 
      icon: 'DeviceMobile',
      color: 'purple',
      gradient: 'from-purple-600/20 via-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      order: 1
    },
    { 
      id: 'frontend', 
      name: 'Frontend', 
      icon: 'Globe',
      color: 'blue',
      gradient: 'from-blue-600/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      order: 2
    },
    { 
      id: 'backend', 
      name: 'Backend', 
      icon: 'HardDrives',
      color: 'wine',
      gradient: 'from-wine/20 via-wine/10 to-transparent',
      borderColor: 'border-wine/30',
      order: 3
    },
    { 
      id: 'fullstack', 
      name: 'Fullstack', 
      icon: 'Stack',
      color: 'orange',
      gradient: 'from-orange-600/20 via-orange-500/10 to-transparent',
      borderColor: 'border-orange-500/30',
      order: 4
    },
    { 
      id: 'database', 
      name: 'Database', 
      icon: 'Database',
      color: 'yellow',
      gradient: 'from-yellow-600/20 via-yellow-500/10 to-transparent',
      borderColor: 'border-yellow-500/30',
      order: 5
    },
    { 
      id: 'infrastructure', 
      name: 'Infrastructure', 
      icon: 'Cloud',
      color: 'cyan',
      gradient: 'from-cyan-600/20 via-cyan-500/10 to-transparent',
      borderColor: 'border-cyan-500/30',
      order: 6
    },
    { 
      id: 'orm', 
      name: 'ORM', 
      icon: 'Table',
      color: 'pink',
      gradient: 'from-pink-600/20 via-pink-500/10 to-transparent',
      borderColor: 'border-pink-500/30',
      order: 7
    },
    { 
      id: 'tools', 
      name: 'Tools', 
      icon: 'Wrench',
      color: 'green',
      gradient: 'from-green-600/20 via-green-500/10 to-transparent',
      borderColor: 'border-green-500/30',
      order: 8
    },
    { 
      id: 'soft', 
      name: 'Soft Skills', 
      icon: 'Users',
      color: 'teal',
      gradient: 'from-teal-600/20 via-teal-500/10 to-transparent',
      borderColor: 'border-teal-500/30',
      order: 9
    },
    { 
      id: 'others', 
      name: 'Others', 
      icon: 'Question',
      color: 'gray',
      gradient: 'from-gray-600/20 via-gray-500/10 to-transparent',
      borderColor: 'border-gray-500/30',
      order: 10
    }
  ];

  /**
   * Populate categories collection
   */
  const populateCategories = async () => {
    setLoading(true);
    try {
      const categoriesRef = collection(db, 'categories');
      
      // Fetch existing categories
      const snapshot = await getDocs(categoriesRef);
      const existingCategoryIds = snapshot.docs.map(doc => doc.id);
      
      // Filter out categories that already exist
      const newCategories = categories.filter(cat => 
        !existingCategoryIds.includes(cat.id)
      );
      
      if (newCategories.length === 0) {
        toast.success('All categories already exist in database!');
        setLoading(false);
        return;
      }
      
      // Add only new categories with custom IDs
      for (const category of newCategories) {
        const { id, ...categoryData } = category;
        await setDoc(doc(db, 'categories', id), categoryData);
      }
      
      toast.success(`Added ${newCategories.length} new categories! (${existingCategoryIds.length} already existed)`);
    } catch (error) {
      console.error('Error adding categories:', error);
      toast.error('Failed to add categories');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Migrate skills to use category IDs instead of category names
   */
  const migrateSkillsToCategories = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch all categories
      const categoriesRef = collection(db, 'categories');
      const categoriesSnapshot = await getDocs(categoriesRef);
      
      const categoryNameToId = {};
      categoriesSnapshot.docs.forEach(docSnap => {
        const category = docSnap.data();
        categoryNameToId[category.name.toLowerCase()] = docSnap.id;
      });

      console.log('Category mapping created:', categoryNameToId);

      // Step 2: Fetch all skills
      const skillsRef = collection(db, 'skills');
      const skillsSnapshot = await getDocs(skillsRef);
      
      let updated = 0;
      let skipped = 0;

      // Step 3: Update each skill
      for (const docSnapshot of skillsSnapshot.docs) {
        const skill = docSnapshot.data();
        
        // Check if category is a string (name) and not already an ID
        if (skill.category && typeof skill.category === 'string') {
          // Check if it's already an ID
          const isAlreadyId = categoriesSnapshot.docs.some(doc => doc.id === skill.category);
          
          if (isAlreadyId) {
            console.log(`Skill "${skill.name}" already has category ID, skipping...`);
            skipped++;
            continue;
          }

          // Convert category name to ID
          const categoryId = categoryNameToId[skill.category.toLowerCase()];
          
          if (categoryId) {
            await updateDoc(doc(db, 'skills', docSnapshot.id), {
              category: categoryId
            });
            console.log(`Updated skill "${skill.name}": ${skill.category} -> ${categoryId}`);
            updated++;
          } else {
            console.warn(`Category "${skill.category}" not found for skill "${skill.name}"`);
          }
        }
      }

      // Report results
      let message = `✅ Migration complete! Updated ${updated} skills`;
      if (skipped > 0) {
        message += `, skipped ${skipped} already migrated`;
      }
      
      toast.success(message);
    } catch (error) {
      console.error('Error migrating skills:', error);
      toast.error('Failed to migrate skills to category IDs');
    } finally {
      setLoading(false);
    }
  };

  const populateSkills = async () => {
    setLoading(true);
    try {
      const skillsRef = collection(db, 'skills');
      
      // Fetch existing skills
      const snapshot = await getDocs(skillsRef);
      const existingSkills = snapshot.docs.map(doc => doc.data().name.toLowerCase());
      
      const allSkills = [...technicalSkills, ...softSkills];
      
      // Filter out skills that already exist
      const newSkills = allSkills.filter(skill => 
        !existingSkills.includes(skill.name.toLowerCase())
      );
      
      if (newSkills.length === 0) {
        toast.success('All skills already exist in database!');
        setLoading(false);
        return;
      }
      
      // Add only new skills
      for (const skill of newSkills) {
        await addDoc(skillsRef, skill);
      }
      
      toast.success(`Added ${newSkills.length} new skills! (${existingSkills.length} already existed)`);
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
      
      // Fetch existing certifications
      const snapshot = await getDocs(certificationsRef);
      const existingCerts = snapshot.docs.map(doc => doc.data().name.toLowerCase());
      
      // Filter out certifications that already exist
      const newCerts = certifications.filter(cert => 
        !existingCerts.includes(cert.name.toLowerCase())
      );
      
      if (newCerts.length === 0) {
        toast.success('All certifications already exist in database!');
        setLoading(false);
        return;
      }
      
      // Add only new certifications
      for (const cert of newCerts) {
        await addDoc(certificationsRef, cert);
      }
      
      toast.success(`Added ${newCerts.length} new certifications! (${existingCerts.length} already existed)`);
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

  /**
   * Migrate projects to use skill IDs instead of skill names
   * Converts technologies array from ['React', 'Node.js'] to ['skillId1', 'skillId2']
   */
  const migrateProjectsToSkillIds = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch all skills and create name-to-ID mapping
      const skillsRef = collection(db, 'skills');
      const skillsSnapshot = await getDocs(skillsRef);
      
      const skillNameToId = {};
      skillsSnapshot.docs.forEach(doc => {
        const skill = doc.data();
        skillNameToId[skill.name] = doc.id;
      });

      console.log('Skill mapping created:', skillNameToId);

      // Step 2: Fetch all projects
      const projectsRef = collection(db, 'projects');
      const projectsSnapshot = await getDocs(projectsRef);
      
      let updated = 0;
      let skipped = 0;
      const missingSkills = new Set();

      // Step 3: Update each project
      for (const docSnapshot of projectsSnapshot.docs) {
        const project = docSnapshot.data();
        
        // Check if technologies exist and are strings (not already IDs)
        if (project.technologies && Array.isArray(project.technologies)) {
          // Check if already migrated (technologies are IDs, not names)
          const firstTech = project.technologies[0];
          const isAlreadyMigrated = firstTech && skillsSnapshot.docs.some(doc => doc.id === firstTech);
          
          if (isAlreadyMigrated) {
            console.log(`Project "${project.name}" already migrated, skipping...`);
            skipped++;
            continue;
          }

          // Convert skill names to IDs
          const technologyIds = [];
          project.technologies.forEach(techName => {
            const skillId = skillNameToId[techName];
            if (skillId) {
              technologyIds.push(skillId);
            } else {
              console.warn(`Skill "${techName}" not found in database`);
              missingSkills.add(techName);
            }
          });

          // Update project with skill IDs
          await updateDoc(doc(db, 'projects', docSnapshot.id), {
            technologies: technologyIds
          });
          
          console.log(`Updated project "${project.name}": ${project.technologies.join(', ')} -> ${technologyIds.length} IDs`);
          updated++;
        }
      }

      // Report results
      let message = `✅ Migration complete! Updated ${updated} projects`;
      if (skipped > 0) {
        message += `, skipped ${skipped} already migrated`;
      }
      if (missingSkills.size > 0) {
        message += `\n⚠️ Missing skills: ${Array.from(missingSkills).join(', ')}`;
        console.warn('Missing skills:', Array.from(missingSkills));
      }
      
      toast.success(message);
    } catch (error) {
      console.error('Error migrating projects:', error);
      toast.error('Failed to migrate projects to skill IDs');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Break down MERN Stack into individual skills
   * Replaces "MERN Stack" with MongoDB, Express, React, Node.js in projects
   */
  const breakdownMernStack = async () => {
    setLoading(true);
    try {
      // Step 1: Fetch all skills
      const skillsRef = collection(db, 'skills');
      const skillsSnapshot = await getDocs(skillsRef);
      
      // Find MERN Stack skill and individual component skills
      let mernSkill = null;
      const componentSkills = {
        mongodb: null,
        express: null,
        react: null,
        nodejs: null
      };
      
      skillsSnapshot.docs.forEach(doc => {
        const skill = doc.data();
        const skillName = skill.name.toLowerCase();
        
        if (skillName === 'mern stack' || skillName === 'mern') {
          mernSkill = { id: doc.id, ...skill };
        } else if (skillName === 'mongodb') {
          componentSkills.mongodb = doc.id;
        } else if (skillName === 'express' || skillName === 'express.js') {
          componentSkills.express = doc.id;
        } else if (skillName === 'react' || skillName === 'react.js') {
          componentSkills.react = doc.id;
        } else if (skillName === 'node.js' || skillName === 'node') {
          componentSkills.nodejs = doc.id;
        }
      });

      if (!mernSkill) {
        toast.success('No MERN Stack skill found in database');
        setLoading(false);
        return;
      }

      // Check if all component skills exist
      const missingSkills = [];
      if (!componentSkills.mongodb) missingSkills.push('MongoDB');
      if (!componentSkills.express) missingSkills.push('Express');
      if (!componentSkills.react) missingSkills.push('React');
      if (!componentSkills.nodejs) missingSkills.push('Node.js');

      if (missingSkills.length > 0) {
        toast.error(`Missing component skills: ${missingSkills.join(', ')}. Please add them first.`);
        setLoading(false);
        return;
      }

      // Step 2: Find and update projects using MERN Stack
      const projectsRef = collection(db, 'projects');
      const projectsSnapshot = await getDocs(projectsRef);
      
      let updatedProjects = 0;
      const componentIds = Object.values(componentSkills).filter(Boolean);

      for (const docSnapshot of projectsSnapshot.docs) {
        const project = docSnapshot.data();
        
        if (project.technologies && Array.isArray(project.technologies)) {
          // Check if project uses MERN (by ID or name)
          const usesMern = project.technologies.some(tech => 
            tech === mernSkill.id || 
            tech === 'MERN Stack' || 
            tech === 'MERN'
          );

          if (usesMern) {
            // Remove MERN and add individual components (avoid duplicates)
            const newTechnologies = project.technologies
              .filter(tech => 
                tech !== mernSkill.id && 
                tech !== 'MERN Stack' && 
                tech !== 'MERN'
              );
            
            // Add component skills if not already present
            componentIds.forEach(skillId => {
              if (!newTechnologies.includes(skillId)) {
                newTechnologies.push(skillId);
              }
            });

            // Update project
            await updateDoc(doc(db, 'projects', docSnapshot.id), {
              technologies: newTechnologies
            });

            console.log(`Updated project "${project.name}": Replaced MERN with individual components`);
            updatedProjects++;
          }
        }
      }

      // Step 3: Delete MERN Stack skill from database
      await deleteDoc(doc(db, 'skills', mernSkill.id));
      console.log('Deleted MERN Stack skill from database');

      toast.success(`✅ Breakdown complete! Updated ${updatedProjects} projects and removed MERN Stack skill`);
    } catch (error) {
      console.error('Error breaking down MERN stack:', error);
      toast.error('Failed to breakdown MERN stack');
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
              onClick={populateCategories}
              loading={loading}
              icon={<CheckCircle weight="bold" />}
            >
              Add Categories ({categories.length})
            </Button>

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
              variant="danger"
              onClick={migrateSkillsToCategories}
              loading={loading}
              icon={<Database weight="bold" />}
            >
              Migrate Skills to Category IDs
            </Button>

            <Button
              variant="danger"
              onClick={migrateProjectsToSkillIds}
              loading={loading}
              icon={<Database weight="bold" />}
            >
              Migrate Projects to Skill IDs
            </Button>

            <Button
              variant="danger"
              onClick={breakdownMernStack}
              loading={loading}
              icon={<Database weight="bold" />}
            >
              Breakdown MERN Stack
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
