import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANp-RQJYafy4DVCaImi0lX1JGNITAcXGc",
  authDomain: "react-lms-965f2.firebaseapp.com",
  projectId: "react-lms-965f2",
  storageBucket: "react-lms-965f2.firebasestorage.app",
  messagingSenderId: "673552128758",
  appId: "1:673552128758:web:1f8b38486ec3b0eaefead7",
  measurementId: "G-T9Y7XDKVNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);