import React from 'react';

const infoWindowStyle = {
  position: 'relative',
  bottom: 60,
  left: '-45px',
  width: 220,
  backgroundColor: 'white',
  boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
  padding: '3px 5px',
  fontSize: 12,
  zIndex: 100,
};

export const InfoWindow = ({ detail }) => (
  <div style={infoWindowStyle}>
    <div style={{ fontSize: 12 }}>
      <div>
        Latitude:
        {' '}
        {detail.lat}
      </div>
      <div>
        Longitude:
        {' '}
        {detail.lng}
      </div>
      <div>
        Alamat:
        {' '}
        {detail.address}
      </div>
      <div>
        {detail.created_at}
      </div>
    </div>
  </div>
);
