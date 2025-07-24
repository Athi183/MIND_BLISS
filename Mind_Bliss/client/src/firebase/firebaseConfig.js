// client/src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// 🔐 Your actual config goes here
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
const db = getFirestore(app);
const auth = getAuth(app);


export { db ,auth};


