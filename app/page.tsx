"use client";

import TransList from "./components/translist";
import NavBar from "./components/navbar";
import { checkAuth } from "./lib/firebase/main";
import { useState, useEffect} from "react";
import { signInWithGoogle, signOutUser } from "./lib/firebase/main";



export interface Transaction {
  id: number;
  name: string;
  type: 'profit' | 'expense';
  amount: number;
  category: string;
}

const sampleTransc: Transaction[] = [
  { id: 1, name: 'Salary', type: 'profit', amount: 5000, category: 'Income' },
  { id: 2, name: 'Groceries', type: 'expense', amount: -150, category: 'Food' },
  { id: 3, name: 'Freelance', type: 'profit', amount: 1200, category: 'Income' },
  { id: 4, name: 'Rent', type: 'expense', amount: -800, category: 'Housing' },
  { id: 5, name: 'Car Payment', type: 'expense', amount: -300, category: 'Transportation' },
  { id: 6, name: 'Dividends', type: 'profit', amount: 100, category: 'Investments' },
  { id: 7, name: 'Electricity', type: 'expense', amount: -50, category: 'Utilities' },
  { id: 8, name: 'Internet', type: 'expense', amount: -40, category: 'Utilities' },
  { id: 9, name: 'Phone', type: 'expense', amount: -30, category: 'Utilities' },
  { id: 10, name: 'Water', type: 'expense', amount: -20, category: 'Utilities' },
  { id: 11, name: 'Gas', type: 'expense', amount: -20, category: 'Utilities' },
  { id: 12, name: 'Netflix', type: 'expense', amount: -15, category: 'Entertainment' },
  { id: 13, name: 'Spotify', type: 'expense', amount: -10, category: 'Entertainment' },
  { id: 14, name: 'Gym', type: 'expense', amount: -30, category: 'Health' },
  { id: 15, name: 'Doctor', type: 'expense', amount: -50, category: 'Health' },
  { id: 16, name: 'Savings', type: 'profit', amount: 500, category: 'Investments' },
  { id: 17, name: 'Insurance', type: 'expense', amount: -100, category: 'Insurance' },
  { id: 18, name: 'Taxes', type: 'expense', amount: -200, category: 'Taxes' },
  { id: 19, name: 'Bonus', type: 'profit', amount: 500, category: 'Income' },
  { id: 20, name: 'Gift', type: 'profit', amount: 50, category: 'Income' },
  { id: 21, name: 'Loan', type: 'profit', amount: 1000, category: 'Income' },
  { id: 22, name: 'Credit Card', type: 'expense', amount: -500, category: 'Debt' },
];


export default function Home() {


  const loginFunction = () => {
    signInWithGoogle();
    console.log('User is signed in');

}

const logoutFunction = () => {
    signOutUser();
    console.log('User is signed out');
}


  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <body>

      <header>
      {/* check if user is returned */}
        <NavBar loginProp={loginFunction} logoutProp={logoutFunction} />

      </header>

      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <TransList transc={sampleTransc} authed = {checkAuth() ? true : false} />

        </main>


      </div>
    </body>
  );
}
