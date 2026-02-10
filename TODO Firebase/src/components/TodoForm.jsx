import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required')
});

const TodoForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || { title: '', description: '' }
  });

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
      if (!initialData) {
        reset();
      }
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-input"
          placeholder="Enter todo title"
          {...register('title')}
        />
        {errors.title && <span className="error-message">{errors.title.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          className="form-textarea"
          placeholder="Enter todo description"
          {...register('description')}
        />
        {errors.description && <span className="error-message">{errors.description.message}</span>}
      </div>

      <div className="todo-actions">
        <button 
          type="submit" 
          disabled={loading}
          className="btn btn-primary"
          style={{ width: 'auto' }}
        >
          {loading ? 'Saving...' : (initialData ? 'Update Todo' : 'Add Todo')}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TodoForm;