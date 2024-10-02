"use client";

import TransList from "./components/translist";
import NavBar from "./components/navbar";
import { checkAuth } from "./lib/firebase/main";
import { useState, useEffect} from "react";
import { signInWithGoogle, signOutUser, addDoc } from "./lib/firebase/main";
import 'bootstrap/dist/css/bootstrap.min.css';




export interface Transaction {
  id: number;
  name: string;
  type: 'profit' | 'expense';
  amount: number;
  category: string;
}

// category of transactions
const categories = ['Income', 'Food', 'Housing', 'Transportation', 'Utilities', 'Entertainment', 'Health', 'Investments', 'Insurance', 'Taxes', 'Debt'];

// samples
// const sampleTransc: Transaction[] = [
 


export default function Home() {


  const loginFunction = () => {
    signInWithGoogle();
    

}

const logoutFunction = () => {
    signOutUser();
}

// const addDoc = () => {
  


  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <body>

      <header>
      {/* check if user is returned */}
        <NavBar loginProp={loginFunction} logoutProp={logoutFunction}/>

      </header>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <TransList transc={sampleTransc} authed = {checkAuth() ? true : false} />

        </main>


      </div>
    </body>
  );
}
