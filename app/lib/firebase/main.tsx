// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Create a Google provider object
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in
const signInWithGoogle = async () => {
  try {
    // Sign in with the Google provider
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info
    const user = result.user;
    // ...
  } catch (error : any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
};

// check if user is authenticated, make a function which is called in page.tsx
// if authenticated, show user profile and logout
// if not authenticated, show login and signup
export const checkAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const uid = user.uid;
      console.log('User is signed in');
    } else {
      // User is signed out
      console.log('User is signed out');
    }
  });
};

const signInButton = document.getElementById('signInButton');
signInButton.addEventListener('click', signInWithGoogle);

export default app;

