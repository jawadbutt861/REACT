# Todo App with Firebase Authentication

A React todo application with Firebase authentication, allowing users to sign up, log in, and manage their personal todos.

## Features

- **Authentication**: Sign up and login with email/password using Firebase Auth
- **User-specific todos**: Each user sees only their own todos
- **CRUD operations**: Add, edit, delete todos
- **Form validation**: Using React Hook Form with Yup validation
- **Real-time auth state**: Automatic login/logout state management

## Setup Instructions

### 1. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication with Email/Password provider
4. Create a Firestore database
5. Get your Firebase config from Project Settings
6. Update `src/config/firebase/firebaseconfig.js` with your config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 2. Firestore Security Rules

Add these rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 3. Run the Application

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── AuthWrapper.jsx      # Main auth wrapper component
│   ├── LoginForm.jsx        # Login form with validation
│   ├── SignupForm.jsx       # Signup form with validation
│   ├── TodoForm.jsx         # Add/Edit todo form
│   ├── TodoItem.jsx         # Individual todo item
│   └── TodoList.jsx         # Todo list and management
├── contexts/
│   └── AuthContext.jsx      # Authentication context
├── services/
│   ├── authService.js       # Authentication service functions
│   └── todoService.js       # Todo CRUD operations
├── config/
│   └── firebase/
│       └── firebaseconfig.js # Firebase configuration
└── App.jsx                  # Main app component
```

## Technologies Used

- React 19
- Firebase (Auth + Firestore)
- React Hook Form
- Yup (validation)
- Vite (build tool)

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Add Todos**: Use the form to add new todos with title and description
4. **Edit Todos**: Click "Edit" button to modify existing todos
5. **Delete Todos**: Click "Delete" button to remove todos
6. **Logout**: Click logout to sign out

Each user's todos are private and only visible to them when authenticated.