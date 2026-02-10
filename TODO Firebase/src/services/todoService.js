import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase/firebaseconfig';

const TODOS_COLLECTION = 'todos';

export const addTodo = async (userId, todoData) => {
  try {
    const docRef = await addDoc(collection(db, TODOS_COLLECTION), {
      ...todoData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getTodos = async (userId) => {
  try {
    const q = query(
      collection(db, TODOS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({ id: doc.id, ...doc.data() });
    });
    return todos;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (todoId, updateData) => {
  try {
    const todoRef = doc(db, TODOS_COLLECTION, todoId);
    await updateDoc(todoRef, {
      ...updateData,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (todoId) => {
  try {
    await deleteDoc(doc(db, TODOS_COLLECTION, todoId));
  } catch (error) {
    throw error;
  }
};