import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './MainPage.css'

function MainPage({ props }) {
    //Props
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = props;

    // State Variables
    const [scrolled, setScrolled] = useState(false);

    // Handling the scroll event
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

    // Handling the click event of the navigation bar
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
                            {!isAdmin ? <><li> <Link to="/" onClick={handleClickTop}>HOME</Link></li>
                                <li><Link to="/Shop" onClick={handleClickTop}>SHOP</Link></li>
                                <li><Link to="/About" onClick={handleClickTop}>ABOUT</Link></li>
                            </>
                                :
                                <>
                                    <li><Link to="/" onClick={handleClickTop}>HOME</Link></li>
                                    <li><Link to="/Admin" onClick={handleClickTop}>ADMIN</Link></li>
                                    <li><Link to="/About" onClick={handleClickTop}>ABOUT</Link></li>
                                </>}
                        </ul>
                    </nav>
                    <div id="LoginCart">
                        {!isLoggedIn ? <p className={scrolled ? 'Scrolled-Login' : ''}>
                            <Link to='/Login' onClick={handleClickTop} className={scrolled ? 'Scrolled-Login' : ''}>LOGIN</Link>/
                            <Link to='/Signup' onClick={handleClickTop} className={scrolled ? 'Scrolled-Login' : ''}>SIGNUP</Link>
                        </p> : <Link to='/' onClick={() => { handleClickTop(); setIsLoggedIn(false); localStorage.clear() }} className={scrolled ? 'Scrolled-Login' : ''}>LOGOUT</Link>}
                    </div>
                </div>
            </header >
            <Outlet />
        </>
    )
};
export default MainPage;