"use strict";

import React, { use } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// check if user is authenticated
// if authenticated, show user profile and logout
// if not authenticated, show login and signup
import { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';


interface AuthProp {

    loginProp: () => void;
    logoutProp: () => void;
    // addProp: () => void;


}

const NavBar: React.FC<AuthProp> = ({ loginProp, logoutProp }) => {

    const login = useRef(null);
    const logout = useRef(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const loginFunction = () => {
        loginProp();
        setIsAuthenticated(true);
    }

    const logoutFunction = () => {
        logoutProp();
        setIsAuthenticated(false);
    }



    // check if user is authenticated
    // if authenticated, show user profile and logout
    // if not authenticated, show login and signup

    useEffect(() => {
        if (isAuthenticated == true) {
            login.current.style.display = 'none';
            logout.current.style.display = 'block';
        } else {

            logout.current.style.display = 'none';
            login.current.style.display = 'block';

        }
    }, [isAuthenticated]);

    return (


        // make navbar with floating right
        // if user is authenticated, show user profile and logout
        // if not authenticated, show login and signup
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Revenue Route </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Revenue Route </Nav.Link>
                    </Nav>
                    <Nav>
                        <Button ref={login} onClick={loginFunction}>Login</Button>
                        <Button ref={logout} onClick={logoutFunction}>Logout</Button>
                        {/* <Button onClick={console.log("hey")}>Add Transaction</Button> */}
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar >

    );
};

export default NavBar;