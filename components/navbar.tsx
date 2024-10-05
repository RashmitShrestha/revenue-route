"use strict";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// check if user is authenticated
// if authenticated, show user profile and logout
// if not authenticated, show login and signup
import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { IoAddCircleOutline } from "react-icons/io5";

interface AuthProp {
    loginProp: () => void;
    logoutProp: () => void;
    addTransc: (amt: number, desc: string, type: string) => void;
}

const NavBar: React.FC<AuthProp> = ({ loginProp, logoutProp, addTransc }) => {

    const login = useRef(null);
    const logout = useRef(null);
    const addBtn = useRef(null);

    const amt = useRef(null);
    const desc = useRef(null);
    const type = useRef(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loginFunction = () => {
        loginProp();
        setIsAuthenticated(true);
    }

    const logoutFunction = () => {
        logoutProp();
        setIsAuthenticated(false);
    }

    const handleAdd = () => {
        addTransc(amt.current.value, desc.current.value, type.current.value);
        handleClose();
        console.log(amt.current.value, desc.current.value, type.current.value);
    }

    // check if user is authenticated
    // if authenticated, show user profile and logout
    // if not authenticated, show login and signup

    useEffect(() => {
        if (isAuthenticated == true) {
            login.current.style.display = 'none';
            logout.current.style.display = 'block';
            addBtn.current.style.display = 'block';
        } else {
            logout.current.style.display = 'none';
            login.current.style.display = 'block';
            addBtn.current.style.display = 'none';
        }
    }, [isAuthenticated]);

    return (

        // make navbar with floating right
        // if user is authenticated, show user profile and logout
        // if not authenticated, show login and signup
        <Navbar  expand="lg" style={{ backgroundColor: "black", padding: "1rem"}}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#"><strong className="h1">Revenue Route</strong> </Nav.Link>
                    </Nav>
                    <Nav>

                        <Button ref={login} onClick={loginFunction} className="m-1">LOGIN</Button>
                        <Button ref={logout} onClick={logoutFunction} className="m-1">LOG OUT</Button>

                        <Button className="m-1" variant="primary" onClick={handleShow} ref={addBtn}>
                        <IoAddCircleOutline />
                        </Button>

                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton style={{backgroundColor: "black", color:"white"}}>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{backgroundColor: "black", color:"white"}}>
                                <Form>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Amount" ref={amt} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" placeholder="Description" ref={desc} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Select aria-label="Select type" ref={type} >
                                        <option>Select a transaction type</option>
                                        <option value="Groceries">Groceries</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                        <option value="Salary">Salary</option>
                                        <option value="Investment">Investment</option>
                                    </Form.Select>                                    </Form.Group>
                                </Form>

                            </Modal.Body>
                            <Modal.Footer style={{backgroundColor: "black", color:"white"}}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleAdd}>
                                    Add Transaction
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >

    );
};

export default NavBar;