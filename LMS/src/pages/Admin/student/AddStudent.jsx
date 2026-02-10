import { useRef, useState } from 'react'
import {db} from '../../../config/firebase/firebaseconfig'
import { collection, addDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Card, Button } from '../../../components/UI';
import { showSuccess, showError } from '../../../utils/toast';

// Secondary Firebase app for creating users without affecting current session
const secondaryApp = initializeApp({
  apiKey: "AIzaSyANp-RQJYafy4DVCaImi0lX1JGNITAcXGc",
  authDomain: "react-lms-965f2.firebaseapp.com",
  projectId: "react-lms-965f2",
  storageBucket: "react-lms-965f2.firebasestorage.app",
  messagingSenderId: "673552128758",
  appId: "1:673552128758:web:1f8b38486ec3b0eaefead7",
  measurementId: "G-T9Y7XDKVNR"
}, "secondary");

const secondaryAuth = getAuth(secondaryApp);

const AddStudent = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
   event.preventDefault();
   setLoading(true);

   try {
     // Use secondary auth to create user without affecting current session
     const userCredential = await createUserWithEmailAndPassword(
       secondaryAuth, 
       email.current.value, 
       password.current.value
     );
     const user = userCredential.user;
     
     // Save student data
     await sendData(user.uid);
     
     // Sign out from secondary auth
     await secondaryAuth.signOut();
     
   } catch (error) {
     console.error("Error creating student:", error);
     
     // Handle specific Firebase auth errors
     let errorMessage = "Failed to create student account";
     
     switch (error.code) {
       case 'auth/email-already-in-use':
         errorMessage = "This email address is already registered";
         break;
       case 'auth/invalid-email':
         errorMessage = "Please enter a valid email address";
         break;
       case 'auth/weak-password':
         errorMessage = "Password should be at least 6 characters";
         break;
       case 'auth/network-request-failed':
         errorMessage = "Network error. Please check your connection";
         break;
       default:
         errorMessage = error.message || "Failed to create student account";
     }
     
     showError(errorMessage);
   } finally {
     setLoading(false);
   }
  }
  
  const sendData = async(id) => {
    try {
      await addDoc(collection(db, "user"), {
        name: name.current.value,
        email: email.current.value,
        uid: id,
        role: "Student"
      });
      
      showSuccess(`Student "${name.current.value}" added successfully!`);
      
      // Clear form after success
      name.current.value = '';
      email.current.value = '';
      password.current.value = '';
      
    } catch (e) {
      console.error("Error adding document: ", e);
      showError("Failed to save student data. Please try again.");
      throw e;
    }
  }

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: 'var(--bg-main)' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            Add New Student
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Create a new student account for the learning management system
          </p>
        </div>
        
        {/* Form Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Student Name <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input 
                type="text" 
                placeholder='Enter student full name' 
                ref={name}
                className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors"
                style={{ 
                  borderColor: 'var(--border)',
                  color: 'var(--text-body)'
                }}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Email Address <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input 
                type="email" 
                placeholder='Enter student email address' 
                ref={email}
                className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors"
                style={{ 
                  borderColor: 'var(--border)',
                  color: 'var(--text-body)'
                }}
                required
                disabled={loading}
              />
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                This will be used for login credentials
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-body)' }}>
                Password <span style={{ color: 'var(--error)' }}>*</span>
              </label>
              <input 
                type="password" 
                placeholder='Enter secure password (min 6 characters)' 
                ref={password}
                minLength="6"
                className="w-full px-4 py-3 rounded-lg border focus-ring transition-colors"
                style={{ 
                  borderColor: 'var(--border)',
                  color: 'var(--text-body)'
                }}
                required
                disabled={loading}
              />
              <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Minimum 6 characters required
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
              <Button 
                type="submit"
                loading={loading}
                className="flex-1"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Add Student
              </Button>
              
              <Button 
                type="button"
                variant="secondary"
                onClick={() => {
                  name.current.value = '';
                  email.current.value = '';
                  password.current.value = '';
                }}
                disabled={loading}
                className="flex-1 sm:flex-none"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </Card>

        {/* Help Section */}
        <Card className="mt-6" padding="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--primary)20' }}>
              <svg className="w-4 h-4" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium mb-1" style={{ color: 'var(--text-heading)' }}>Student Account Tips</h4>
              <ul className="text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li>• Use the student's real email address</li>
                <li>• Choose a secure password (they can change it later)</li>
                <li>• Double-check spelling of names and emails</li>
                <li>• Students will receive login credentials via email</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AddStudent