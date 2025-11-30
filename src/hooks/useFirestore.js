import { useState, useEffect, useCallback } from 'react';
import { db } from '../services/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';

/**
 * Generic Firestore CRUD Hook
 * Provides methods to create, read, update, delete Firestore documents
 * 
 * @param {string} collectionName - Firestore collection name
 * @param {Object} options - Optional configuration
 * @param {string} options.orderByField - Field to order by
 * @param {string} options.orderDirection - 'asc' or 'desc'
 * @returns {Object} CRUD methods and state
 */
export const useFirestore = (collectionName, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all documents from collection
   */
  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let q = collection(db, collectionName);
      
      if (options.orderByField) {
        q = query(
          collection(db, collectionName),
          orderBy(options.orderByField, options.orderDirection || 'asc')
        );
      }

      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setData(items);
      return items;
    } catch (err) {
      console.error(`Error fetching ${collectionName}:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [collectionName, options.orderByField, options.orderDirection]);

  /**
   * Fetch single document by ID
   * @param {string} id - Document ID
   */
  const fetchOne = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Document not found');
      }
    } catch (err) {
      console.error(`Error fetching document ${id}:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create new document
   * @param {Object} data - Document data
   * @returns {Promise<string>} New document ID
   */
  const create = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      await fetchAll(); // Refresh data
      return docRef.id;
    } catch (err) {
      console.error(`Error creating document:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update existing document
   * @param {string} id - Document ID
   * @param {Object} data - Updated data
   */
  const update = async (id, data) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });

      await fetchAll(); // Refresh data
    } catch (err) {
      console.error(`Error updating document ${id}:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete document
   * @param {string} id - Document ID
   */
  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);

      await fetchAll(); // Refresh data
    } catch (err) {
      console.error(`Error deleting document ${id}:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update single document (for content/profile, content/about, etc.)
   * @param {string} docId - Document ID
   * @param {Object} data - Updated data
   */
  const updateSingle = async (docId, data) => {
    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (err) {
      console.error(`Error updating document:`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    data,
    loading,
    error,
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
    updateSingle,
    refresh: fetchAll
  };
};
