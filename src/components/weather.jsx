import React, { useEffect } from 'react';

function Weather( { data }) {
    useEffect(() => {
        console.log(data);
    }, [data])
  return <div style={{marginTop: '100px'}}>
      <h1>{data.name}</h1>
      <h2>Temperature: {Math.ceil(data.main.temp - 273.15)}</h2>
      <h3>Feels like: {Math.round(data.main.feels_like - 273.15)}</h3>
    
  </div>;
}

export default Weather;
