import React from 'react';
import {Popup} from 'react-leaflet';

const MarkerPopup = (props) => {
  return  (
    <Popup>
      <div className='poup-text'>{props.name}</div>
    </Popup>
  );
};
export default MarkerPopup;