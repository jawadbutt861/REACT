import { useRef, useState } from 'react'
import {db} from '../../../config/firebase/firebaseconfig'
import { collection, addDoc } from "firebase/firestore"; 
import { Card, Button, Input } from '../../../components/UI';
import { showSuccess, showError } from '../../../utils/toast';

const AddCourse = () => {
  const name = useRef()
  const description = useRef()
  const duration = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true);

    try {
      await addDoc(collection(db, "course"), {
        name: name.current.value,
        description: description.current.value,
        duration: `${duration.current.value} Months`
      });
      
      showSuccess(`Course "${name.current.value}" added successfully!`);
      
      // Clear form after success
      name.current.value = '';
      description.current.value = '';
      duration.current.value = '';
      
    } catch (e) {
      console.error("Error adding document: ", e);
      showError("Failed to add course. Please try again.");
    } finally {
      setLoading(false);
    }
  }
 
  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            Add New Course
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Create a new course for your learning management system
          </p>
        </div>
        
        {/* Form Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Course Name <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input 
                type="text" 
                placeholder='Enter course name (e.g., Introduction to React)' 
                ref={name}
                className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors"
                style={{ 
                  borderColor: 'var(--border)',
                  color: 'var(--text-body)'
                }}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Course Description <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <textarea 
                placeholder='Describe what students will learn in this course...' 
                ref={description}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors resize-none"
                style={{ 
                  borderColor: 'var(--border)',
                  color: 'var(--text-body)'
                }}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Course Duration <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  placeholder='Enter duration'
                  ref={duration}
                  min="1"
                  max="24"
                  className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors pr-20"
                  style={{ 
                    borderColor: 'var(--border)',
                    color: 'var(--text-body)'
                  }}
                  required
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Months</span>
                </div>
              </div>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Estimated time to complete the course
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <Button 
                type="submit"
                loading={loading}
                className="flex-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Course
              </Button>
              
              <Button 
                type="button"
                variant="secondary"
                onClick={() => {
                  name.current.value = '';
                  description.current.value = '';
                  duration.current.value = '';
                }}
                disabled={loading}
                className="flex-1 sm:flex-none"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </Card>

        {/* Help Section */}
        <Card className="mt-6" padding="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary)20' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1" style={{ color: 'var(--text-heading)' }}>Course Creation Tips</h4>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li>• Use clear, descriptive course names</li>
                <li>• Include learning objectives in the description</li>
                <li>• Set realistic duration expectations</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddCourse