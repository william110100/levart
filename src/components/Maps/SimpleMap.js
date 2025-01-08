import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import {GMAPS_API_KEY} from '../../secrets/google';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class SimpleMap extends Component {
  renderMarkers = (map, maps, {title}) => {
    const { lat, lng } = this.props;
    return new maps.Marker({
      position: { lat: Number(lat), lng: Number(lng) },
      map,
      title
    });
  };

  render(ctx) {
    const {
      lat, lng, google, title
    } = this.props;
    const styleName = 'embed-responsive-21by9';
    return (
      <div className={`embed-responsive ${styleName}`}>
        <GoogleMapReact
          bootstrapURLKeys={{key: GMAPS_API_KEY}}
          defaultZoom={17}
          google={google}
          style={mapStyles}
          yesIWantToUseGoogleMapApiInternals={true}
          defaultCenter={{
            lat: Number(lat),
            lng: Number(lng)
          }}
          onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps, {title})}
          options={() => ({
            gestureHandling: 'cooperative'
          })}
        />
      </div>
    );
  }
}

export default SimpleMap;
