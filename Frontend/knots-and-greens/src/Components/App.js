import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home/Home'
import Shop from './Shop/Shop';
import MainPage from './MainPage/MainPage';
import Admin from './Admin/Admin';
import SignUp from './LoginSignup/SignUp';
import Login from './LoginSignup/Login';
import { useState } from 'react';

function App() {
    // Routes
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage props={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />}>
                    <Route index element={<Home props={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />} />
                    <Route path='Shop' element={<Shop props={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />} />
                    <Route path='Admin' element={<Admin props={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />} />
                    <Route path='Login' element={<Login props={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />} />
                    <Route path="Signup" element={<SignUp props={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }} />} />
                    <Route path='*' element={<h1 id='NotFound'>404 Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;