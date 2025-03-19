
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

// Koleksyon yo
const BLOGS_COLLECTION = 'blogs';

// Fonksyon pou ajoute blog
export async function addBlog(blogData: any) {
  try {
    const docRef = await addDoc(collection(db, BLOGS_COLLECTION), blogData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding blog: ", error);
    return { success: false, error };
  }
}

// Fonksyon pou pran tout blog yo
export async function getAllBlogs() {
  try {
    const querySnapshot = await getDocs(collection(db, BLOGS_COLLECTION));
    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, blogs };
  } catch (error) {
    console.error("Error getting blogs: ", error);
    return { success: false, error };
  }
}

// Fonksyon pou efase yon blog
export async function deleteBlog(blogId: string) {
  try {
    await deleteDoc(doc(db, BLOGS_COLLECTION, blogId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog: ", error);
    return { success: false, error };
  }
}

// Fonksyon pou mete ajou yon blog
export async function updateBlog(blogId: string, blogData: any) {
  try {
    await updateDoc(doc(db, BLOGS_COLLECTION, blogId), blogData);
    return { success: true };
  } catch (error) {
    console.error("Error updating blog: ", error);
    return { success: false, error };
  }
}
