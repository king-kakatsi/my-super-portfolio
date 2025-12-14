import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

/**
 * Custom hook to fetch portfolio data from Firestore
 * Returns loading state, error state, and data objects
 */
export const usePortfolioData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    profile: null,
    about: null,
    resume: null,
    projects: [],
    skills: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch single documents
        const profileDoc = await getDoc(doc(db, 'content', 'profile'));
        const aboutDoc = await getDoc(doc(db, 'content', 'about'));
        const resumeDoc = await getDoc(doc(db, 'content', 'resume'));

        // Fetch collections
        // Projects are sorted client-side by order field (see Portfolio.jsx)
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const skillsSnapshot = await getDocs(collection(db, 'skills'));

        setData({
          profile: profileDoc.exists() ? profileDoc.data() : null,
          about: aboutDoc.exists() ? aboutDoc.data() : null,
          resume: resumeDoc.exists() ? resumeDoc.data() : null,
          projects: projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          skills: skillsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        });
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, error, data };
};
