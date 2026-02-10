import { useState } from 'react';
import { getDeletionImpact, generateDeletionMessage } from '../utils/cascadeDelete';
import { Button, Card } from './UI';

const CascadeDeleteDemo = () => {
  const [impact, setImpact] = useState(null);
  const [loading, setLoading] = useState(false);

  const simulateStudentDeletion = async () => {
    setLoading(true);
    try {
      // Simulate getting deletion impact for a student
      const mockImpact = {
        type: 'student',
        id: 'student123',
        relatedData: {
          assignedCourses: 3,
          progressRecords: 5
        }
      };
      
      setImpact({
        ...mockImpact,
        message: generateDeletionMessage(mockImpact, 'John Doe')
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateCourseDeletion = async () => {
    setLoading(true);
    try {
      // Simulate getting deletion impact for a course
      const mockImpact = {
        type: 'course',
        id: 'course123',
        relatedData: {
          assignments: 8,
          progressRecords: 12,
          affectedStudents: 8
        }
      };
      
      setImpact({
        ...mockImpact,
        message: generateDeletionMessage(mockImpact, 'Introduction to React')
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-heading)' }}>
          Cascade Deletion Demo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>
              Student Deletion
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              When deleting a student, all related data is also removed:
            </p>
            <ul className="text-sm mb-4 space-y-1" style={{ color: 'var(--text-body)' }}>
              <li>• Course assignments</li>
              <li>• Progress records</li>
              <li>• Learning history</li>
            </ul>
            <Button 
              onClick={simulateStudentDeletion}
              loading={loading}
              size="sm"
              variant="secondary"
            >
              Simulate Student Deletion
            </Button>
          </Card>

          <Card>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>
              Course Deletion
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              When deleting a course, all related data is also removed:
            </p>
            <ul className="text-sm mb-4 space-y-1" style={{ color: 'var(--text-body)' }}>
              <li>• Student assignments</li>
              <li>• Progress records</li>
              <li>• Course materials</li>
            </ul>
            <Button 
              onClick={simulateCourseDeletion}
              loading={loading}
              size="sm"
              variant="secondary"
            >
              Simulate Course Deletion
            </Button>
          </Card>
        </div>

        {impact && (
          <Card>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text-heading)' }}>
              Deletion Impact Analysis
            </h3>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Type: {impact.type === 'student' ? 'Student' : 'Course'} Deletion
              </h4>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <h5 className="font-medium mb-2 text-gray-700">Related Data to be Deleted:</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(impact.relatedData).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize text-gray-600">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <span className="font-medium text-gray-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <h5 className="font-medium mb-2 text-red-800">Confirmation Message:</h5>
                <p className="text-sm text-red-700 whitespace-pre-line">
                  {impact.message}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={() => setImpact(null)}
              size="sm"
              variant="secondary"
            >
              Clear Results
            </Button>
          </Card>
        )}

        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-3 text-blue-800">How Cascade Deletion Works:</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <p><strong>1. Impact Analysis:</strong> Before deletion, the system analyzes all related data</p>
            <p><strong>2. User Confirmation:</strong> Shows detailed information about what will be deleted</p>
            <p><strong>3. Batch Deletion:</strong> Uses Firebase batch operations for data consistency</p>
            <p><strong>4. Error Handling:</strong> Rolls back changes if any deletion fails</p>
            <p><strong>5. User Feedback:</strong> Provides clear success/error messages</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CascadeDeleteDemo;