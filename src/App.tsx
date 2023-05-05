import { Carousel } from "./components/Carousel/Carousel";
import bg from "../src/images/image-15.webp";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Carousel elementIndexToFocus={5}>
        <div className="Carousel-item">
          <span className="Carousel-item-num">1</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">2</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">3</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">4</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">5</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">6</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">7</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">8</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <span className="Carousel-item-num">9</span>
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
      </Carousel>
    </div>
  );
}

export default App;
