import React, { Fragment } from 'react';
import {Marker, Circle} from 'react-leaflet';
//import {VenueLocationIcon} from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const SiteMarker = (props) => {
  const { sites } = props;

  if (sites) {
    const markers = sites.map((site, index) => (
      <Marker
        key={index}
        position={site.geometry}
        // icon={VenueLocationIcon}
      >

        <MarkerPopup name={site.vanityName + " - " + site.annualTotal}/>
        <Circle
        center={site.geometry}
        radius={100}
        />
      </Marker>
    ));
    return <Fragment>{markers}</Fragment>
  } else {
    return null;
  }
}

export default SiteMarker;