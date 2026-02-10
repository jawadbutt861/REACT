import { useEffect, useState } from 'react'
import {db} from '../../config/firebase/firebaseconfig'
import { collection, query,where, getCountFromServer, getDocs  } from "firebase/firestore";

const Dashboard = () => {
  const [studentcount, setStudentcount] = useState(0);
  const [coursecount, setCoursecount] = useState(0);
  const [activeEnrollments, setActiveEnrollments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCount = async () => {
      try {
        const studentQuery = query(
          collection(db, "user"),
          where("role", "==", "Student")
        );

        // Get counts for students and courses
        const [studentSnap, courseSnap] = await Promise.all([
          getCountFromServer(studentQuery),
          getCountFromServer(collection(db, "course")),
        ]);

        setStudentcount(studentSnap.data().count);
        setCoursecount(courseSnap.data().count);

        // Get actual active enrollments from assignedCourses collection
        const assignedCoursesSnapshot = await getDocs(collection(db, "assignedCourses"));
        setActiveEnrollments(assignedCoursesSnapshot.size);

      } catch (error) {
        console.error("Error fetching counts:", error);
      } finally {
        setLoading(false);
      }
    };

    getCount();
  }, []);

  const StatCard = ({ title, count, icon, color, bgColor }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border card-hover" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
            {title}
          </p>
          <h3 className="text-3xl font-bold" style={{ color: 'var(--text-heading)' }}>
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
            ) : (
              count
            )}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, onClick, color }) => (
    <button 
      onClick={onClick}
      className="w-full bg-white rounded-xl shadow-sm p-6 border card-hover text-left transition-all"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
          <svg className="w-5 h-5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--text-heading)' }}>{title}</h4>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Welcome back! Here's what's happening with your LMS today.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Students"
            count={studentcount}
            icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            color="var(--primary)"
            bgColor="var(--primary)20"
          />
          
          <StatCard
            title="Total Courses"
            count={coursecount}
            icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            color="var(--success)"
            bgColor="var(--success)20"
          />
          
          <StatCard
            title="Active Enrollments"
            count={activeEnrollments}
            icon="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            color="var(--warning)"
            bgColor="var(--warning)20"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickAction
            title="Add New Student"
            description="Register a new student to the platform"
            icon="M12 6v6m0 0v6m0-6h6m-6 0H6"
            color="var(--primary)"
            onClick={() => window.location.href = '/students/add'}
          />
          
          <QuickAction
            title="Create Course"
            description="Add a new course to your curriculum"
            icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            color="var(--success)"
            onClick={() => window.location.href = '/courses/add'}
          />
          
          <QuickAction
            title="Assign Courses"
            description="Assign courses to students"
            icon="M8 7V3a4 4 0 118 0v4m-8 0h8m-8 0H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2m-8 0V7"
            color="var(--warning)"
            onClick={() => window.location.href = '/assign-course'}
          />
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-heading)' }}>
              System Overview
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-main)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--success)' }}></div>
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                  System is running smoothly with all services operational
                </p>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-main)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></div>
                <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                  {activeEnrollments > 0 
                    ? `${activeEnrollments} active course enrollments in the system`
                    : 'Ready to start enrolling students in courses'
                  }
                </p>
              </div>
              {studentcount > 0 && coursecount > 0 && activeEnrollments === 0 && (
                <div className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--warning)10' }}>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--warning)' }}></div>
                  <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                    You have {studentcount} students and {coursecount} courses but no active enrollments. 
                    <button 
                      onClick={() => window.location.href = '/assign-course'}
                      className="ml-1 text-blue-600 hover:text-blue-800 underline"
                    >
                      Start assigning courses
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;