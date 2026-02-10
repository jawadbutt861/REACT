import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addTodo, getTodos, updateTodo, deleteTodo } from '../services/todoService';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { currentUser, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      const userTodos = await getTodos(currentUser.uid);
      setTodos(userTodos);
    } catch (error) {
      setError('Failed to load todos: ' + error.message);
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadTodos();
    }
  }, [currentUser, loadTodos]);

  const handleAddTodo = async (todoData) => {
    try {
      const todoId = await addTodo(currentUser.uid, todoData);
      const newTodo = {
        id: todoId,
        ...todoData,
        userId: currentUser.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTodos([newTodo, ...todos]);
    } catch (error) {
      setError('Failed to add todo: ' + error.message);
    }
  };

  const handleUpdateTodo = async (todoId, updateData) => {
    try {
      await updateTodo(todoId, updateData);
      setTodos(todos.map(todo => 
        todo.id === todoId 
          ? { ...todo, ...updateData, updatedAt: new Date() }
          : todo
      ));
    } catch (error) {
      setError('Failed to update todo: ' + error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      setError('Failed to delete todo: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setError('Failed to log out: ' + error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading your todos...</div>;
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1 className="todo-title">My Todos</h1>
        <div className="user-info">
          <span className="user-email">Welcome, {currentUser.email}</span>
          <button 
            onClick={handleLogout}
            className="btn-logout"
          >
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}

      <div className="todo-form-section">
        <h2 className="section-title">Add New Todo</h2>
        <TodoForm onSubmit={handleAddTodo} />
      </div>

      <div className="todo-list-section">
        <h2 className="section-title">
          Your Todos <span className="todo-count">({todos.length})</span>
        </h2>
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet. Add your first todo above!</p>
          </div>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;