import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import NavBar from '../Components/NavBar/NavBar'
import Home from '../Components/Home/Home'
import Shop from './Shop/Shop';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route index element={<Home />} />
                <Route path='Shop' element={<Shop />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;