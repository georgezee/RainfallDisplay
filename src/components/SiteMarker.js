import React, { Component, Fragment } from 'react';
import {Circle} from 'react-leaflet';
import MarkerPopup from './MarkerPopup';

export default class SiteMarker extends Component {

  calculateCircleSize = (input) => {
    let dataMax = 1000;
    let sizeMax = 300;

    if (!input) {
      return 20;
    }

    let radius=((input / dataMax) * sizeMax) + 20;
    return radius;
  }

  clickSite(name) {
    console.log("site clicked::" + name);
    this.props.clickSite(name);
  }

  render() {
    const { sites } = this.props;

    if (sites) {
      const markers = sites.map((site, index) => (
        <Circle
          center={site.geometry}
          radius={this.calculateCircleSize(site.annualTotal)}
          onClick={() => this.clickSite(site.vanityName)}
          key={index}
        >
          <MarkerPopup name={site.vanityName + " - " + site.annualTotal}/>
        </Circle>
      ));
      return <Fragment>{markers}</Fragment>
    } else {
      return null;
    }
  }
}
