import { useState, useEffect } from 'react'
import { db } from '../../../config/firebase/firebaseconfig'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { getStudentProgress, getProgressStats } from '../../../utils/progressTracker';

const StudentDashboard = () => {
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: '',
    enrolledCourses: 0
  });
  const [progressStats, setProgressStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    averageProgress: 0
  });
  const [loading, setLoading] = useState(true);

  const { uid } = useSelector((state) => state.auth);

  // Student ki info aur courses fetch karo
  useEffect(() => {
    const getStudentData = async () => {
      if (!uid) return;

      setLoading(true);
      try {
        // Student ki basic info nikalo
        const studentQuery = query(
          collection(db, "user"), 
          where("uid", "==", uid)
        );
        const studentSnapshot = await getDocs(studentQuery);
        
        let studentData = {};
        studentSnapshot.forEach((doc) => {
          studentData = doc.data();
        });

        // Student ke enrolled courses count nikalo
        const coursesQuery = query(
          collection(db, "assignedCourses"), 
          where("studentId", "==", uid)
        );
        const coursesSnapshot = await getDocs(coursesQuery);
        const coursesCount = coursesSnapshot.size;

        // Progress data fetch karo
        const progressData = await getStudentProgress(uid);
        const stats = getProgressStats(progressData);

        // State update karo
        setStudentInfo({
          name: studentData.name || 'N/A',
          email: studentData.email || 'N/A',
          enrolledCourses: coursesCount
        });

        setProgressStats(stats);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    }

    getStudentData();
  }, [uid]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Dashboard</h1>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Student Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-lg font-semibold text-gray-800">{studentInfo.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{studentInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrolled Courses</p>
                    <p className="text-lg font-semibold text-gray-800">{studentInfo.enrolledCourses}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Statistics */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-6">Learning Progress</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{progressStats.totalCourses}</div>
                  <div className="text-sm text-gray-600">Total Courses</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">{progressStats.completedCourses}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{progressStats.inProgressCourses}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">{progressStats.averageProgress}%</div>
                  <div className="text-sm text-gray-600">Average Progress</div>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-900">{progressStats.averageProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-linear-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${progressStats.averageProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard