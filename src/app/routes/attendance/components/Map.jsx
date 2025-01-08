import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GMAPS_API_KEY } from '../../../../secrets/google';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Map extends Component {
  renderMarkers = (map, maps) => {
    const { lat, lng } = this.props;
    return new maps.Marker({
      position: { lat: Number(lat), lng: Number(lng) },
      map,
      title: 'Log Location'
    });
  };

  setLatLng = async (location) => {
    const { setLatLng } = this.props;
    if (setLatLng) {
      setLatLng(location.lat, location.lng);
    }
  };

  render(ctx) {
    const {
      lat, lng, google, useMarker
    } = this.props;
    const styleName = 'embed-responsive-21by9';
    return (
      <div className={`embed-responsive ${styleName}`}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMAPS_API_KEY }}
          yesIWantToUseGoogleMapApiInternals
          defaultZoom={17}
          google={google}
          style={mapStyles}
          center={{ lat: Number(lat), lng: Number(lng) }}
          onGoogleApiLoaded={({ map, maps }) => (useMarker ? this.renderMarkers(map, maps) : null)}
          options={() => ({
            gestureHandling: 'cooperative'
          })}
          onClick={(t) => this.setLatLng(t)}
        />
      </div>
    );
  }
}

export default Map;
