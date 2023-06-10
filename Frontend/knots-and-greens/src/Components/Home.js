import './Home.css';
import NavBar from './NavBar/NavBar';

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
    </>
  );
}

export default App;
