import { useState, useEffect, useRef } from 'react'
import { db } from '../../config/firebase/firebaseconfig'
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { Card, Button, ReadMore } from '../../components/UI';
import { showSuccess, showError, showWarning } from '../../utils/toast';
import { initializeCourseProgress } from '../../utils/progressTracker';

const AssignCourse = () => {
  // States
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [assignedCourses, setAssignedCourses] = useState([]);
  
  // Search states
  const [studentSearch, setStudentSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showCourseDropdown, setShowCourseDropdown] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  
  // Refs for dropdown management
  const studentDropdownRef = useRef(null);
  const courseDropdownRef = useRef(null);

  // Fetch students from Firestore
  const getStudents = async () => {
    try {
      const q = query(collection(db, "user"), where("role", "==", "Student"));
      const querySnapshot = await getDocs(q);
      const studentsList = [];
      
      querySnapshot.forEach((doc) => {
        studentsList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setStudents(studentsList);
    } catch (error) {
      console.error("Error fetching students:", error);
      showError("Failed to load students");
    }
  }

  // Fetch courses from Firestore
  const getCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "course"));
      const coursesList = [];
      
      querySnapshot.forEach((doc) => {
        coursesList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setCourses(coursesList);
    } catch (error) {
      console.error("Error fetching courses:", error);
      showError("Failed to load courses");
    }
  }

  // Fetch assigned courses to show recent assignments
  const getAssignedCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "assignedCourses"));
      const assignedList = [];
      
      querySnapshot.forEach((doc) => {
        assignedList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      // Sort by assigned date (most recent first)
      assignedList.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
      setAssignedCourses(assignedList.slice(0, 5)); // Show only last 5
    } catch (error) {
      console.error("Error fetching assigned courses:", error);
    }
  }

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setFetchLoading(true);
      await Promise.all([getStudents(), getCourses(), getAssignedCourses()]);
      setFetchLoading(false);
    };
    
    loadData();
  }, []);

  // Filter students based on search
  useEffect(() => {
    if (studentSearch.trim() === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        student.email.toLowerCase().includes(studentSearch.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [students, studentSearch]);

  // Filter courses based on search
  useEffect(() => {
    if (courseSearch.trim() === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => 
        course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.duration.toLowerCase().includes(courseSearch.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [courses, courseSearch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (studentDropdownRef.current && !studentDropdownRef.current.contains(event.target)) {
        setShowStudentDropdown(false);
      }
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(event.target)) {
        setShowCourseDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle student selection
  const handleStudentSelect = (student) => {
    setSelectedStudent(student.id);
    setStudentSearch(`${student.name} (${student.email})`);
    setShowStudentDropdown(false);
  };

  // Handle course selection
  const handleCourseSelect = (course) => {
    setSelectedCourse(course.id);
    setCourseSearch(`${course.name} (${course.duration})`);
    setShowCourseDropdown(false);
  };

  // Clear student selection
  const clearStudentSelection = () => {
    setSelectedStudent('');
    setStudentSearch('');
    setShowStudentDropdown(false);
  };

  // Clear course selection
  const clearCourseSelection = () => {
    setSelectedCourse('');
    setCourseSearch('');
    setShowCourseDropdown(false);
  };
  const checkDuplicateAssignment = async (studentUid, courseId) => {
    const q = query(
      collection(db, "assignedCourses"),
      where("studentId", "==", studentUid),
      where("courseId", "==", courseId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Assign course to student
  const handleAssignCourse = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedStudent || !selectedCourse) {
      showWarning("Please select both student and course");
      return;
    }

    setLoading(true);

    // Get student and course details
    const student = students.find(s => s.id === selectedStudent);
    const course = courses.find(c => c.id === selectedCourse);

    try {
      // Check for duplicate assignment
      const isDuplicate = await checkDuplicateAssignment(student.uid, selectedCourse);
      
      if (isDuplicate) {
        showWarning(`${course.name} is already assigned to ${student.name}`);
        setLoading(false);
        return;
      }

      // Save to Firestore
      await addDoc(collection(db, "assignedCourses"), {
        studentId: student.uid,
        studentName: student.name,
        studentEmail: student.email,
        courseId: selectedCourse,
        courseName: course.name,
        duration: course.duration,
        assignedDate: new Date().toISOString()
      });

      // Initialize course progress
      await initializeCourseProgress(student.uid, selectedCourse, course.name);

      showSuccess(`${course.name} assigned to ${student.name} successfully!`);
      
      // Reset form
      setSelectedStudent('');
      setSelectedCourse('');
      setStudentSearch('');
      setCourseSearch('');
      
      // Refresh assigned courses list
      getAssignedCourses();
      
    } catch (error) {
      console.error("Error assigning course:", error);
      showError("Failed to assign course. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const selectedStudentData = students.find(s => s.id === selectedStudent);
  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            Assign Course to Student
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Enroll students in courses to start their learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignment Form */}
          <div className="lg:col-span-2">
            <Card>
              {fetchLoading ? (
                <div className="animate-pulse space-y-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <form onSubmit={handleAssignCourse} className="space-y-6">
                  {/* Student Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                      Select Student <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <div className="relative" ref={studentDropdownRef}>
                      <div className="relative">
                        <input
                          type="text"
                          value={studentSearch}
                          onChange={(e) => {
                            setStudentSearch(e.target.value);
                            setShowStudentDropdown(true);
                            if (e.target.value === '') {
                              setSelectedStudent('');
                            }
                          }}
                          onFocus={() => setShowStudentDropdown(true)}
                          placeholder="Search students by name or email..."
                          className="w-full px-4 py-3 pr-10 rounded-lg border focus-ring transition-colors"
                          style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-body)'
                          }}
                          disabled={loading}
                        />
                        {selectedStudent && (
                          <button
                            type="button"
                            onClick={clearStudentSelection}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                        {!selectedStudent && (
                          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        )}
                      </div>
                      
                      {showStudentDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
                          {filteredStudents.length === 0 ? (
                            <div className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                              {studentSearch ? 'No students found' : 'No students available'}
                            </div>
                          ) : (
                            filteredStudents.map(student => (
                              <button
                                key={student.id}
                                type="button"
                                onClick={() => handleStudentSelect(student)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                                style={{ 
                                  backgroundColor: selectedStudent === student.id ? 'var(--primary)10' : 'transparent'
                                }}
                              >
                                <div className="font-medium" style={{ color: 'var(--text-heading)' }}>
                                  {student.name}
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                  {student.email}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    {students.length === 0 && (
                      <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
                        No students available. Please add students first.
                      </p>
                    )}
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                      Select Course <span style={{ color: 'var(--error)' }}>*</span>
                    </label>
                    <div className="relative" ref={courseDropdownRef}>
                      <div className="relative">
                        <input
                          type="text"
                          value={courseSearch}
                          onChange={(e) => {
                            setCourseSearch(e.target.value);
                            setShowCourseDropdown(true);
                            if (e.target.value === '') {
                              setSelectedCourse('');
                            }
                          }}
                          onFocus={() => setShowCourseDropdown(true)}
                          placeholder="Search courses by name or duration..."
                          className="w-full px-4 py-3 pr-10 rounded-lg border focus-ring transition-colors"
                          style={{ 
                            borderColor: 'var(--border)',
                            color: 'var(--text-body)'
                          }}
                          disabled={loading}
                        />
                        {selectedCourse && (
                          <button
                            type="button"
                            onClick={clearCourseSelection}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                        {!selectedCourse && (
                          <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        )}
                      </div>
                      
                      {showCourseDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto" style={{ borderColor: 'var(--border)' }}>
                          {filteredCourses.length === 0 ? (
                            <div className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                              {courseSearch ? 'No courses found' : 'No courses available'}
                            </div>
                          ) : (
                            filteredCourses.map(course => (
                              <button
                                key={course.id}
                                type="button"
                                onClick={() => handleCourseSelect(course)}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                                style={{ 
                                  backgroundColor: selectedCourse === course.id ? 'var(--primary)10' : 'transparent'
                                }}
                              >
                                <div className="font-medium" style={{ color: 'var(--text-heading)' }}>
                                  {course.name}
                                </div>
                                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                  Duration: {course.duration}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    {courses.length === 0 && (
                      <p className="mt-1 text-sm" style={{ color: 'var(--error)' }}>
                        No courses available. Please add courses first.
                      </p>
                    )}
                  </div>

                  {/* Preview Section */}
                  {selectedStudentData && selectedCourseData && (
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--primary)10' }}>
                      <h4 className="font-medium mb-2" style={{ color: 'var(--text-heading)' }}>
                        Assignment Preview
                      </h4>
                      <div className="text-sm space-y-1" style={{ color: 'var(--text-body)' }}>
                        <p><strong>Student:</strong> {selectedStudentData.name}</p>
                        <p><strong>Email:</strong> {selectedStudentData.email}</p>
                        <p><strong>Course:</strong> {selectedCourseData.name}</p>
                        <p><strong>Duration:</strong> {selectedCourseData.duration}</p>
                        {selectedCourseData.description && (
                          <div>
                            <strong>Description:</strong>
                            <div className="mt-1">
                              <ReadMore 
                                text={selectedCourseData.description}
                                maxLength={150}
                                className="text-sm"
                                style={{ color: 'var(--text-muted)' }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                    <Button 
                      type="submit"
                      loading={loading}
                      disabled={students.length === 0 || courses.length === 0}
                      className="flex-1"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Assign Course
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setSelectedStudent('');
                        setSelectedCourse('');
                        setStudentSearch('');
                        setCourseSearch('');
                      }}
                      disabled={loading}
                      className="flex-1 sm:flex-none"
                    >
                      Clear Selection
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

          {/* Recent Assignments Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                Recent Assignments
              </h3>
              
              {fetchLoading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : assignedCourses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)20' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    No assignments yet
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignedCourses.map((assignment) => (
                    <div key={assignment.id} className="p-3 rounded-lg border" style={{ borderColor: 'var(--border)' }}>
                      <h4 className="font-medium text-sm" style={{ color: 'var(--text-heading)' }}>
                        {assignment.courseName}
                      </h4>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {assignment.studentName}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {new Date(assignment.assignedDate).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Students</span>
                  <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>{students.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Courses</span>
                  <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>{courses.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Assignments</span>
                  <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>{assignedCourses.length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignCourse
