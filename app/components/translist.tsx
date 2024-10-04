"use strict";

import React from 'react';
import { useState, useEffect } from 'react';
import { Transaction } from '../page';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/transc.css';

import { Button } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";

interface Props {
    transc: Transaction[];
    delFunc: (id: string) => void;
}

const TransList: React.FC<Props> = ({ transc, delFunc }) => {
    const [transactions, setTransactions] = useState<Transaction[]>(transc);

    useEffect(() => {
        setTransactions(transc);  // Update transactions when transc prop changes
    }, [transc]);

    return (
        <Container id="transcs">
            <h2 style={{ position: "sticky" }}>{transactions.length === 0 ? "No Transactions Yet" : "List of Transactions"}</h2>
            {transactions.map(transaction => (
                <center>

                    <Row key={transaction.id} id={transaction.id} style={{ padding: '5px', margin: '3px', width: "100%" }}>
                        <Col key={transaction.id} id="trAmt" md={3} style={{ backgroundColor: transaction.amt < 0 ? 'coral' : 'lightgreen' }}>
                            {transaction.amt > 0 ? '$' : '-$'}{Math.abs((transaction.amt))}
                        </Col>
                        <Col key={transaction.id} className="trSpa" md={4} style={{ backgroundColor: "grey" }}>
                            <strong>{transaction.desc}</strong>
                        </Col>
                        <Col key={transaction.id} className="trSpa" md={3}>
                            <p>{transaction.type}</p>
                        </Col>
                        <Col key={transaction.id} className="trSpa" md={2}>
                            <Button variant="danger" onClick={() => delFunc(transaction.id)}><FaTrashAlt /></Button>
                        </Col>
                    </Row>
                </center>
            ))}           
        </Container>
    );
};

export default TransList;