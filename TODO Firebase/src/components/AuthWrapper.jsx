import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import TodoList from './TodoList';

const AuthWrapper = () => {
  const { currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  if (currentUser) {
    return <TodoList />;
  }

  return (
    <div>
      {isLogin ? (
        <LoginForm onToggleForm={toggleForm} />
      ) : (
        <SignupForm onToggleForm={toggleForm} />
      )}
    </div>
  );
};

export default AuthWrapper;