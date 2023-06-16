import { useEffect, useState } from 'react';
import './Product-Carousel.css'
import axios from 'axios';

const URL_PATH = 'http://localhost:2003/products'

function Carousel({ props }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        try {
            const response = await axios.get(URL_PATH)
            setProducts(response.data.result)
            props(true)
        } catch (error) {
            props(false)
            alert('An Error Occured While Loading the Contents')
        }
    }

    return (
        <div className="Carousel-Container">
            <div className='Images-Container'>
                {products.map((product) => {
                    if (product.tags.includes('carousel')) {
                        return <a href='/Shop'><img src={product.imagePath} alt={product.productName} /></a>
                    } else {
                        return undefined;
                    }
                })}
            </div>
            <div id='Left-Rect' />
            <div id='Right-Rect' />
        </div>
    );
};

export default Carousel;