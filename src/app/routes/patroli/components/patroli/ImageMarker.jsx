import React from 'react';
import {
  imgStyle, markerWrapper
} from '../../constants/OfficerStyle';
import defaultImage from '../../../../../assets/svg/default-profile.svg';
import { InfoWindow } from './InfoWindow';

const { REACT_APP_STATIC_URL } = process.env;

export const ImageMarker = ({
  id, name, detail, show, onClick
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div onClick={() => onClick(detail)} style={markerWrapper}>
    <img
      style={imgStyle}
      src={`${REACT_APP_STATIC_URL}/public/profile/${id}.jpg`}
      alt={name}
      onError={
          (e) => {
            e.currentTarget.src = defaultImage;
            return false;
          }
        } />
    {show && <InfoWindow detail={detail} />}
  </div>
);
