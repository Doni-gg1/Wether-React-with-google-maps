import React, { useEffect, useState } from "react";

function Form({ getWeather, nameCountry, setNameCountry }) {
  useEffect(() => {}, [nameCountry]);
  return (
    <div className="form">
      <form >
        <label>
          Название страны <br />
          <input type="text" onChange={(e) => setNameCountry(e.target.value)} />
        </label>
      </form>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={getWeather}>Найти</button>

    </div>
  );
}

export default Form;
