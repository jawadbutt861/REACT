import { db } from '../config/firebase/firebaseconfig';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Get progress for a specific student and course
export const getCourseProgress = async (studentId, courseId) => {
  try {
    const progressRef = doc(db, 'courseProgress', `${studentId}_${courseId}`);
    const progressDoc = await getDoc(progressRef);
    
    if (progressDoc.exists()) {
      return progressDoc.data();
    } else {
      // Initialize progress if it doesn't exist
      const initialProgress = {
        studentId,
        courseId,
        progress: 0,
        status: 'not_started',
        lastUpdated: new Date().toISOString(),
        completedLessons: [],
        totalLessons: 10 // Default total lessons
      };
      
      await setDoc(progressRef, initialProgress);
      return initialProgress;
    }
  } catch (error) {
    console.error('Error getting course progress:', error);
    return {
      studentId,
      courseId,
      progress: 0,
      status: 'not_started',
      lastUpdated: new Date().toISOString(),
      completedLessons: [],
      totalLessons: 10
    };
  }
};

// Get all progress for a student
export const getStudentProgress = async (studentId) => {
  try {
    const progressQuery = query(
      collection(db, 'courseProgress'),
      where('studentId', '==', studentId)
    );
    
    const progressSnapshot = await getDocs(progressQuery);
    const progressData = [];
    
    progressSnapshot.forEach((doc) => {
      progressData.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return progressData;
  } catch (error) {
    console.error('Error getting student progress:', error);
    return [];
  }
};

// Update course progress
export const updateCourseProgress = async (studentId, courseId, progressData) => {
  try {
    const progressRef = doc(db, 'courseProgress', `${studentId}_${courseId}`);
    
    const updateData = {
      ...progressData,
      lastUpdated: new Date().toISOString()
    };
    
    // Determine status based on progress
    if (progressData.progress === 100) {
      updateData.status = 'completed';
    } else if (progressData.progress > 0) {
      updateData.status = 'in_progress';
    } else {
      updateData.status = 'not_started';
    }
    
    await updateDoc(progressRef, updateData);
    return updateData;
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
};

// Initialize progress for newly assigned course
export const initializeCourseProgress = async (studentId, courseId, courseName) => {
  try {
    const progressRef = doc(db, 'courseProgress', `${studentId}_${courseId}`);
    
    const initialProgress = {
      studentId,
      courseId,
      courseName,
      progress: 0,
      status: 'not_started',
      lastUpdated: new Date().toISOString(),
      completedLessons: [],
      totalLessons: 10,
      startDate: new Date().toISOString()
    };
    
    await setDoc(progressRef, initialProgress);
    return initialProgress;
  } catch (error) {
    console.error('Error initializing course progress:', error);
    throw error;
  }
};

// Simulate lesson completion (for demo purposes)
export const completeLesson = async (studentId, courseId, lessonId) => {
  try {
    const currentProgress = await getCourseProgress(studentId, courseId);
    
    if (!currentProgress.completedLessons.includes(lessonId)) {
      const updatedCompletedLessons = [...currentProgress.completedLessons, lessonId];
      const newProgress = Math.min(100, Math.round((updatedCompletedLessons.length / currentProgress.totalLessons) * 100));
      
      await updateCourseProgress(studentId, courseId, {
        ...currentProgress,
        completedLessons: updatedCompletedLessons,
        progress: newProgress
      });
      
      return newProgress;
    }
    
    return currentProgress.progress;
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
};

// Get progress statistics for a student
export const getProgressStats = (progressData) => {
  const totalCourses = progressData.length;
  const completedCourses = progressData.filter(p => p.status === 'completed').length;
  const inProgressCourses = progressData.filter(p => p.status === 'in_progress').length;
  const notStartedCourses = progressData.filter(p => p.status === 'not_started').length;
  
  const averageProgress = totalCourses > 0 
    ? Math.round(progressData.reduce((sum, p) => sum + p.progress, 0) / totalCourses)
    : 0;
  
  return {
    totalCourses,
    completedCourses,
    inProgressCourses,
    notStartedCourses,
    averageProgress
  };
};