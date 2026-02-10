import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase/firebaseconfig';
import '../index.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      }
      reset();
    } catch (error) {
      console.error('Authentication error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="card auth-box">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>
        
        <button className="btn-primary" type="submit">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button className="btn-secondary" type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default Auth;