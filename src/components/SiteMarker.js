import React, { Component, Fragment } from 'react';
import {Circle} from 'react-leaflet';
import MarkerPopup from './MarkerPopup';

export default class SiteMarker extends Component {

  calculateCircleSize = (input, maxValue) => {
    let sizeMax = 500;

    if (!input) {
      return 20;
    }

    let radius=((input / maxValue) * sizeMax) + 20;
    return radius;
  }

  clickSite(name) {
    console.log("site clicked::" + name);
    this.props.clickSite(name);
  }

  render() {
    const { sites } = this.props;

    if (sites) {
      // Calculate max value of data.
      let dataMax = 400;
      sites.forEach(site => {
        if (site.annualTotal > dataMax) {
          dataMax = site.annualTotal;
        }
        // console.log("Total is " + site.annualTotal);
      });
      // console.log("Data max is " + dataMax);

      const markers = sites.map((site, index) => (
        <Circle
          center={site.geometry}
          radius={this.calculateCircleSize(site.annualTotal, dataMax)}
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
