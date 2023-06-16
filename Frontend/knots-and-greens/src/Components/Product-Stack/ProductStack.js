import './ProductStack.css'

// Product Stack Component: This component is used to display the products in the shop page
function ProductStack({ item }) {
    // Destructuring the item object
    const { imagePath, price, productName, qty } = item;

    // Returning the Product Stack Component
    return (
        <div className="ProductContainer">
            <div id="ImageContainer">
                <img src={imagePath} alt={productName} />
            </div>
            <a href='/Shop'>
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" id='AddToCart'>
                    <circle cx="26" cy="26" r="26" fill="#236022" />
                    <path d="M12.375 13.3751L16.0208 13.3751L16.75 16.2918M16.75 16.2918L19.6667 27.9585M16.75 16.2918H38.625L35.7083 27.9585H19.6667M19.6667 27.9585H18.9375C17.7294 27.9585 16.75 28.9378 16.75 30.146C16.75 31.3541 17.7294 32.3335 18.9375 32.3335H35.7083M35.7083 38.1668C35.7083 38.9722 35.0554 39.6251 34.25 39.6251C33.4446 39.6251 32.7917 38.9722 32.7917 38.1668C32.7917 37.3614 33.4446 36.7085 34.25 36.7085C35.0554 36.7085 35.7083 37.3614 35.7083 38.1668ZM21.125 38.1668C21.125 38.9722 20.4721 39.6251 19.6667 39.6251C18.8613 39.6251 18.2083 38.9722 18.2083 38.1668C18.2083 37.3614 18.8613 36.7085 19.6667 36.7085C20.4721 36.7085 21.125 37.3614 21.125 38.1668Z" stroke="white" stroke-width="2.8125" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
            <p id="ProductName">{productName}</p>
            <p id="ProductPrice">&#8369;{price}</p>
            <p id="ProductStock">{qty}</p>
        </div>
    )
}

export default ProductStack;