// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTNHfb1_CtidD5YKcZOVHMLyoE8-JbqTk",
  authDomain: "busybuy-ii.firebaseapp.com",
  projectId: "busybuy-ii",
  storageBucket: "busybuy-ii.appspot.com",
  messagingSenderId: "731105277637",
  appId: "1:731105277637:web:8e2b30803322f32276a2ac"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);