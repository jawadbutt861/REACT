import { useState, useEffect } from 'react'
import { db } from '../../config/firebase/firebaseconfig'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux';

const MyCourse = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    const getMyCourses = async () => {
      if (!uid) return;
      
      setLoading(true);
      try {
        const q = query(
          collection(db, "assignedCourses"), 
          where("studentId", "==", uid)
        );
        
        const querySnapshot = await getDocs(q);
        const coursesList = [];
        
        querySnapshot.forEach((doc) => {
          coursesList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setMyCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }

    getMyCourses();
  }, [uid]);

  const CourseCard = ({ course, index }) => {
    // Mock progress calculation
    const progress = Math.floor(Math.random() * 100);
    const isCompleted = progress === 100;
    const isInProgress = progress > 0 && progress < 100;
    
    return (
      <div className="bg-white rounded-xl shadow-sm border card-hover p-6" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" 
               style={{ backgroundColor: isCompleted ? 'var(--success)20' : 'var(--primary)20' }}>
            <svg className="w-6 h-6" 
                 style={{ color: isCompleted ? 'var(--success)' : 'var(--primary)' }} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isCompleted ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              )}
            </svg>
          </div>
          <div className="text-right">
            <span className="text-xs px-2 py-1 rounded-full" 
                  style={{ 
                    backgroundColor: isCompleted ? 'var(--success)20' : isInProgress ? 'var(--warning)20' : 'var(--border)',
                    color: isCompleted ? 'var(--success)' : isInProgress ? 'var(--warning)' : 'var(--text-muted)'
                  }}>
              {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>
          {course.courseName}
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Progress</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-body)' }}>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full progress-bar" 
              style={{ 
                width: `${progress}%`,
                backgroundColor: isCompleted ? 'var(--success)' : 'var(--progress)'
              }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.duration || 'N/A'}</span>
          </div>
          <button 
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--primary)',
              color: 'white'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary)'}
          >
            {isCompleted ? 'Review' : 'Continue'}
          </button>
        </div>
      </div>
    );
  };

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
      <div className="animate-pulse">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded mb-4"></div>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2"></div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            My Courses
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Track your learning progress and continue your studies
          </p>
        </div>
        
        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : myCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center" style={{ borderColor: 'var(--border)' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)20' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              No courses assigned yet
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Contact your administrator to get enrolled in courses
            </p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--primary)20' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Courses</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>{myCourses.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--success)20' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Completed</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
                      {Math.floor(myCourses.length * 0.3)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--warning)20' }}>
                    <svg className="w-5 h-5" style={{ color: 'var(--warning)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>In Progress</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
                      {Math.ceil(myCourses.length * 0.7)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MyCourse