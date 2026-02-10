// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZgr9BBCYr_Me_uX6u3nuK3K05Kor9b8Y",
  authDomain: "todo-bb9bb.firebaseapp.com",
  projectId: "todo-bb9bb",
  storageBucket: "todo-bb9bb.firebasestorage.app",
  messagingSenderId: "584775344574",
  appId: "1:584775344574:web:f00ced2b3ac395344059ef",
  measurementId: "G-JE74E2PC86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);