"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import {generateTransactionId } from "../calculate"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Create a Google provider object
const googleAuth = new GoogleAuthProvider();

// FIRESTORE START HERE
const db = getFirestore(app);

//collection is transactions
//document is auto generated transaction id
//fields are amt, desc, type, uid, and id

export const addDoc = async ( amt : number, desc: string, type: string, uid: string,) => {
  try {
    const docRef = doc(db, "transactions", generateTransactionId());
    await setDoc(docRef, {
      amt: amt,
      desc: desc,
      type: type,
      uid: uid,
      id: docRef.id // same as generated id
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteTransc = async (id: string) => {
  deleteDoc(doc(db, "transactions", id));
}

export { app, auth, googleAuth, db };

