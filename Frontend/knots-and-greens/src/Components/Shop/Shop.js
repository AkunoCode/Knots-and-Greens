import { useEffect, useState } from 'react'
import './Shop.css'
import ProductStack from "../Product-Stack/ProductStack";
import FooterComp from "../Footer/FooterComp"
import axios from 'axios';

const URL_PATH = 'http://localhost:2003/products'

// Temporary Data
// const productList = [{
//     path: "./Media/Macrame/Basket.jpg", product_name: "Macramme Basket Decoration", product_qty: 10, product_price: 500
// },
// { path: "./Media/Macrame/Duotone.jpg", product_name: "Macramme Duotone Wall Decoration", product_qty: 10, product_price: 750 },
// { path: "./Media/Macrame/Mirror.jpg", product_name: "Macramme Circular Mirror", product_qty: 10, product_price: 1000 },
// { path: "./Media/Macrame/Monotone.jpg", product_name: "Macramme Monotone Wall Decoration", product_qty: 10, product_price: 500 },
// { path: "./Media/Macrame/Monstera.jpg", product_name: "Macramme Monstera Wall Decoration", product_qty: 10, product_price: 750 },
// { path: "./Media/Macrame/Owl.jpg", product_name: "Macramme Owl Wall Decoration", product_qty: 10, product_price: 500 },
// { path: "./Media/Macrame/PotHangerBig.jpg", product_name: "Macramme Pot Hanger (Big)", product_qty: 10, product_price: 500 },
// { path: "./Media/Macrame/PotHugger.jpg", product_name: "Macramme Pot Hugger", product_qty: 10, product_price: 500 },
// { path: "./Media/Macrame/Tree.jpg", product_name: "Macramme Christmas Tree Wall Decoration", product_qty: 10, product_price: 700 }];
function Shop() {



    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        try {
            const response = await axios.get(URL_PATH)
            setProducts(response.data.result)
        } catch (error) {
            alert('An Error Occured While Loading the Contents')
        }
    }

    // SEARCH FUNCTION
    const [search, setSearch] = useState("");

    let matchProducts = products.map((item) => {
        const regex = new RegExp(search, 'i');
        if (regex.test(item.productName)) {
            return item;
        } else { return null }
    })

    matchProducts = matchProducts.filter((value) => value !== null)

    let NoMatch = true;

    return (
        <>
            <div id="Shop-Container">
                <div id="Search-Section">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Searching for an item?" id="SearchBar" />
                    <div id="ResultsContainer">
                        {matchProducts.length !== 0 ? matchProducts.map((match) => {
                            return match !== null ? <ProductStack item={match} /> : null
                        }) : NoMatch = false}
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

export default Shop;