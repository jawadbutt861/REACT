import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config/firebase/firebaseconfig';
import Auth from './components/Auth';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-wrapper">
      {user ? (
        <div>
          <div className="card header">
            <h1>Todo App</h1>
            <p>Welcome, {user.email}</p>
            <button className="btn-danger" onClick={handleLogout}>Logout</button>
          </div>
          
          <TodoForm />
          <TodoList />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
