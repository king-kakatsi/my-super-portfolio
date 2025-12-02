import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

// Cache for categories to avoid repeated Firestore queries
const categoryCache = new Map();

/**
 * Get category by ID from Firestore
 * @param {string} categoryId - The category ID
 * @returns {Promise<Object|null>} Category object or null if not found
 */
export const getCategoryById = async (categoryId) => {
  if (!categoryId) return null;

  // Check cache first
  if (categoryCache.has(categoryId)) {
    return categoryCache.get(categoryId);
  }

  try {
    const categoryRef = doc(db, 'categories', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (categorySnap.exists()) {
      const category = {
        id: categorySnap.id,
        ...categorySnap.data()
      };
      
      // Cache the result
      categoryCache.set(categoryId, category);
      return category;
    }

    return null;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

/**
 * Get multiple categories by IDs
 * @param {string[]} categoryIds - Array of category IDs
 * @returns {Promise<Object[]>} Array of category objects
 */
export const getCategoriesByIds = async (categoryIds) => {
  if (!categoryIds || !Array.isArray(categoryIds)) return [];

  const categories = await Promise.all(
    categoryIds.map(id => getCategoryById(id))
  );

  return categories.filter(cat => cat !== null);
};

/**
 * Clear the category cache (useful after updates)
 */
export const clearCategoryCache = () => {
  categoryCache.clear();
};
