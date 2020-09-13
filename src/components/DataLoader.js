import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
//import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import fire from "./firebase";
import crossfilter from "crossfilter2";

class DataLoader extends Component {
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
     // Fetch the necessary data.
     this.loadRainData();
     this.loadSiteData();
  }


  clearSitesRaindata(sitesData) {
    sitesData.forEach(function(row) {
      delete row.annualTotal;
    });
    return sitesData;
  }

  loadSiteData() {
    let messagesRef = fire
      .database()
      .ref("sites")
      .orderByKey()
      .limitToLast(10000);

    messagesRef.on("value", function(siteData) {
      // We have received the data from Firebase.
      // Now we make any transformations needed before passing to the data table.
      let list = [];

      siteData.forEach(function(site) {
        let siteRow = site.val()
        siteRow.geometry = [siteRow.latitude, siteRow.longitude];
        list[siteRow.siteid] = siteRow;
      });

      console.log(list);
      this.setState({ sites: list });

      this.calculateRain();
      this.calculateRainTable();
    }.bind(this));
  }

  loadRainData() {
    let messagesRef = fire
    .database()
    .ref('rainData')
    .orderByKey()
    .limitToLast(10000);

    messagesRef.on("value", function(snapshot) {
      // We have received the data from Firebase.
      // Now we make any transformations needed before passing to the data table.

      let list = [];

      snapshot.forEach(function(school) {
        let schoolRow = school.val()

        // //Parse line breaks in certain fields.
        // if (schoolRow.additionalinfo && (schoolRow.additionalInfo.length > 0)) {
        //   schoolRow.additionalInfo = schoolRow.additionalInfo.split('\n').map((item, i) => <span key={i}>{item}<br/></span>);
        // }
        // if (schoolRow.employmentAssistance && (schoolRow.employmentAssistance.length > 0)) {
        //   schoolRow.employmentAssistance = schoolRow.employmentAssistance.split('\n').map((item, i) => <span key={i}>{item}<br/></span>);
        // }

        // // Apply favourites from localstorage to data.
        // let index = favorites.indexOf(schoolRow.key);
        // if (index === -1) {
        //   schoolRow.liked = 'false';
        // } else {
        //   schoolRow.liked = 'true';
        // }
        // // If the path matches this school's key, display it as the highlighted item.
        // if (window.location.pathname === "/" + schoolRow.key) {
        //   // Add a space in front of the name so it appears as the first item.
        //   schoolRow.name = " " + schoolRow.name;
        //   highlightRow = schoolRow;
        // }
        list.push(schoolRow);
      });

      // if (highlightRow !== null) {
      //   this.setState({
      //     selectedSchool: highlightRow,
      //     popUpOpen: true,
      //   });
      // }

      this.setState({ rainData: list, isLoading: false });

      this.calculateRain();
      this.calculateRainTable();

    }.bind(this));
  }

  calculateRain() {
    if (this.state.rainData && this.state.sites) {

      // Clean data (skip sites that didn't have entries throughout the period)
      // Todo
      // -----

      let rainData = this.state.rainData;
      let newSites = this.state.sites;

      // We're about to re-caculate the totals, so clear existing rainfall data.
      newSites = this.clearSitesRaindata(newSites);

      rainData.forEach(function(row) {
        let siteID = parseInt(row['key']);
        let rainDate = new Date(row['name']);
        let rainAmount = row['rainfall(Mm)'];
        let currentYear = 2019;

        // Calculate the annual rain
        if (rainDate.getFullYear() === currentYear) {
          if (newSites[siteID].annualTotal) {
            newSites[siteID].annualTotal += rainAmount;
          } else {
            newSites[siteID].annualTotal = rainAmount;
          }
        }
      });

      this.setState({sites : newSites});

      // Use the crossfilter tool to group rain data by site.
      let crossdata = crossfilter(rainData);

      let siteID = this.state.currentSiteID;
      crossdata.dimension(function(d) {return d.key}).filter(siteID);

      let siteTotal = crossdata.dimension(function(d) {
        let theDate = new Date(d['name']);
        //return JSON.stringify ( { year: theDate.getFullYear() , month: theDate.toLocaleString('default', { month: 'short' }) } ) ;
        return JSON.stringify ( { year: theDate.getFullYear() , month: theDate.getMonth() } ) ;
        //return (new Date(d['name']).getFullYear()) + '-'  + (new Date(d['name']).getMonth())
      });

      let siteTotals = siteTotal.group().reduceSum(item => item['rainfall(Mm)']).all();
      //this.print_filter(siteTotals);

      let monthlyData = [];
      let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      siteTotals.forEach(function(item) {
        let theYear = JSON.parse(item.key).year;
        let theMonth = JSON.parse(item.key).month;
        let monthName = monthNames[theMonth];
        if (!monthlyData[theMonth]) {
          monthlyData[theMonth] = {name: monthName};
        }
        monthlyData[theMonth][theYear] = item.value;
      });

      //console.log(monthlyData);
      this.setState({monthlyData : monthlyData});
    } else {
      console.log("data not loaded");
    }
  }

  calculateRainTable() {
    console.log("calculating rain table");
    if (this.state.rainData && this.state.sites) {

      // Clean data (skip sites that didn't have entries throughout the period)
      // Todo
      // -----

      let rainData = this.state.rainData;
      let allDays = [];
      let tableData = [];

      rainData.forEach(function(row) {
        let siteID = parseInt(row['key']);
        let rainDate = new Date(row['name']);
        let rainAmount = row['rainfall(Mm)'];

        // Add each date to the column list.
        let dateColumn = rainDate.getFullYear() + "-" + rainDate.getMonth() + "-" + rainDate.getDay();
        allDays.push(dateColumn);

        //Add the entry to the correct table cell.
        if (!tableData[siteID]) {
          tableData[siteID] = {};
          tableData[siteID].key = siteID;
          tableData[siteID]['Site ID'] = siteID;
        }
        tableData[siteID][dateColumn] = rainAmount;

      });

      // Reduce the days to unique entries
      let dayColumns = [...new Set(allDays)];
      dayColumns = ['Site ID'].concat(dayColumns);
      let cellData =  [...new Set(tableData)];

      this.setState({dayColumns : dayColumns});
      this.setState({tableData : cellData});

    } else {
      console.log("data not loaded");
    }
  }

  getSiteByName(vanityName) {
    let matchingSite = this.state.sites.filter((site, index) => {return site.vanityName === vanityName} )
    return matchingSite[0].siteid;
  }

  changeSite(vanityName) {
    let siteID = this.getSiteByName(vanityName);
    this.setState({currentSiteID: siteID});
    this.calculateRain();
  }

  render() {
    return (
      <Paper square className='PaperPanel'>
        <TabPanel
          rainData={this.state.rainData}
          sites={this.state.sites}
          tableData={this.state.tableData}
          monthlyData={this.state.monthlyData}
          dayColumns={this.state.dayColumns}
          isLoading={this.state.isLoading}
          changeSite={this.changeSite.bind(this)}
        />
      </Paper>
    );
  }
}

export default DataLoader;