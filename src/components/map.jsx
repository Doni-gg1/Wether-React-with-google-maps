import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const option = {
  disableDefaultUI: true,
};

export default function Map({ getWeather, lat, lng, setLat, setLng }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  const center = {
    lat: lat,
    lng: lng,
  };

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search getWeather={getWeather} setLat={setLat} setLng={setLng} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        option={option}
        onClick={(event) => {
          setLat(event.latLng.lat());
          setLng(event.latLng.lng());
          getWeather(event.latLng.lat(), event.latLng.lng());
        }}
      />
    </div>
  );
}

function Search({ getWeather, setLat, setLng }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 42.882004,
        lng: () => 74.582748,
      },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            setLat(lat)
            setLng(lng)
            getWeather(lat, lng);
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Название местности"
        />

        <ComboboxPopover>
          {status == "OK" &&
            data.map(({ id, description }) => {
              return data.map(({ id, description }) => (
                <ComboboxOption id={id} value={description} />
              ));
            })}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
