import Map from './Map';
import './App.css';

const API_KEY = "";

function App() {
  return (
    <div className="App">
      <Map key="map1" direction={true} styleUrl={`https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`} />
      <Map key="map2" direction={false} styleUrl={`https://api.maptiler.com/maps/winter/style.json?key=${API_KEY}`} />
    </div>
  );
}

export default App;
