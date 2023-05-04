import { Carousel } from "./components/Carousel/Carousel";
import bg from "../src/images/image-15.webp";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Carousel>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
        <div className="Carousel-item">
          <img className="Carousel-image" src={bg} alt="image" />
        </div>
      </Carousel>
    </div>
  );
}

export default App;
