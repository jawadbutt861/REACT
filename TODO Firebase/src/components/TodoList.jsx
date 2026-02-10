import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db, auth } from '../config/firebase/firebaseconfig';
import '../index.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosData = [];
      querySnapshot.forEach((doc) => {
        todosData.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosData.sort((a, b) => b.createdAt - a.createdAt));
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setValue('title', todo.title);
    setValue('description', todo.description);
  };

  const handleUpdate = async (data) => {
    try {
      const todoRef = doc(db, 'todos', editingId);
      await updateDoc(todoRef, {
        title: data.title,
        description: data.description,
        updatedAt: new Date()
      });
      setEditingId(null);
      reset();
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Error updating todo');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await deleteDoc(doc(db, 'todos', id));
      } catch (error) {
        console.error('Error deleting todo:', error);
        alert('Error deleting todo');
      }
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div>
      <h3>Your Todos</h3>
      
      {editingId && (
        <div className="card edit-form">
          <h4>Edit Todo</h4>
          <form onSubmit={handleSubmit(handleUpdate)}>
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
            
            <div className="button-group">
              <button type="submit">Update Todo</button>
              <button className="btn-secondary" type="button" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div>
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add your first todo!</p>
          </div>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-card">
              <h4>{todo.title}</h4>
              <p>{todo.description}</p>
              <p>Created: {todo.createdAt?.toDate?.()?.toLocaleDateString()}</p>
              {todo.updatedAt && (
                <p>Updated: {todo.updatedAt?.toDate?.()?.toLocaleDateString()}</p>
              )}
              <div className="todo-actions">
                <button className="btn-primary" onClick={() => handleEdit(todo)}>Edit</button>
                <button className="btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;