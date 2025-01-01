import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, updateDoc, onSnapshot } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyB4Q-cPW-UWIn4Q4s-SMXcrnv-UzyNfqFo",
  authDomain: "loop-f10b8.firebaseapp.com",
  projectId: "loop-f10b8",
  storageBucket: "loop-f10b8.firebasestorage.app",
  messagingSenderId: "969124391491",
  appId: "1:969124391491:web:4d1f053e530c44284b02f6",
  measurementId: "G-0YJ6YL4G8Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);

export { auth, firestore, signInWithEmailAndPassword, collection, addDoc, updateDoc, onSnapshot };
