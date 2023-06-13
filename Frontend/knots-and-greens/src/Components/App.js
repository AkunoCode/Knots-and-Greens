import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home/Home'
import Shop from './Shop/Shop';
import MainPage from './MainPage/MainPage';
import Admin from './Admin/Admin';
import SignUp from './LoginSignup/SignUp';
import Login from './LoginSignup/Login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />}>
                    <Route index element={<Home />} />
                    <Route path='Shop' element={<Shop />} />
                    <Route path='Admin' element={<Admin />} />
                    <Route path='Login' element={<Login />} />
                    <Route path="Signup" element={<SignUp />} />
                    <Route path='*' element={<h1>404 Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;