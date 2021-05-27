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
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CheckIn = () => {
  const [popup, setPopup] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [selected, setSelected] = useState(null);

  const [longLat, setlongLat] = useState(null);
  const [address, setAddress] = useState(null);
  const apiKey = "AIzaSyDp6EgUU_DjV03R3stt5kPGso5PJuEMvNI";
  const mapLoc = { lat: -6.3358381, lng: 107.3202702 };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const containerStyle = {
    width: "100%",
    height: "55%",
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }, []);

  const onClickPopPuP = () => {
    setPopup(!popup);
  };

  const reverseGeo = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&sensor=true&key=${apiKey}`,
      )
      .then((res) => {
        let resAddress = res.data.results[0].formatted_address;
        setAddress(resAddress);
      })
      .catch((err) => console.log(err));
  };

  const inputPhoto = (event) => {
    let image = event.target.files[0] ? event.target.files[0] : null;

    if (image) {
      let source = URL.createObjectURL(image);
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

  useEffect(() => {
    getLocation();

    setTimeout(() => {
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
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapLoc}
            zoom={13}
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
                    </span>{" "}
                    Alert
                  </h2>
                  <p>Spotted </p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`fixed transition-all duration-500 ease-in-out bottom-0 inset-x-0 bg-green-500 rounded-t-xl ${
          popup ? "h-1/2" : "h-5/6 mt-20"
        }`}>
        <div className="flex justify-between text-white bg-green-500  px-4 py-2 rounded-t-xl z-10">
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

        <div className="flex flex-col p-4 rounded-t-xl z-10 overflow-y-auto h-full bg-white">
          <form className="flex flex-col gap-4 mt-2">
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
            <div className="grid grid-cols-2  gap-2 text-sm">
              <div className="flex flex-col gap-2">
                <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                  Kondisi
                </label>
                <select className="p-2 border border-gray-200 rounded bg-white">
                  <option value="wfh">Sehat</option>
                  <option value="wfh">Sakit</option>
                  <option value="wfh">Cuti</option>
                  <option value="wfh">Ijin</option>
                  <option value="wfh">SPPD</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                  Hari
                </label>
                <input
                  type="number"
                  className="text-sm p-2 border border-gray-300 rounded bg-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lokasi" className="text-gray-600 font-semibold">
                  Kehadiran
                </label>
                <select className="p-2 border border-gray-200 rounded bg-white">
                  <option value="wfh">WFH</option>
                  <option value="wfh">WFO</option>
                  <option value="wfh">Satelit</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <label htmlFor="image" className="text-gray-600 font-semibold">
                Photo
                {photo ? (
                  <img
                    src={photo}
                    alt="file"
                    className="-mt-28 rounded-lg cursor-pointer pb-32"
                    style={{
                      position: "relative",
                      transform: "translate(0, 20%)",
                    }}
                  />
                ) : (
                  <UserCircleIcon
                    tabIndex="0"
                    className="h-64 w-full rounded-lg bg-gray-100 text-gray-400 p-2 cursor-pointer mt-2 pb-12"
                  />
                )}
              </label>

              <input
                type="file"
                name="photo"
                accept="image/*"
                capture="camera"
                id="image"
                className="hidden"
                onChange={(event) => inputPhoto(event)}
              />
            </div>
            {photo && (
              <button className="p-3 text-lg font-semibold bg-blue-500 w-full text-center rounded-lg text-white">
                Check In
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
