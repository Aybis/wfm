/** @format */

import { LightningBoltIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import useForm from "helpers/hooks/useForm";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OvertimeIn = ({history}) => {
  const [popup, setPopup] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selected, setSelected] = useState(null);
  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);

  const [state, setState] = useForm({
    lokasi: longLat,
    alamat: address,
    image: "",
    kehadiran: "pilih kehadiran",
    kondisi: "sehat",
    hari: "",
    keterangan: "",
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const containerStyle = {
    width: "100%",
    height: "55%",
  };
  
  const center = {
    lat: -6.2302258,
    lng: 106.8160106,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.setZoom(16); 
    map.setCenter(bounds.getCenter());
    let listener =  window.google.maps.event.addListener(map, "idle", function() { 
      if (map.getZoom() > 16) map.setZoom(16); 
      window.google.maps.event.removeListener(listener); 
    });
  }, []);

  const onClickPopPuP = () => {
    setPopup(!popup);
  };

  const reverseGeo = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&sensor=true&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
      )
      .then((res) => {
        let resAddress = res.data.results[0].formatted_address;
        setAddress(resAddress);
      })
      .catch((err) => console.log(err));
  };

  const inputPhoto = (event) => {
    let fileValue = event.target.files[0] ? event.target.files[0] : null;
    setImage(fileValue);
    console.log(image);
    if (fileValue) {
      let source = URL.createObjectURL(fileValue);
      setPhoto(source);
    }

  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let localCoord = position.coords;
        let objLocalCoord = {
          lat: localCoord.latitude,
          lng: localCoord.longitude,
        };
        reverseGeo(objLocalCoord.lat, objLocalCoord.lng);
        setlongLat(objLocalCoord);
      });
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const submitFunction = (event) => {
    event.preventDefault();
    state.lokasi = longLat;
    state.image = image;
    state.alamat= address
    console.log(state);
  };

  useEffect(() => {
    setTimeout(() => {
     getLocation();

      setPopup(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={popup ? "pt-20" : "pt-0"}>
      <Link
        to="/"
        className="absolute z-40 left-4 rounded-full transition-all duration-500"
        style={{ top: `${popup ? "44%" : "11%"}` }}>
        <ChevronLeftIcon className="h-8 w-8 bg-white rounded p-1" />
      </Link>

      <button
        className="absolute z-40 right-4 transition-all duration-500 rounded-full"
        onClick={() => getLocation()}
        style={{ top: `${popup ? "44%" : "11%"}` }}>
        <LocationMarkerIcon className="h-8 w-8 bg-white rounded p-1 text-blue-500" />
      </button>


      <div className="fixed bg-white top-0 inset-x-0 h-screen">
        {isLoaded  ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onLoad={onLoad}
            options={options}>
            {/* Child components, such as markers, info windows, etc. */}
            <Marker
              position={longLat}
              onClick={() => {
                setSelected(longLat);
              }}
            />
            {selected ? (
              <InfoWindow
                position={longLat}
                onCloseClick={() => {
                  setSelected(null);
                }}>
                <div>
                  <h2>
                    <span role="img" aria-label="bear">
                      🐻
                    </span>
                    Ini Adalah Anda xixixi
                  </h2>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-yellow-500 rounded-t-xl ${
          popup ? "h-1/2" : "h-5/6 mt-20"
        }`}>
        <div className="flex justify-between text-white bg-yellow-500  px-4 py-2 rounded-t-xl z-10">
          <div className="inline-flex">
            <LightningBoltIcon className="h-5 w-5 " />
            <h4 className="font-light text-sm ml-2">Check In</h4>
          </div>

          <ChevronDownIcon
            className={`mr-2 h-6 w-6 transform transition duration-300 rounded-full ${
              popup ? "rotate-180" : "rotate-0"
            }`}
            onClick={onClickPopPuP}
          />
        </div>

        <div className="flex flex-col p-4 rounded-t-xl z-10 overflow-y-auto hidden-scroll h-full bg-white">
          <form
            className="flex flex-col gap-4 mt-2 mb-12"
            onSubmit={submitFunction}>
            <div className="flex flex-col gap-2 text-sm">
              <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                Lokasi
              </label>
              {longLat ? (
                <p className="font-normal text-gray-400 w-full">{address}</p>
              ) : (
                <p className="font-normal text-gray-400">Loading</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                  Subject
                </label>
                <input type="text" className="border border-gray-200 p-2 text-sm text-gray-800 rounded-md" placeholder="Subject Lembur" />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 justify-items-center">
                <div className="flex flex-col items-center gap-1">
                <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                  Lemburan Start
                </label>
                <h4 className="text-gray-800 text-sm font-semibold"> 00 : 00</h4>
                </div>
                <div className="flex flex-col items-center gap-1">
                <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                  Lemburan Finish
                </label>
                <h4 className="text-gray-800 text-sm font-semibold"> 00 : 00</h4>
                </div>
              </div>
           
              <button className="p-3 text-lg font-semibold bg-blue-500 w-full text-center rounded-lg text-white">
                Start
              </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OvertimeIn;
