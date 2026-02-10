import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase/firebaseconfig';
import { Link, useNavigate, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { showSuccess, showError } from '../utils/toast';

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { role, isAuthenticated } = useSelector((state) => state.auth);

    const logout = () => {
        signOut(auth).then(() => {
            showSuccess('Logged out successfully!');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }).catch(() => {
            showError('Error occurred during logout');
        });
    }

    if (!isAuthenticated) {
        return null;
    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white shadow-sm border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
                                LMS Portal
                            </h1>
                        </div>
                    </div>
                    
                    {/* Navigation Links */}
                    <div className="flex items-center space-x-1">
                        {role === 'Admin' && (
                            <>
                                <Link 
                                    to={'/'} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/') 
                                            ? 'text-white' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        backgroundColor: isActive('/') ? 'var(--primary)' : 'transparent',
                                        color: isActive('/') ? 'white' : 'var(--text-body)'
                                    }}
                                >
                                    Dashboard
                                </Link>
                                <Link 
                                    to={'courses'} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/courses') 
                                            ? 'text-white' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        backgroundColor: isActive('/courses') ? 'var(--primary)' : 'transparent',
                                        color: isActive('/courses') ? 'white' : 'var(--text-body)'
                                    }}
                                >
                                    Courses
                                </Link>
                                <Link 
                                    to={'students'} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/students') 
                                            ? 'text-white' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        backgroundColor: isActive('/students') ? 'var(--primary)' : 'transparent',
                                        color: isActive('/students') ? 'white' : 'var(--text-body)'
                                    }}
                                >
                                    Students
                                </Link>
                                <Link 
                                    to={'assign-course'} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/assign-course') 
                                            ? 'text-white' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        backgroundColor: isActive('/assign-course') ? 'var(--primary)' : 'transparent',
                                        color: isActive('/assign-course') ? 'white' : 'var(--text-body)'
                                    }}
                                >
                                    Assign Course
                                </Link>
                            </>
                        )}
                        
                        {role === 'Student' && (
                            <>
                                <Link 
                                    to={'my-courses'} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/my-courses') 
                                            ? 'text-white' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        backgroundColor: isActive('/my-courses') ? 'var(--primary)' : 'transparent',
                                        color: isActive('/my-courses') ? 'white' : 'var(--text-body)'
                                    }}
                                >
                                    My Courses
                                </Link>
                                <Link 
                                    to={'profile'} 
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive('/profile') 
                                            ? 'text-white' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        backgroundColor: isActive('/profile') ? 'var(--primary)' : 'transparent',
                                        color: isActive('/profile') ? 'white' : 'var(--text-body)'
                                    }}
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                        
                        {/* Logout Button */}
                        <div className="ml-4 pl-4 border-l" style={{ borderColor: 'var(--border)' }}>
                            <button 
                                onClick={logout}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
                                style={{ backgroundColor: 'var(--error)' }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar