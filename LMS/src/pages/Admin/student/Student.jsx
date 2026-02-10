import { useState, useEffect } from 'react'
import {db} from '../../../config/firebase/firebaseconfig'
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from 'react-router';
import { showSuccess, showError } from '../../../utils/toast';
import { cascadeDeleteStudent, getDeletionImpact, generateDeletionMessage } from '../../../utils/cascadeDelete';
import { ConfirmDialog } from '../../../components/UI';

const Student = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    student: null,
    impact: null
  });

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setFetchLoading(true);
    try {
      const q = query(collection(db, "user"), where("role", "==", "Student"));
      const querySnapshot = await getDocs(q);
      setData(
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    } catch (error) {
      console.error("Error fetching students:", error);
      showError("Failed to load students. Please refresh the page.");
    } finally {
      setFetchLoading(false);
    }
  }

  const deleteStudent = async (studentId, studentName) => {
    const student = data.find(s => s.id === studentId);
    if (!student) {
      showError("Student not found");
      return;
    }

    try {
      // Get deletion impact
      const impact = await getDeletionImpact('student', studentId, student.uid);
      
      // Show confirmation dialog
      setDeleteDialog({
        isOpen: true,
        student: { id: studentId, name: studentName, uid: student.uid },
        impact
      });
    } catch (error) {
      console.error("Error getting deletion impact:", error);
      showError("Failed to analyze deletion impact. Please try again.");
    }
  };

  const handleConfirmDelete = async () => {
    const { student } = deleteDialog;
    
    try {
      // Perform cascade deletion
      await cascadeDeleteStudent(student.id, student.uid);
      
      showSuccess(`Student "${student.name}" and all related data deleted successfully!`);
      getData(); // Refresh the list
    } catch (error) {
      console.error("Error deleting student:", error);
      showError("Failed to delete student. Please try again.");
      throw error; // Re-throw to let ConfirmDialog handle loading state
    }
  };

  const StudentCard = ({ student }) => (
    <div className="bg-white rounded-xl shadow-sm border p-6 card-hover" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)20' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>
              {student.name}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {student.email}
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                    style={{ backgroundColor: 'var(--success)20', color: 'var(--success)' }}>
                {student.role}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => deleteStudent(student.id, student.name)}
          disabled={loading}
          className="p-2 rounded-lg transition-colors hover:bg-red-50 disabled:opacity-50"
          style={{ color: 'var(--error)' }}
          title="Delete Student"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: 'var(--border)' }}>
      <div className="animate-pulse flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
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
              Students List
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Manage student accounts and enrollments
            </p>
          </div>
          <Link 
            to="/students/add"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors focus-ring"
            style={{ backgroundColor: 'var(--primary)' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-hover)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--primary)'}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Student
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
              No students yet
            </h3>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
              Get started by adding your first student
            </p>
            <Link 
              to="/students/add"
              className="inline-flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Student
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-8" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: 'var(--primary)20' }}>
                  <svg className="w-5 h-5" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Total Students</p>
                  <p className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>{data.length}</p>
                </div>
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((student) => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, student: null, impact: null })}
          onConfirm={handleConfirmDelete}
          title="Delete Student"
          message={deleteDialog.impact && deleteDialog.student 
            ? generateDeletionMessage(deleteDialog.impact, deleteDialog.student.name)
            : "Are you sure you want to delete this student?"
          }
          confirmText="Delete Student"
          type="danger"
        />
      </div>
    </div>
  )
}

export default Student