import { AuthProvider } from './contexts/AuthContext';
import AuthWrapper from './components/AuthWrapper';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AuthWrapper />
      </div>
    </AuthProvider>
  );
}

export default App;
