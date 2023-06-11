import './Product-Carousel.css'

let ImageArray = ["./Media/Plant/Bambino.jpg", "./Media/Plant/Fittonia.jpg", "./Media/Plant/JadePlant.jpg",
    "./Media/Plant/RedBeauty.jpg", "./Media/Plant/RedPeperonia.jpg", "./Media/Plant/WaterMelon.jpg"]

function Carousel() {
    return (
        <div className="Carousel-Container">
            <div className='Images-Container'>
                {ImageArray.map((path) => {
                    return <a href='/'><img src={path} alt="" /></a>
                })}
            </div>
            <div id='Left-Rect' />
            <div id='Right-Rect' />
        </div>
    );
};

export default Carousel;