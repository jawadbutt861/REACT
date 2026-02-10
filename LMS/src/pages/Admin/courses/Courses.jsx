import { useEffect, useState } from 'react'
import {db} from '../../../config/firebase/firebaseconfig'
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from 'react-router';
import { showSuccess, showError, showWarning } from '../../../utils/toast';
import { ReadMore, ConfirmDialog } from '../../../components/UI';
import { cascadeDeleteCourse, getDeletionImpact, generateDeletionMessage } from '../../../utils/cascadeDelete';

const Courses = () => {
   const [data,setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [fetchLoading, setFetchLoading] = useState(true);
   const [deleteDialog, setDeleteDialog] = useState({
     isOpen: false,
     course: null,
     impact: null
   });
  
    useEffect(() => {
      getData();
    }, [])

    const getData = async () =>{
      setFetchLoading(true);
      try {
        const q = query(collection(db, "course"));
        const querySnapshot = await getDocs(q);
        setData(
          querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
        showError("Failed to load courses. Please refresh the page.");
      } finally {
        setFetchLoading(false);
      }
    }

    const deleteCourse = async (courseId, courseName) => {
      try {
        // Get deletion impact
        const impact = await getDeletionImpact('course', courseId);
        
        // Show confirmation dialog
        setDeleteDialog({
          isOpen: true,
          course: { id: courseId, name: courseName },
          impact
        });
      } catch (error) {
        console.error("Error getting deletion impact:", error);
        showError("Failed to analyze deletion impact. Please try again.");
      }
    };

    const handleConfirmDelete = async () => {
      const { course } = deleteDialog;
      
      try {
        // Perform cascade deletion
        await cascadeDeleteCourse(course.id);
        
        showSuccess(`Course "${course.name}" and all related data deleted successfully!`);
        getData(); // Refresh the list
      } catch (error) {
        console.error("Error deleting course:", error);
        showError("Failed to delete course. Please try again.");
        throw error; // Re-throw to let ConfirmDialog handle loading state
      }
    };

    const CourseCard = ({ course }) => (
      <div className="bg-white rounded-xl shadow-sm border card-hover p-6" style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              {course.name}
            </h3>
            <ReadMore 
              text={course.description}
              maxLength={120}
              className="text-sm"
              style={{ color: 'var(--text-muted)' }}
            />
          </div>
          <button
            onClick={() => deleteCourse(course.id, course.name)}
            disabled={loading}
            className="ml-3 p-2 rounded-lg transition-colors hover:bg-red-50 disabled:opacity-50"
            style={{ color: 'var(--error)' }}
            title="Delete Course"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-sm" style={{ color: 'var(--success)' }}>
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--success)' }}></div>
            Active
          </div>
        </div>
      </div>
    );

    const LoadingSkeleton = () => (
      <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
   
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
              All Courses
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Manage and organize your course curriculum
            </p>
          </div>
          <Link 
            to="/courses/add"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors focus-ring"
            style={{ backgroundColor: 'var(--primary)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary)'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Course
          </Link>
        </div>
        
        {/* Content */}
        {fetchLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center" style={{ borderColor: 'var(--border)' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)20' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              No courses yet
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Get started by creating your first course
            </p>
            <Link 
              to="/courses/add"
              className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, course: null, impact: null })}
          onConfirm={handleConfirmDelete}
          title="Delete Course"
          message={deleteDialog.impact && deleteDialog.course 
            ? generateDeletionMessage(deleteDialog.impact, deleteDialog.course.name)
            : "Are you sure you want to delete this course?"
          }
          confirmText="Delete Course"
          type="danger"
        />
      </div>
    </div>
  )
}

export default Courses