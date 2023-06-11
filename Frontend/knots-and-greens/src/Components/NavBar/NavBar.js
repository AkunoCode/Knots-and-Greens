import React, { useEffect, useState } from 'react';
import './NavBar.css'

function NavBar() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header id={`Header${scrolled ? '-Scrolled' : ''}`}>
            <div className='Header-Container'>
                <div id="Logo-Section"></div>
                <nav>
                    <ul id="Navigation-Bar">
                        <li>HOME</li>
                        <li>SHOP</li>
                        <li>ABOUT</li>
                    </ul>
                </nav>
                <div id="LoginCart">
                    <p className={scrolled ? 'Scrolled-Login' : ''}><a href='/' className={scrolled ? 'Scrolled-Login' : ''}>LOGIN</a>/<a href='/' className={scrolled ? 'Scrolled-Login' : ''}>REGISTER</a></p>
                </div>
            </div>
        </header>
    )
};
export default NavBar;