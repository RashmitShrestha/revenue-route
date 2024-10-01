import React, { use } from 'react';
import Link from 'next/link';
// check if user is authenticated
// if authenticated, show user profile and logout
// if not authenticated, show login and signup
import { useState, useEffect } from 'react';


const Navbar: React.FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // check if user is authenticated
    // if authenticated, show user profile and logout
    // if not authenticated, show login and signup

    useEffect(() => {
        if (isAuthenticated == true ) {
            console.log('User is signed in');
            document.getElementById('login').style.display = 'none';
        } else {
            console.log('User is signed out');
            document.getElementById('profile').style.display = 'none';
            document.getElementById('logout').style.display = 'none';
        }
    }, [isAuthenticated]);






    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link href="/">
                        <a>MyApp</a>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-4">
                    {/* different links based on user authentication */}

                    <Link href="/login">
                        <a className="text-gray-300 hover:text-white">Login</a>
                    </Link>
                    <Link href="/signup">
                        <a className="text-gray-300 hover:text-white">Signup</a>
                    </Link>
                    <Link href="/profile">
                        <a className="text-gray-300 hover:text-white">Profile</a>
                    </Link>
                    <Link href="/logout">
                        <a className="text-gray-300 hover:text-white">Logout</a>
                    </Link>

                </div>
                <div className="md:hidden">
                    <button className="text-gray-300 hover:text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;