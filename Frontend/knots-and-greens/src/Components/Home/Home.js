import './Home.css';
import NavBar from '../NavBar/NavBar';
import Carousel from '../Product-Carousel/Product-Carousel';
import ProductStack from '../Product-Stack/ProductStack';
import FooterComp from '../Footer/FooterComp';

const TempInfo = [{
  path: "./Media/Macrame/Basket.jpg", product_name: "Macramme Basket Decoration", product_qty: 10, product_price: 500
},
{ path: "./Media/Macrame/Duotone.jpg", product_name: "Macramme Duotone Wall Decoration", product_qty: 10, product_price: 750 },
{ path: "./Media/Macrame/Mirror.jpg", product_name: "Macramme Circular Mirror", product_qty: 10, product_price: 1000 },
{ path: "./Media/Macrame/Monotone.jpg", product_name: "Macramme Monotone Wall Decoration", product_qty: 10, product_price: 500 },
{ path: "./Media/Macrame/Monstera.jpg", product_name: "Macramme Monstera Wall Decoration", product_qty: 10, product_price: 750 },
{ path: "./Media/Macrame/Owl.jpg", product_name: "Macramme Owl Wall Decoration", product_qty: 10, product_price: 500 },
{ path: "./Media/Macrame/PotHangerBig.jpg", product_name: "Macramme Pot Hanger (Big)", product_qty: 10, product_price: 500 },
{ path: "./Media/Macrame/PotHugger.jpg", product_name: "Macramme Pot Hugger", product_qty: 10, product_price: 500 },
{ path: "./Media/Macrame/Tree.jpg", product_name: "Macramme Christmas Tree Wall Decoration", product_qty: 10, product_price: 700 }]



function App() {
  return (
    <>
      <NavBar />
      <div id='Header-Image'>
        <img src='./Media/Header_Pic.png' alt='Knots and Greens' />
      </div>
      <div id='Header-Texts'>
        <h1 id='Title'>Something handmade is so much more meaningful</h1>
        <p><i>Knot</i> your average style. Discover the art of macramé</p>
        <a href='/Shop'><button id='ShopNow-Button'>Shop Now</button></a>
      </div>
      <div id='First-Section'>
        <h2>EXPRESS THE LOVE WITH OUR</h2>
        <h2 className='Accent-Text'>Plant Bouquets</h2>
      </div>
      <Carousel />
      <div id='Second-Section'>
        <p>Valentine's Day is just around the corner! Are you looking for a meaningful way to impress your partner?
          How about a stunning plant bouquet? It will not only stay vibrant for more than a week but also serve as a symbol
          of the growing love you share with one another.</p>
      </div>
      <h2 id='ProductSectTitle'>Macramé Decorations</h2>
      <div id='ProductSection'>
        {TempInfo.map((product) => {
          return <ProductStack item={product} />
        })}
      </div>
      <FooterComp />
    </>
  );
}

export default App;
