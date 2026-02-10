import { useEffect, useState } from 'react'
import { db } from '../../config/firebase/firebaseconfig'
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { Card, Badge, ReadMore } from '../../components/UI';
import { getStudentProgress, getCourseProgress } from '../../utils/progressTracker';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [coursesWithProgress, setCoursesWithProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (uid) {
          // Get user data
          const userQuery = query(
            collection(db, "user"),
            where("uid", "==", uid)
          );
          const userSnapshot = await getDocs(userQuery);
          
          if (!userSnapshot.empty) {
            const user = userSnapshot.docs[0].data();
            setUserData(user);

            // Get enrolled courses with full details
            const coursesQuery = query(
              collection(db, "assignedCourses"),
              where("studentId", "==", uid)
            );
            const coursesSnapshot = await getDocs(coursesQuery);
            const courses = [];
            
            coursesSnapshot.forEach((doc) => {
              courses.push({
                id: doc.id,
                ...doc.data()
              });
            });
            
            setEnrolledCourses(courses);

            // Get full course details including descriptions
            const coursesWithProgressData = await Promise.all(
              courses.map(async (course) => {
                // Get progress data
                const progressData = await getCourseProgress(uid, course.courseId);
                
                // Get full course details using document ID
                try {
                  const courseDoc = await getDocs(query(collection(db, "course")));
                  let courseDetails = {};
                  
                  courseDoc.forEach((doc) => {
                    if (doc.id === course.courseId) {
                      courseDetails = doc.data();
                    }
                  });
                  
                  return {
                    ...course,
                    description: courseDetails.description || 'No description available',
                    progress: progressData.progress,
                    status: progressData.status,
                    completedLessons: progressData.completedLessons?.length || 0,
                    totalLessons: progressData.totalLessons || 10
                  };
                } catch (error) {
                  console.error('Error fetching course details:', error);
                  return {
                    ...course,
                    description: 'No description available',
                    progress: progressData.progress,
                    status: progressData.status,
                    completedLessons: progressData.completedLessons?.length || 0,
                    totalLessons: progressData.totalLessons || 10
                  };
                }
              })
            );

            setCoursesWithProgress(coursesWithProgressData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [uid]);

  const LoadingSkeleton = () => (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 border">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            Student Profile
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage your account information and view your learning progress
          </p>
        </div>

        {userData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="text-center">
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                     style={{ backgroundColor: 'var(--primary)' }}>
                  {getInitials(userData.name)}
                </div>

                {/* Basic Info */}
                <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-heading)' }}>
                  {userData.name || 'Student'}
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  {userData.email}
                </p>

                {/* Role Badge */}
                <Badge variant="success" className="mb-6">
                  {userData.role}
                </Badge>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
                      {enrolledCourses.length}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Enrolled Courses
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                      {coursesWithProgress.filter(c => c.status === 'in_progress').length}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      In Progress
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Details and Courses */}
            <div className="lg:col-span-2 space-y-8">
              {/* Account Details */}
              <Card>
                <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-heading)' }}>
                  Account Details
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                        Full Name
                      </label>
                      <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-main)' }}>
                        <p style={{ color: 'var(--text-body)' }}>{userData.name || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                        Email Address
                      </label>
                      <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-main)' }}>
                        <p style={{ color: 'var(--text-body)' }}>{userData.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                        Account Type
                      </label>
                      <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-main)' }}>
                        <Badge variant="success">{userData.role}</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                        Student ID
                      </label>
                      <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-main)' }}>
                        <p className="text-sm font-mono" style={{ color: 'var(--text-body)' }}>
                          {userData.uid?.slice(-8).toUpperCase() || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Enrolled Courses */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>
                    Enrolled Courses
                  </h3>
                  <Badge variant="primary">
                    {enrolledCourses.length} Course{enrolledCourses.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {enrolledCourses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)20' }}>
                      <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                      No courses enrolled yet
                    </h4>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Contact your administrator to get enrolled in courses
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coursesWithProgress.map((course, index) => {
                      const isCompleted = course.status === 'completed';
                      const isInProgress = course.status === 'in_progress';
                      
                      return (
                        <div key={course.id} className="p-4 rounded-lg border card-hover" style={{ borderColor: 'var(--border)' }}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1" style={{ color: 'var(--text-heading)' }}>
                                {course.courseName}
                              </h4>
                              <ReadMore 
                                text={course.description}
                                maxLength={100}
                                className="text-sm mb-2"
                                style={{ color: 'var(--text-muted)' }}
                              />
                              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                                Duration: {course.duration}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Enrolled: {formatDate(course.assignedDate)}
                              </p>
                            </div>
                            <Badge 
                              variant={isCompleted ? 'success' : isInProgress ? 'warning' : 'secondary'}
                            >
                              {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Not Started'}
                            </Badge>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="mt-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                Progress ({course.completedLessons}/{course.totalLessons} lessons)
                              </span>
                              <span className="text-xs font-medium" style={{ color: 'var(--text-body)' }}>
                                {course.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full progress-bar" 
                                style={{ 
                                  width: `${course.progress}%`,
                                  backgroundColor: isCompleted ? 'var(--success)' : 'var(--progress)'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--error)20' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              Profile not found
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Unable to load your profile information. Please try refreshing the page.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Profile;