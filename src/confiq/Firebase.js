import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updatePassword,

} from "firebase/auth";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    query,
    where,
    onSnapshot,
    updateDoc,
    getDoc,
    getDocs,
    deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRh4-MBV5jQCdy8fYesmGDOQnpLZz3Mro",
    authDomain: "khana-app-d826d.firebaseapp.com",
    projectId: "khana-app-d826d",
    storageBucket: "khana-app-d826d.appspot.com",
    messagingSenderId: "1071861968317",
    appId: "1:1071861968317:web:e6726ee1a829428b18f6d4",
    measurementId: "G-RPQ1P4WWVD"
};
initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth();
export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    db,
    collection,
    doc,
    setDoc,
    query,
    where,
    onSnapshot,
    updateDoc,
    getDoc,
    getDocs,
    updatePassword,
    getAuth,
    deleteDoc
    
};