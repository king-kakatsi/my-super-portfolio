import { useState } from 'react';
import { storage } from '../services/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

/**
 * File Upload Hook
 * Handles file uploads to Firebase Storage with progress tracking
 * 
 * @param {string} folder - Storage folder path (e.g., 'avatars', 'projects')
 * @returns {Object} Upload methods and state
 */
export const useFileUpload = (folder = 'uploads') => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  /**
   * Upload file to Firebase Storage
   * @param {File} file - File object to upload
   * @param {string} customName - Optional custom filename
   * @returns {Promise<string>} Download URL
   */
  const upload = async (file, customName = null) => {
    if (!file) {
      throw new Error('No file provided');
    }

    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      // Generate unique filename
      const timestamp = Date.now();
      const filename = customName || `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `${folder}/${filename}`);

      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Track upload progress
            const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(prog);
          },
          (error) => {
            // Handle upload error
            console.error('Upload error:', error);
            setError(error.message);
            setUploading(false);
            reject(error);
          },
          async () => {
            // Upload complete, get download URL
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              setUrl(downloadURL);
              setUploading(false);
              setProgress(100);
              resolve(downloadURL);
            } catch (err) {
              setError(err.message);
              setUploading(false);
              reject(err);
            }
          }
        );
      });
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message);
      setUploading(false);
      throw err;
    }
  };

  /**
   * Reset upload state
   */
  const reset = () => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setUrl(null);
  };

  return {
    upload,
    uploading,
    progress,
    error,
    url,
    reset
  };
};
