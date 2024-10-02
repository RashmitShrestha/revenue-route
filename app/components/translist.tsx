import React from 'react';
import { useState, useEffect } from 'react';
import { Transaction } from '../page';


interface Props {

    authed: boolean;
    transc: Transaction[];

}

const TransList: React.FC<Props> = ({ transc }) => {

    const [transactions, setTransactions] = useState<Transaction[]>(transc);

    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        <strong>{transaction.name}</strong> : {transaction.type === 'profit' ? '+' : '-'}${Math.abs(transaction.amount)} ({transaction.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransList;