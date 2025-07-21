// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWoaAAWMFLimXBJln05Pxjl0sulJyVc34",
  authDomain: "mindbliss-88494.firebaseapp.com",
  projectId: "mindbliss-88494",
  storageBucket: "mindbliss-88494.firebasestorage.app",
  messagingSenderId: "79830786558",
  appId: "1:79830786558:web:b813915454498975cea0af",
  measurementId: "G-17CDGEJTDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);