/** @format */

import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { React, useCallback, useState } from 'react';

const CardMapsInOut = ({ mark, address, className, height = '100%' }) => {
  const [selected, setSelected] = useState(false);
  const [addres, setaddres] = useState('Anda Disini');
  const markRadius = mark[0].longLat;

  const MarkInOut = () => {
    return mark.map((item, index) => (
      <Marker
        key={index}
        position={item.longLat}
        onClick={() => {
          setSelected(item.longLat);
          setaddres(item.address);
        }}
      />
    ));
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_PINS_MAPS,
  });

  const containerStyle = {
    width: '100%',
    height: height,
  };

  const center = {
    lat: -6.336465,
    lng: 107.323785,
  };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.setZoom(18);
    map.setCenter(bounds.getCenter());
    let listener = window.google.maps.event.addListener(
      map,
      'idle',
      function () {
        if (map.getZoom() > 18) map.setZoom(18);
        window.google.maps.event.removeListener(listener);
      },
    );
  }, []);

  return (
    <div className={[className, 'relative top-0'].join(' ')}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          onLoad={onLoad}
          options={options}>
          {/* Child components, such as markers, info windows, etc. */}
          <>
            <MarkInOut />
            <Circle
              center={markRadius}
              radius={500}
              options={{ strokeColor: '#ff0000' }}
            />
          </>
          {selected ? (
            <InfoWindow
              position={selected}
              onCloseClick={() => {
                setSelected(null);
              }}>
              <div className="p-2 text-gray-800 font-medium">
                <h2>{addres}</h2>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CardMapsInOut;
