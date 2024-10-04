"use client";

import TransList from "../components/translist";
import NavBar from "../components/navbar";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db, googleAuth, addDoc, deleteTransc } from "../lib/firebase/main";
import 'bootstrap/dist/css/bootstrap.min.css';
import { signInWithPopup, signOut } from "firebase/auth";
import Container from 'react-bootstrap/Container';

import {sumUp} from '../lib/calculate';

export interface Transaction {
  amt: number;
  desc: string;
  type: string;
  uid: string;
  id: string;
}

// category of transactions
// Groceries, Rent, Miscelleneous, Salary, and Investment 
// samples
// const sampleTransc: Transaction[] = [
export default function Home() {

  const [userInfo, setUserInfo] = useState(null);
  const [allTranscs, setAllTranscs] = useState([]);

  // collections is transactions
  // document is auto generated transaction id
  // fields are amt, desc, type, uid, and id
  // get only fields where uid is equal to user id
  const getData = async () => {
    const q = query(collection(db, "transactions"), where("uid", "==", userInfo));
    // console.log(userInfo);
    const querySnapshot = await getDocs(q);
    const tempTranscs: Transaction[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      tempTranscs.push(doc.data() as Transaction);
    });
    // console.log(tempTranscs)
    setAllTranscs(tempTranscs);
    // console.log(allTranscs);
  }

  useEffect(() => {
    if (userInfo != null) {
      getData();
      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const asyncloginFunction = async () => {
    const user = await signInWithPopup(auth, googleAuth);
    setUserInfo(user.user.uid);
  }

  const logoutFunction = async () => {
    await signOut(auth);
    setUserInfo(null);
    setAllTranscs([]);
  }

  const deleteProp = async (id: string) => {
    deleteTransc(id);
    getData();
  }

  const docPassedAsProp = async (amt: number, desc: string, type: string) => {
    addDoc(amt, desc, type, userInfo);
    getData();
    // console.log(allTranscs);
  }

  return (
    <body>

      <header>
        {/* check if user is returned */}
        <NavBar loginProp={asyncloginFunction} logoutProp={logoutFunction} addTransc={docPassedAsProp} />
      </header>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <TransList transc={allTranscs} delFunc={deleteProp} />

          <Container className="p-3">
          { 
            allTranscs.length == 0 ? <h1>No Transactions Yet</h1> : <h1>Total: ${(sumUp(allTranscs))}</h1>
          }
          </Container>
        </main>
      </div>
    </body>
  );
}
