import { db } from '../config/firebase/firebaseconfig';
import { collection, query, where, getDocs, deleteDoc, doc, writeBatch } from 'firebase/firestore';

/**
 * Delete a student and all related data
 * @param {string} studentId - Document ID of the student
 * @param {string} studentUid - UID of the student
 * @returns {Promise<boolean>} - Success status
 */
export const cascadeDeleteStudent = async (studentId, studentUid) => {
  try {
    const batch = writeBatch(db);
    
    // 1. Delete student document
    const studentRef = doc(db, 'user', studentId);
    batch.delete(studentRef);
    
    // 2. Delete all assigned courses for this student
    const assignedCoursesQuery = query(
      collection(db, 'assignedCourses'),
      where('studentId', '==', studentUid)
    );
    const assignedCoursesSnapshot = await getDocs(assignedCoursesQuery);
    
    assignedCoursesSnapshot.forEach((courseDoc) => {
      batch.delete(doc(db, 'assignedCourses', courseDoc.id));
    });
    
    // 3. Delete all course progress for this student
    const progressQuery = query(
      collection(db, 'courseProgress'),
      where('studentId', '==', studentUid)
    );
    const progressSnapshot = await getDocs(progressQuery);
    
    progressSnapshot.forEach((progressDoc) => {
      batch.delete(doc(db, 'courseProgress', progressDoc.id));
    });
    
    // 4. Delete any other student-related data (add more collections as needed)
    // Example: student submissions, grades, etc.
    
    // Commit all deletions in a single batch
    await batch.commit();
    
    console.log(`Successfully deleted student ${studentUid} and all related data`);
    return true;
    
  } catch (error) {
    console.error('Error in cascade delete student:', error);
    throw error;
  }
};

/**
 * Delete a course and all related data
 * @param {string} courseId - Document ID of the course
 * @returns {Promise<boolean>} - Success status
 */
export const cascadeDeleteCourse = async (courseId) => {
  try {
    const batch = writeBatch(db);
    
    // 1. Delete course document
    const courseRef = doc(db, 'course', courseId);
    batch.delete(courseRef);
    
    // 2. Delete all course assignments
    const assignedCoursesQuery = query(
      collection(db, 'assignedCourses'),
      where('courseId', '==', courseId)
    );
    const assignedCoursesSnapshot = await getDocs(assignedCoursesQuery);
    
    assignedCoursesSnapshot.forEach((assignmentDoc) => {
      batch.delete(doc(db, 'assignedCourses', assignmentDoc.id));
    });
    
    // 3. Delete all progress records for this course
    const progressQuery = query(
      collection(db, 'courseProgress'),
      where('courseId', '==', courseId)
    );
    const progressSnapshot = await getDocs(progressQuery);
    
    progressSnapshot.forEach((progressDoc) => {
      batch.delete(doc(db, 'courseProgress', progressDoc.id));
    });
    
    // 4. Delete any other course-related data (add more collections as needed)
    // Example: course materials, assignments, quizzes, etc.
    
    // Commit all deletions in a single batch
    await batch.commit();
    
    console.log(`Successfully deleted course ${courseId} and all related data`);
    return true;
    
  } catch (error) {
    console.error('Error in cascade delete course:', error);
    throw error;
  }
};

/**
 * Get deletion impact summary before deleting
 * @param {string} type - 'student' or 'course'
 * @param {string} id - ID of the item to delete
 * @param {string} uid - UID (for students only)
 * @returns {Promise<Object>} - Summary of what will be deleted
 */
export const getDeletionImpact = async (type, id, uid = null) => {
  try {
    const impact = {
      type,
      id,
      relatedData: {}
    };
    
    if (type === 'student' && uid) {
      // Count assigned courses
      const assignedCoursesQuery = query(
        collection(db, 'assignedCourses'),
        where('studentId', '==', uid)
      );
      const assignedCoursesSnapshot = await getDocs(assignedCoursesQuery);
      impact.relatedData.assignedCourses = assignedCoursesSnapshot.size;
      
      // Count progress records
      const progressQuery = query(
        collection(db, 'courseProgress'),
        where('studentId', '==', uid)
      );
      const progressSnapshot = await getDocs(progressQuery);
      impact.relatedData.progressRecords = progressSnapshot.size;
      
    } else if (type === 'course') {
      // Count course assignments
      const assignedCoursesQuery = query(
        collection(db, 'assignedCourses'),
        where('courseId', '==', id)
      );
      const assignedCoursesSnapshot = await getDocs(assignedCoursesQuery);
      impact.relatedData.assignments = assignedCoursesSnapshot.size;
      
      // Count progress records
      const progressQuery = query(
        collection(db, 'courseProgress'),
        where('courseId', '==', id)
      );
      const progressSnapshot = await getDocs(progressQuery);
      impact.relatedData.progressRecords = progressSnapshot.size;
      
      // Get affected students
      const affectedStudents = new Set();
      assignedCoursesSnapshot.forEach(doc => {
        affectedStudents.add(doc.data().studentId);
      });
      impact.relatedData.affectedStudents = affectedStudents.size;
    }
    
    return impact;
    
  } catch (error) {
    console.error('Error getting deletion impact:', error);
    return { type, id, relatedData: {}, error: error.message };
  }
};

/**
 * Generate a user-friendly deletion confirmation message
 * @param {Object} impact - Impact summary from getDeletionImpact
 * @param {string} name - Name of the item being deleted
 * @returns {string} - Confirmation message
 */
export const generateDeletionMessage = (impact, name) => {
  if (impact.type === 'student') {
    const { assignedCourses = 0, progressRecords = 0 } = impact.relatedData;
    
    let message = `Are you sure you want to delete student "${name}"?`;
    
    if (assignedCourses > 0 || progressRecords > 0) {
      message += '\n\nThis will also delete:';
      if (assignedCourses > 0) {
        message += `\n• ${assignedCourses} course assignment${assignedCourses > 1 ? 's' : ''}`;
      }
      if (progressRecords > 0) {
        message += `\n• ${progressRecords} progress record${progressRecords > 1 ? 's' : ''}`;
      }
      message += '\n\nThis action cannot be undone.';
    }
    
    return message;
    
  } else if (impact.type === 'course') {
    const { assignments = 0, progressRecords = 0, affectedStudents = 0 } = impact.relatedData;
    
    let message = `Are you sure you want to delete course "${name}"?`;
    
    if (assignments > 0 || progressRecords > 0) {
      message += '\n\nThis will also delete:';
      if (assignments > 0) {
        message += `\n• ${assignments} student assignment${assignments > 1 ? 's' : ''}`;
      }
      if (progressRecords > 0) {
        message += `\n• ${progressRecords} progress record${progressRecords > 1 ? 's' : ''}`;
      }
      if (affectedStudents > 0) {
        message += `\n\nThis will affect ${affectedStudents} student${affectedStudents > 1 ? 's' : ''}.`;
      }
      message += '\n\nThis action cannot be undone.';
    }
    
    return message;
  }
  
  return `Are you sure you want to delete "${name}"?`;
};