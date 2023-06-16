import { useEffect, useState } from 'react'
import './Shop.css'
import ProductStack from "../Product-Stack/ProductStack";
import FooterComp from "../Footer/FooterComp"
import axios from 'axios';

const URL_PATH = 'http://localhost:2003/products'

function Shop() {
    // State Variables
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Loading Data on first load of the page
    useEffect(() => {
        loadData();
    }, [])

    // Loading Data from the database and setting the state variable products
    const loadData = async () => {
        try {
            const response = await axios.get(URL_PATH)
            setProducts(response.data.result)
            setIsLoaded(true)
        } catch (error) {
            setIsLoaded(false)
            alert('An Error Occured While Loading the Contents')
        }
    }

    // SEARCH FUNCTION
    const [search, setSearch] = useState("");

    // Filtering the products based on the search
    let matchProducts = products.map((item) => {
        const regex = new RegExp(search, 'i');
        if (regex.test(item.productName)) {
            return item;
        } else { return null }
    })

    // Removing the null values from the array
    matchProducts = matchProducts.filter((value) => value !== null)

    let NoMatch = true;

    // if the data is not yet loaded, display the loading screen, else display the contents
    if (!isLoaded) {
        return (
            <>
                <div className='Loading-Container'>
                    <h1>Loading...</h1>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div id="Shop-Container">
                    <div id="Search-Section">
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Searching for an item?" id="SearchBar" />
                        <div id="ResultsContainer">
                            {matchProducts.length !== 0 ?
                                matchProducts.map((match) => {
                                    return match !== null ? <ProductStack item={match} /> : null
                                })
                                : NoMatch = false}
                        </div>
                        {NoMatch ? "" : <p id="NoMatch">No Match Found For "{search}"</p>}
                    </div>
                    <div id="Cart-Section">
                        <h2>Your Cart</h2>

                        <button id="CheckOut">Check Out Now</button>
                    </div>
                </div>
                <FooterComp />
            </>
        )
    }
}

export default Shop;