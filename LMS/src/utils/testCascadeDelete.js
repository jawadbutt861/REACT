// Test utilities for cascade deletion functionality
// This file can be used to test the cascade deletion system

import { getDeletionImpact, generateDeletionMessage } from './cascadeDelete';

/**
 * Test the deletion impact analysis
 */
export const testDeletionImpact = async () => {
  console.log('🧪 Testing Cascade Deletion System...\n');
  
  // Test student deletion impact
  console.log('📚 Testing Student Deletion Impact:');
  try {
    const studentImpact = {
      type: 'student',
      id: 'test-student-123',
      relatedData: {
        assignedCourses: 3,
        progressRecords: 7
      }
    };
    
    const studentMessage = generateDeletionMessage(studentImpact, 'John Doe');
    console.log('✅ Student deletion message generated successfully');
    console.log('📝 Message:', studentMessage);
    console.log('');
    
  } catch (error) {
    console.error('❌ Student deletion test failed:', error);
  }
  
  // Test course deletion impact
  console.log('📖 Testing Course Deletion Impact:');
  try {
    const courseImpact = {
      type: 'course',
      id: 'test-course-123',
      relatedData: {
        assignments: 12,
        progressRecords: 25,
        affectedStudents: 12
      }
    };
    
    const courseMessage = generateDeletionMessage(courseImpact, 'Introduction to React');
    console.log('✅ Course deletion message generated successfully');
    console.log('📝 Message:', courseMessage);
    console.log('');
    
  } catch (error) {
    console.error('❌ Course deletion test failed:', error);
  }
  
  console.log('🎉 Cascade deletion tests completed!');
};

/**
 * Mock data for testing
 */
export const mockData = {
  students: [
    {
      id: 'student1',
      uid: 'uid1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Student'
    },
    {
      id: 'student2',
      uid: 'uid2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Student'
    }
  ],
  courses: [
    {
      id: 'course1',
      name: 'Introduction to React',
      description: 'Learn the fundamentals of React development',
      duration: '3 Months'
    },
    {
      id: 'course2',
      name: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts',
      duration: '4 Months'
    }
  ],
  assignments: [
    {
      id: 'assignment1',
      studentId: 'uid1',
      courseId: 'course1',
      studentName: 'John Doe',
      courseName: 'Introduction to React'
    },
    {
      id: 'assignment2',
      studentId: 'uid2',
      courseId: 'course1',
      studentName: 'Jane Smith',
      courseName: 'Introduction to React'
    }
  ],
  progress: [
    {
      id: 'uid1_course1',
      studentId: 'uid1',
      courseId: 'course1',
      progress: 45,
      status: 'in_progress'
    },
    {
      id: 'uid2_course1',
      studentId: 'uid2',
      courseId: 'course1',
      progress: 78,
      status: 'in_progress'
    }
  ]
};

/**
 * Simulate deletion impact analysis
 */
export const simulateDeletionImpact = (type, id) => {
  if (type === 'student') {
    const student = mockData.students.find(s => s.id === id);
    if (!student) return null;
    
    const assignments = mockData.assignments.filter(a => a.studentId === student.uid);
    const progress = mockData.progress.filter(p => p.studentId === student.uid);
    
    return {
      type: 'student',
      id,
      relatedData: {
        assignedCourses: assignments.length,
        progressRecords: progress.length
      }
    };
  } else if (type === 'course') {
    const course = mockData.courses.find(c => c.id === id);
    if (!course) return null;
    
    const assignments = mockData.assignments.filter(a => a.courseId === id);
    const progress = mockData.progress.filter(p => p.courseId === id);
    const affectedStudents = new Set(assignments.map(a => a.studentId)).size;
    
    return {
      type: 'course',
      id,
      relatedData: {
        assignments: assignments.length,
        progressRecords: progress.length,
        affectedStudents
      }
    };
  }
  
  return null;
};

// Run tests if this file is executed directly
if (typeof window !== 'undefined' && window.location?.search?.includes('test=cascade')) {
  testDeletionImpact();
}