import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GMAPS_API_KEY } from '../../../../secrets/google';
import {reverseGeocode} from '../../../../actions/google/Maps';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class PoiMap extends Component {
  renderMarkers = (map, maps) => {
    const { lat, lng } = this.props;
    return new maps.Marker({
      position: { lat: Number(lat), lng: Number(lng) },
      map,
      title: 'POI detail'
    });
  };

  setLatLng = async (location) => {
    const { setLatLng } = this.props;
    if (setLatLng) {
      setLatLng(location.lat, location.lng);
      await this.setAddress(location.lat, location.lng);
    }
  };

  setAddress = async (lat, lng) => {
    try {
      const { data } = await reverseGeocode(`${lat},${lng}`);
      const { setAddress } = this.props;
      if (setAddress && data.status === 'OK') { setAddress(data.results[0].formatted_address); }
    } catch (e) {
      console.error(e);
    }
  }

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

export default PoiMap;
