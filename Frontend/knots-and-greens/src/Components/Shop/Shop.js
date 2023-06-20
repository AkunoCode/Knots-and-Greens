import { useEffect, useState } from 'react'
import './Shop.css'
import ProductStack from "../Product-Stack/ProductStack";
import FooterComp from "../Footer/FooterComp"
import axios from 'axios';

const URL_PATH = 'http://localhost:2003/products'

function Shop({ props }) {
    //Props
    const { isLoggedIn } = props;

    // State Variables
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cart, setCart] = useState([]);

    // Loading Data if there is a change in the cart or login state
    useEffect(() => {
        loadData();
        if (isLoggedIn) {
            getCart();
        }
    }, [isLoggedIn, cart])

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

    // Getting the cart of the user
    const getCart = async () => {
        try {
            const response = await axios.get(`http://localhost:2003/carts`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            // if the cart is empty or no-cart, set the cart to an empty array
            if (response.data.message === "No Cart") {
                setCart([])
            } else {
                setCart(response.data.result)
            }
        } catch (error) {
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
                                matchProducts.map((match, index) => {
                                    return match !== null ? <ProductStack item={match} props={isLoggedIn} key={index} /> : null
                                })
                                : NoMatch = false}
                        </div>
                        {NoMatch ? "" : <p id="NoMatch">No Match Found For "{search}"</p>}
                    </div>
                    <div id="Cart-Section">
                        <h2>Your Cart</h2>
                        {isLoggedIn && cart.length !== 0 ? cart.products.map((item) => {
                            return <p>{item.productName} = {item.price}</p>
                        }) : ""}
                        {!isLoggedIn ?
                            <p id="NotLoggedIn">You are not logged in. Please login to view your cart.</p>
                            : <button id="CheckOut">Check Out Now</button>}
                    </div>
                </div>
                <FooterComp />
            </>
        )
    }
}

export default Shop;