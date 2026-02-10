import { useState } from 'react';
import TodoForm from './TodoForm';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (data) => {
    await onUpdate(todo.id, data);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item">
        <TodoForm
          onSubmit={handleUpdate}
          initialData={{ title: todo.title, description: todo.description }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="todo-item">
      <h3 className="todo-item-title">{todo.title}</h3>
      <p className="todo-item-description">{todo.description}</p>
      
      <div className="todo-actions">
        <button 
          onClick={() => setIsEditing(true)}
          className="btn btn-secondary"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
      
      <div className="todo-meta">
        Created: {todo.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
      </div>
    </div>
  );
};

export default TodoItem;