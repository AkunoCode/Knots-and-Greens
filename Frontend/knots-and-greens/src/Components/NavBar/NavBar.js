import React from 'react';
import './NavBar.css'

function NavBar() {
    return (
        <header id="Header">
            <div id="Logo-Section"></div>
            <nav>
                <ul id="Navigation-Bar">
                    <li>Home</li>
                    <li>Macrame</li>
                    <li>Plants</li>
                    <li>Shop</li>
                    <li>About</li>
                </ul>
            </nav>
            <div id="LoginCart">
                <p>Login</p>
                <p>Register</p>
            </div>
        </header>
    )
}

export default NavBar;