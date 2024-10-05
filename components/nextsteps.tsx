"use strict";

/* example GET route https://financialmodelingprep.com/api/v3/profile/AAPL?apikey={apiKey} */

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import React, { useEffect } from "react";
import { useState } from "react";

import CompCharts from './compChart';

import '../css/ns.css';

interface Props {
    totalSum: number;
    userInfo: boolean;
}

export interface CompanyDataInterface {
    price: number;
    companyName: string;
    image: string;
}

const handleInvest = () => { // returns 4 random companies in an array, which will be feed into a fetch request to get the latest stock prices
    const ret = [];
    for (let i = 0; i < 3; i++) {
        ret.push(companyStocks[Math.floor(Math.random() * companyStocks.length)]);
    }
    return ret;
}

const fetchCompanyData = async (company: string) => {
    const response = await fetch(`https://financialmodelingprep.com/api/v3/profile/${company}?apikey=${process.env.NEXT_PUBLIC_FINANCIAL_API_KEY}`);
    const data = await response.json();
    // get the objects "price", "companyName", and "image" from the json response, and return as an object
    return { price: data[0].price, companyName: data[0].companyName, image: data[0].image, company: company };
}

const companyStocks = ["APPL", "GOOGL", "AMZN", "TSLA", "MSFT", "FB", "NVDA", "PYPL", "ADBE", "INTC", "CSCO", "NFLX", "PEP", "T", "VZ", "DIS", "KO", "WMT", "MCD", "NKE", "JNJ", "PG", "UNH", "V", "HD", "CRM", "MRK", "JPM", "BAC", "GS", "C", "MS", "AXP", "WFC", "BA", "GE", "CAT", "MMM", "IBM", "HON", "UTX", "CVX", "XOM", "VLO", "COP", "OXY", "SLB", "HAL", "MRO", "APA", "DVN", "EOG", "PSX", "KMI", "WMB", "ET", "D", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NEP", "NEE", "DUK", "SO", "EXC", "AEP", "XEL", "ED", "PEG", "SRE", "NE"];

export default function NextSteps({ totalSum, userInfo }: Props) {

    const [companyData, setCompanyData] = useState<CompanyDataInterface[]>([]);
    const [profitShow, setProfitShow] = useState(false);


    useEffect(() => {
        if (totalSum < 0) {
            setProfitShow(false);
        } else {
            setProfitShow(true);
        }
    }
        , [totalSum]);
    return (
        <Container className="p-3 mt-5" id="nextCont">

            {userInfo ?
                <div>
                    <h1>Next Steps!</h1>
                    <center>
                    <h3 style={{fontSize:"50px", fontWeight:"bolder", margin:"50px 10px"}}>Current Balance: <b style={{color: "#67eeee"}}> {totalSum > 0 ? '$' : '-$'}{Math.abs(totalSum)}</b></h3>

                    </center>
                    <h4>{totalSum > 0 ? "You have a positive balance! Press the button below to find some companies to invest in!" : "You have a negative balance, be mindful of what you spend and consider getting a loan, good luck!"}</h4>

                    {profitShow && (
                        <Container fluid>

                            <center>
                            <Button style={{fontSize:"30px",  margin:"30px 0px 70px 0px"}} onClick={async () => {
                                const tempComp: CompanyDataInterface[] = [];
                                const companies = handleInvest();

                                await Promise.all(companies.map(async (company) => {
                                    const data = await fetchCompanyData(company);
                                    tempComp.push(data);  // Push data to tempComp after resolving
                                }));

                                setCompanyData(tempComp);
                                setProfitShow(true);

                            }}>Click to See Some Options!</Button>
                            </center>
                            
                            <center>
                            <Row className="mb-5">
                                {companyData.map((comps: CompanyDataInterface) => (
                                    <Col md="4" key={comps.companyName}>
                                        <Card style={{ width: '18rem' , backgroundColor: "#ccc"}}>
                                            <Card.Img variant="top" src={comps.image} style={{ height: 'auto', width: "auto" }} alt={`${comps.companyName} logo`} title={`${comps.companyName} logo`} />

                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{comps.companyName}</Card.Subtitle>

                                                <Card.Text>
                                                    ${comps.price}
                                                </Card.Text>

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                           </center>


                            <CompCharts stockPrices={companyData} />
                        </Container>
                    )}
                </div>

                :

                <div>
                    <h1>Next Steps!</h1>
                    <h2>Sign in to see your balance and next steps!</h2>
                </div>
            }
        </Container>

    );
}