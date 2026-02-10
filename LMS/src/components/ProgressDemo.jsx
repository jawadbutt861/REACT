import { useState } from 'react';
import { useSelector } from 'react-redux';
import { completeLesson } from '../utils/progressTracker';
import { Button } from './UI';
import { showSuccess, showError } from '../utils/toast';

const ProgressDemo = ({ courseId, courseName }) => {
  const [updating, setUpdating] = useState(false);
  const { uid } = useSelector((state) => state.auth);

  const handleCompleteLesson = async () => {
    if (!uid || !courseId) return;
    
    setUpdating(true);
    try {
      const randomLessonId = Math.floor(Math.random() * 10) + 1;
      const newProgress = await completeLesson(uid, courseId, randomLessonId);
      showSuccess(`Lesson completed! Progress: ${newProgress}%`);
    } catch (error) {
      console.error('Error completing lesson:', error);
      showError('Failed to update progress');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg" style={{ borderColor: 'var(--border)' }}>
      <h4 className="font-medium mb-2" style={{ color: 'var(--text-heading)' }}>
        Progress Demo: {courseName}
      </h4>
      <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
        Click to simulate completing a lesson and see live progress updates
      </p>
      <Button 
        onClick={handleCompleteLesson}
        loading={updating}
        size="sm"
      >
        Complete Random Lesson
      </Button>
    </div>
  );
};

export default ProgressDemo;