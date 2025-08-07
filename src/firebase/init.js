// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8R74mV3hFCADqnWa5vo35arbFlxGI2Q0",
  authDomain: "lab7-b1e07.firebaseapp.com",
  projectId: "lab7-b1e07",
  storageBucket: "lab7-b1e07.firebasestorage.app",
  messagingSenderId: "1090448845029",
  appId: "1:1090448845029:web:5509fa91008ae14f654c0c"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db; 