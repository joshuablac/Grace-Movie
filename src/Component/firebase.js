// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvk7wTEnnSb7Knu3KXBCSq1OiXDbRHa6o",
  authDomain: "authentication-88284.firebaseapp.com",
  projectId: "authentication-88284",
  storageBucket: "authentication-88284.firebasestorage.app",
  messagingSenderId: "909103155673",
  appId: "1:909103155673:web:182de88261f43a9e1ab1c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const google =new  GoogleAuthProvider();
export const db = getFirestore(app);