"use strict";

import { Transaction } from '../app/page';

// generates random transaction id for firestore
export function generateTransactionId(): string {
    return  Math.random().toString(36).slice(2, 6);
}

// sums up all transaction amounts
export function sumUp(transactions: Transaction[]): number {
    let  sum = 0 ;
    transactions.forEach((transaction) => {
        sum += parseFloat(transaction.amt.toString());  
    });
    // console.log(sum)
    return parseFloat(sum.toFixed(2));  
}