// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
 
  authDomain: "agri-smart-33c5f.firebaseapp.com",
  projectId: "agri-smart-33c5f",
  storageBucket: "agri-smart-33c5f.appspot.com",
  messagingSenderId: "13631318575",
  appId: "1:13631318575:web:8934df7804dec8f70634da"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);