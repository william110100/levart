import React from 'react';
import {
  imgStyle, markerWrapper
} from '../constants/OfficerStyle';
import defaultImage from '../../../../../../assets/svg/default-profile.svg';
import { InfoWindow } from './InfoWindow';

export const ImageMarker = ({
  id, name, detail, show, onClick
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
  <div style={markerWrapper}>
    <img style={imgStyle} src={defaultImage} alt="evidence" />
    {show && <InfoWindow detail={detail} />}
  </div>
);
