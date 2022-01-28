import { useState } from 'react';
import './App.css';
import Form from './components/form';
import Map from './components/map';
import Weather from './components/weather';
import axios from "axios";


function App() {
  const URL = 'https://api.openweathermap.org/data/2.5/weather'
  const apiKey = '324c4c7ade81c6e3ac9a9d20569e5d86'
  const [dataFromInput, setDataFromInput] = useState({})
  const [dataFromMap, setDataFromMap] = useState({})
  const [nameCountry, setNameCountry] = useState("")
  const [lat, setLat] = useState(42.882004)
  const [lng, setLng] = useState(74.582748)

  const getWeatherMap = async (lat, lng) => {
    try {
      const { data } = await axios.get(`${URL}?lat=${lat}&lon=${lng}&appid=${apiKey}`)
      setDataFromInput({});
      setDataFromMap(data)
    } catch {
      console.log("Error with request on Map")
    }
  }

  return (
    <div className="App">
      <div className='cont'>
        <Map url={URL}
          apiKey={apiKey}
          setDataFromMap={setDataFromMap}
          getWeather={getWeatherMap}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
        <div class="weather">
          {Object.keys(dataFromInput).length ?
            <Weather
              data={dataFromInput}
            />
            : Object.keys(dataFromMap).length ?
              <Weather
                data={dataFromMap}
              />
              : null
          }
        </div>
      </div>
    </div>
  );
}

export default App;
