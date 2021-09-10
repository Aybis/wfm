import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { React, useCallback, useEffect, useState } from 'react';

const CardMapsInOut = ({ mark, address, className, height = '100%' }) => {
  const [selected, setSelected] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [isCenter, setisCenter] = useState({
    lat: -6.336465,
    lng: 107.323785,
  });

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

  // const center = {
  //   lat: -6.336465,
  //   lng: 107.323785,
  // };

  const options = {
    disableDefaultUI: true,
    zoomControl: false,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.setZoom(16);
    map.setCenter(bounds.getCenter());
    // map.fitBounds(bounds);
    let listener = window.google.maps.event.addListener(
      map,
      'idle',
      function () {
        if (map.getZoom() > 16) map.setZoom(16);
        window.google.maps.event.removeListener(listener);
      },
    );
  }, []);

  const markPoint = () => {
    mark.map((item) => setisCenter(item.longLat));
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      markPoint();
    }, 500);
    setDidMount(true);

    return () => {
      clearTimeout(timeOut);
      setDidMount(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <div className={[className, 'relative top-0'].join(' ')}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={isCenter}
          zoom={16}
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
