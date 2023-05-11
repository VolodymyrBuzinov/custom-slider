import { Carousel } from "./components/Carousel/Carousel";
import bg1 from "../src/images/image-15.webp";
import bg2 from "../src/images/image-1.webp";
import bg3 from "../src/images/image-3.webp";
import bg4 from "../src/images/image-4.webp";
import bg5 from "../src/images/image-5.webp";
import "./App.scss";

const initialData = [
  { bg: bg1 },
  { bg: bg2 },
  { bg: bg3 },
  { bg: bg4 },
  { bg: bg5 },
];

function App() {
  const fetchCallback = () => {
    console.log("fetchCallback");
  };

  return (
    <div className="App">
      <Carousel updateDataCallback={fetchCallback} infinite>
        {initialData.map((item, i) => (
          <div key={i} className="Carousel-item">
            <span className="Carousel-item-num">{i + 1}</span>
            <img className="Carousel-image" src={item?.bg} alt="image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default App;
