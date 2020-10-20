import React, { Component } from "react";
import Logo from "./Logo";
import AreaMap from "./AreaMap";
import YearChart from "./YearChart";
import Loader from "./Loader";

class TabMap extends Component {

  componentDidMount() {
  }

  print_filter(f){
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    // Below had no unnecessary escape warning, check this still works before removing.
    //console.log("("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
    console.log("("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/},/g,"},\n\t").replace("]","\n]"));
  }

  render() {

    console.log('rendering maps ...');
    console.log(this.props.sites);
    return (
      <div id='tableContainer'>
        <Logo type='inline'/>
        <div id='mapsContainer'>
          {(this.props.isLoading) ? <Loader/> : ''}
          <AreaMap sitesData={this.props.sites} clickSite={this.props.changeSite}/>
          <br/>
          <YearChart monthlyData={this.props.monthlyData}/>
        </div>
      </div>
    );
  }
}

export default TabMap;
