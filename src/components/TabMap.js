import React, { Component } from "react";
import Logo from "./Logo";
import AreaMap from "./AreaMap";
import YearChart from "./YearChart";

class TabMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      hiddenSchools: [],
      isLoading: true,
      popUpOpen: false,
      showLiked: false,
      selectedSchool: {},
      currentSiteID : 112
     };
  }

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



  onPopUpClose = event => {
    this.setState({ popUpOpen: false });
  };

  render() {
    console.log('rendering maps ...');
    console.log(this.props.sites);
    return (
      <div id='tableContainer'>
        <Logo/>
        <br/>
        <AreaMap sitesData={this.props.sites} clickSite={this.props.changeSite}/>
        <br/>
        <YearChart monthlyData={this.props.monthlyData}/>
      </div>
    );
  }
}

export default TabMap;
