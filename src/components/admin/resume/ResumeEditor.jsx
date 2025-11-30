import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import toast from 'react-hot-toast';
import { FloppyDisk, Plus } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Tabs from '../ui/Tabs';
import Button from '../ui/Button';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';

/**
 * Resume Editor Component
 * Manage experience and education
 */
const ResumeEditor = () => {
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState({
    experience: [],
    education: []
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, 'content', 'resume');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setResume(docSnap.data());
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleSave = async (type, data) => {
    try {
      const docRef = doc(db, 'content', 'resume');
      await updateDoc(docRef, { [type]: data });
      setResume({ ...resume, [type]: data });
      toast.success('Resume updated!');
    } catch (error) {
      toast.error('Failed to update resume');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <Card.Body>
          <Tabs defaultTab="experience">
            <Tabs.List>
              <Tabs.Tab id="experience">Experience</Tabs.Tab>
              <Tabs.Tab id="education">Education</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel id="experience">
              <ExperienceForm 
                experiences={resume.experience} 
                onSave={(data) => handleSave('experience', data)}
              />
            </Tabs.Panel>

            <Tabs.Panel id="education">
              <EducationForm 
                educations={resume.education} 
                onSave={(data) => handleSave('education', data)}
              />
            </Tabs.Panel>
          </Tabs>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResumeEditor;
