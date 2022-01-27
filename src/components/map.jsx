// import axios from 'axios';
// import React from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

// function MapFromGoogle({ getWeather }) {

//     return (
//          <GoogleMap
//          onClick={ev => {
//           getWeather(ev.latLng.lat(), ev.latLng.lng())
//           }}
//             defaultZoom={2}
//             defaultCenter={{ lat: 22.3193, lng: 114.1694 }}
//         />
//     )
// }

// const WrappedMap = withScriptjs(withGoogleMap(MapFromGoogle));

// function Map({ getWeather }) {
//   return <div style={{width: '100%', height: '300px'}}>
//         <WrappedMap
//             // props={props}
//             getWeather={getWeather}
//             googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
//             loadingElement={<div style={{ height: `100%` }} />}
//             containerElement={<div style={{ height: `400px` }} />}
//             mapElement={<div style={{ height: `100%` }} />}
//         />
//   </div>;
// }

// export default Map;

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
    libraries,
  });
  const center = {
    lat: lat,
    lng: lng,
  };
  
  // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        option={option}
        onClick={(event) => {
          setLat(event.latLng.lat())
          setLng(event.latLng.lng())
          getWeather(event.latLng.lat(), event.latLng.lng());
        }}
      />
    </div>
  );
}

function Search() {
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
        onSelect={(address) => {
          console.log(address);
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
          {
          // status == "OK" ?
          // data.map(({id, description}) => console.log(id)) : null 
          }
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
