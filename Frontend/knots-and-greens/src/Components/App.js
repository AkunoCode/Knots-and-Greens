import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home/Home'
import Shop from './Shop/Shop';
import MainPage from './MainPage/MainPage';
import Admin from './Admin/Admin';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />}>
                    <Route index element={<Home />} />
                    <Route path='Shop' element={<Shop />} />
                    <Route path='Admin' element={<Admin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;