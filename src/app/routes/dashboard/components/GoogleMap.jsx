import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import { GMAPS_API_KEY } from '../../../../secrets/google';

const GoogleMap = ({ children, ...props }) => (
  <>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: GMAPS_API_KEY,
      }}
      /* eslint-disable-next-line react/jsx-props-no-multi-spaces,react/jsx-props-no-spreading */
      {...props}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </GoogleMapReact>
  </>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
