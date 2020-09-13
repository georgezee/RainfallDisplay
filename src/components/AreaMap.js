import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import SiteMarker from "./SiteMarker";

export default class AreaMap extends Component {
  //-34.0428655, 18.3626059
  state = {
    lat: -34.0315,
    lng: 18.3626,
    zoom: 14,
  }

  render() {
    return (
      <div>
        <Map
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          style={{ width: '100%', height: '50vh'}}
        >
          <TileLayer
            attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <SiteMarker sites={this.props.sitesData} clickSite={this.props.clickSite}/>
        </Map>
      </div>
      )
  }
}
