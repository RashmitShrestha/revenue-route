// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {generateTransactionId } from "../calculate"


const firebaseConfig = {
  apiKey: "AIzaSyA1gPd-iF1qVrJQlEHqSVdg6UBYtL2coZ8",
  authDomain: "revenue-routeaw.firebaseapp.com",
  projectId: "revenue-routeaw",
  storageBucket: "revenue-routeaw.appspot.com",
  messagingSenderId: "905899543099",
  appId: "1:905899543099:web:64c57c0dd89517112aea1e",
  measurementId: "G-LGN76XYH1K"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Create a Google provider object
const googleAuth = new GoogleAuthProvider();

// Function to handle Google sign-in
export const signInWithGoogle = async () => {
  try {
    // Sign in with the Google provider
    const res = await signInWithPopup(auth, googleAuth);
    // The signed-in user info
    return res.user;
    } catch (error: any) {
    alert(error.code + " " + error.message);
  }
};

// check if user is authenticated, make a function which is called in page.tsx
// if authenticated, show user profile and logout
// if not authenticated, show login and signup
export const checkAuth = (): any => {
  onAuthStateChanged(auth, (user) => {
  return user;
  });
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    alert(error.code + error.message);
  }
};



// FIRESTORE START HERE
const db = getFirestore(app);

//collection is users
//document is uid which comes from auth
//collection is transactions
//document is auto generated transaction id
//fields are amt, desc, type, and uid


// Add a new document with a generated id.
export const addDoc = async (uid: string, amt : number, desc: string, type: string) => {
  try {
    const docRef = doc(db, "users", uid, "transactions", generateTransactionId());
    await setDoc(docRef, {
      amt: amt,
      desc: desc,
      type: type,
      uid: uid
    });
  } catch (error: any) {
    alert(error.code + error.message);
  }
};

export { app, auth, googleAuth };

