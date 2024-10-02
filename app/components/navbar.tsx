"use strict";

import React, { use } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import {useRouter}  from 'next/navigation';

// check if user is authenticated
// if authenticated, show user profile and logout
// if not authenticated, show login and signup
import { useState, useEffect, useRef } from 'react';


interface AuthProp {

    loginProp: () => void;
    logoutProp: () => void;


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
            console.log('User is signed in');
            login.current.style.display = 'none';
            logout.current.style.display = 'block';
        } else {
            console.log('User is signed out');

            logout.current.style.display = 'none';
            login.current.style.display = 'block';

        }
    }, [isAuthenticated]);

    return (
        <Container >
            {/* width breakpoints */}
            <Navbar bg="transparent" variant="dark" style={{ padding: "1rem 1rem" }}>
                <Nav className="container-fluid">
                    <Nav.Item className="ms-auto" style={{ float: "right" }}>
                        <Nav.Link href="#" ref={login} onClick={loginFunction} id="login">Login</Nav.Link>
                        <Nav.Link href="#" ref={logout} onClick = {logoutFunction} id="logout">Logout</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </Container>
    );
};

export default NavBar;