import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebase/firebaseconfig';
import '../index.css';

const TodoForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'todos'), {
        title: data.title,
        description: data.description,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
        completed: false
      });
      reset();
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Error adding todo');
    }
  };

  return (
    <div className="card">
      <h3>Add New Todo</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Todo Title"
            {...register('title', { 
              required: 'Title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters'
              }
            })}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        
        <div className="form-group">
          <textarea
            placeholder="Todo Description"
            {...register('description', { 
              required: 'Description is required',
              minLength: {
                value: 5,
                message: 'Description must be at least 5 characters'
              }
            })}
          />
          {errors.description && <p className="error">{errors.description.message}</p>}
        </div>
        
        <button className="btn-primary" type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoForm;