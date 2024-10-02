import React from 'react';
import { useState, useEffect } from 'react';
import { Transaction } from '../page';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/transc.css';


interface Props {
    authed: boolean;
    transc: Transaction[];
}

const TransList: React.FC<Props> = ({ transc }) => {

    const [transactions, setTransactions] = useState<Transaction[]>(transc);

    return (
        <Container id="transcs">
            <h2 style={{ position: "sticky" }}>Transaction List</h2>
            {transactions.map(transaction => (
                <center>

                    <Row id={transaction.id.toString()} style={{ padding: '5px', margin: '3px', width: "100%" }}>

                        <Col id="trAmt" md={1} style={{ backgroundColor: transaction.amount < 0 ? 'coral' : 'lightgreen' }}>
                            {transaction.amount > 0 ? '$' : '-$'}{Math.abs((transaction.amount))}
                        </Col>
                        <Col className="trSpa" md={6} style={{ backgroundColor: "grey" }}>
                            <strong>{transaction.name}</strong>
                        </Col>

                        <Col className="trSpa" md={3}>
                            <p>{transaction.category}</p>
                        </Col>

                    </Row>
                </center>


            ))}
        </Container>
    );
};

export default TransList;