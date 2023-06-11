import './Home.css';
import NavBar from './NavBar/NavBar';
import Carousel from './Product-Carousel/Product-Carousel';


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
        <button id='ShopNow-Button'>Shop Now</button>
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
    </>
  );
}

export default App;
