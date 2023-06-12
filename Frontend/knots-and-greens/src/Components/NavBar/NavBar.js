import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
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

    const handleClickTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    return (
        <>
            <header id={`Header${scrolled ? '-Scrolled' : ''}`}>
                <div className='Header-Container'>
                    <div id="Logo-Section">
                        <h1>Knots and Greens</h1>
                    </div>
                    <nav>
                        <ul id={`Navigation-Bar${scrolled ? '-Scrolled' : ''}`}>
                            <li><Link to="/" onClick={handleClickTop}>HOME</Link></li>
                            <li><Link to="/Shop" onClick={handleClickTop}>SHOP</Link></li>
                            <li>ABOUT</li>
                        </ul>
                    </nav>
                    <div id="LoginCart">
                        <p className={scrolled ? 'Scrolled-Login' : ''}><a href='/' className={scrolled ? 'Scrolled-Login' : ''}>LOGIN</a>/<a href='/' className={scrolled ? 'Scrolled-Login' : ''}>REGISTER</a></p>
                    </div>
                </div>
            </header >
            <Outlet />
        </>
    )
};
export default NavBar;