import React from 'react';

interface Transaction {
    id: number;
    name: string;
    type: 'profit' | 'expense';
    amount: number;
    category: string;
}

const transactions: Transaction[] = [
    { id: 1, name: 'Salary', type: 'profit', amount: 5000, category: 'Income' },
    { id: 2, name: 'Groceries', type: 'expense', amount: -150, category: 'Food' },
    { id: 3, name: 'Freelance', type: 'profit', amount: 1200, category: 'Income' },
    { id: 4, name: 'Rent', type: 'expense', amount: -800, category: 'Housing' },
];

const TransList: React.FC = () => {
    return (
        <div>
            <h2>Transaction List</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        <strong>{transaction.name}</strong> - {transaction.type === 'profit' ? '+' : '-'}${Math.abs(transaction.amount)} ({transaction.category})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransList;