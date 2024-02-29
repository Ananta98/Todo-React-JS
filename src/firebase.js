// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBazXfLqGvAMDZpEBO0ahTYOq0Gi9cDrE0",
  authDomain: "todo-app-a1fab.firebaseapp.com",
  projectId: "todo-app-a1fab",
  storageBucket: "todo-app-a1fab.appspot.com",
  messagingSenderId: "612493578459",
  appId: "1:612493578459:web:d70b6f5befc6736990bcfe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);