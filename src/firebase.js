// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeoxL0C7fCFnBApaB-1uP7IJP0tZ0VDzc",
  authDomain: "ecoexplorer-6bb2a.firebaseapp.com",
  projectId: "ecoexplorer-6bb2a",
  storageBucket: "ecoexplorer-6bb2a.firebasestorage.app",
  messagingSenderId: "641683304837",
  appId: "1:641683304837:web:0563653b05019d41fc54ec",
  measurementId: "G-0P9W12EVZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;


//Quizzes