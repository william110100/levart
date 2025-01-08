import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { GMAPS_API_KEY } from '../../../../../secrets/google';
import MapMarker from './MapMarker';

const mapStyles = {
  width: '100%',
  height: '100%'
};

function Map(props) {
  const {
    lat, lng, name, radius, setLatLng
  } = props;
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [circle, setCircle] = useState();
  const styleName = 'embed-responsive-21by9';

  const handleSetLatLng = async (location) => {
    setLatLng(Number(location.lat).toFixed(7), Number(location.lng).toFixed(7));
    if (circle) circle.setMap(null);
  };

  useEffect(() => {

    const renderRadius = (map, maps) => {
      if (maps && maps) {
        const newCircle = new maps.Circle({
          strokeColor: '#005073',
          strokeOpacity: 0.6,
          strokeWeight: 1,
          fillColor: '#71c7ec',
          fillOpacity: 0.2,
          center: { lat: Number(lat), lng: Number(lng) },
          map,
          radius: Number(radius)
        });
        setCircle((c) => {
          if (c) c.setMap(null);
          return newCircle;
        });
        newCircle.setMap(map);
      }
    };

    renderRadius(map, maps);
  }, [map, maps, lat, lng, radius]);

  return (
    <div className={`embed-responsive ${styleName}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GMAPS_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        defaultZoom={17}
        style={mapStyles}
        center={{ lat: Number(lat), lng: Number(lng) }}
        onGoogleApiLoaded={({ map, maps }) => {
          setMap(map);
          setMaps(maps);
        }}
        options={() => ({
          gestureHandling: 'cooperative'
        })}
        onClick={(t) => handleSetLatLng(t)}
        >
        <MapMarker lat={lat} lng={lng} name={name} color="blue" />
      </GoogleMapReact>
    </div>
  );
}

export default Map;
