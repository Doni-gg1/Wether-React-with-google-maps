import React, { useCallback, useRef, useState } from "react";
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
import { Spring, animated } from 'react-spring'

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const option = {
  disableDefaultUI: false,
};

export default function Map({ getWeather, lat, lng, setLat, setLng }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const center = {
    lat: lat,
    lng: lng,
  };

  const searchBtn = () => {
    document.querySelector(".search").classList.toggle("notActiveInput");
    document
      .querySelector(".search-icon")
      .classList.toggle("activeSearch-icon");
    document.querySelector(".search input").focus();
  };

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const [markers, setMarkers] = useState({});

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div style={{borderRadius: "50%"}}>
      <Search
        setMarkers={setMarkers}
        panTo={panTo}
        getWeather={getWeather}
        setLat={setLat}
        setLng={setLng}
      />
      
      <Spring

        from={{opacity: "1", transform: "scale(100)"}}
        to={{opacity: "1", transform: "scale(1)"}}
         config={{duration: 500}} 
      >
        {
          styles => (

        <animated.div style={styles}>
          <button
        style={{ transition: "0.5s" }}
        className="searchBtn search-icon"
        onClick={searchBtn}
        ></button>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={center}
          option={option}
          onClick={(event) => {
            setLat(event.latLng.lat());
            setLng(event.latLng.lng());
            getWeather(event.latLng.lat(), event.latLng.lng());
            setMarkers({ lat: event.latLng.lat(), lng: event.latLng.lng() });
          }}
          onLoad={onMapLoad}
        >
          <Marker
            position={markers}
            onClick={(e) => {
              // document.querySelector('.wrapper_weatherItem').setAttribute("hidden", false)
              document
                .querySelector(".weatherItem")
                .classList.toggle("notActive");
            }}
          />
        </GoogleMap>

        </animated.div>
          )
        }
      </Spring>
    </div>
  );
}

function Search({ getWeather, setLat, setLng, panTo, setMarkers }) {
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
    <div className="search notActiveInput">
      <Combobox
        onSelect={async (address) => {
          setValue("");
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            setLat(lat);
            setLng(lng);
            getWeather(lat, lng);
            panTo({ lat, lng });
            setMarkers({ lat, lng });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          style={{ transition: "0.5s" }}
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
                <ComboboxOption key={id} value={description} />
              ));
            })}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
