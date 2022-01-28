import React, { useEffect } from "react";
import Sunny from "../assets/images/Sunny.png"
import Rain from "../assets/images/Rain.png"
import Snow from "../assets/images/Snow.png"
import Clouds from "../assets/images/Clouds.png"
import Clear from "../assets/images/Clear.png"


function Weather({ data }) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="weatherItem" style={{ marginTop: "100px" }}>
      <div>
        <h1>{data.name}</h1>
        <p>
          {data.weather[0].main}, {data.weather[0].description}
        </p>
      </div>
      <div className="temp">
        <h2>
          {Math.ceil(data.main.temp - 273.15)}
          <sup>
            <sup>
              <small>o</small>
            </sup>
          </sup>
        </h2>
        <img width='100px' src={
            data.weather[0].main == "Clouds" ? Clouds : data.weather[0].main == "Sunny" ? Sunny : data.weather[0].main == "Rain" ? Rain : data.weather[0].main == "Snow" ? Snow : data.weather[0].main == 'Clear' ? Clear : null
        } alt="Icon" />
      </div>
      <h3>Feels like: {Math.round(data.main.feels_like - 273.15)}</h3>
    </div>
  );
}

export default Weather;
