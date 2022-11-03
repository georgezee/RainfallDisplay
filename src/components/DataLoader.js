import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
//import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import fire from "./firebase";
import crossfilter from "crossfilter2";
import {DateUtil} from "../util/GeneralUtils";


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
      tableEntriesToShow: 30,
      tableUnit: 'day',
      tableHeader: 'Last 30 days',
      currentSiteID : 112,
      offset: -30,
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
        let siteID = parseInt(row['siteId']);
        let rainDate = new Date(row['date']);
        let rainAmount = row['rainfallMm'];
        let currentYear = DateUtil.currentYear();

        // Calculate the annual rain
        if (rainDate.getFullYear() === currentYear) {
          try {
            if (newSites[siteID].annualTotal) {
              newSites[siteID].annualTotal += rainAmount;
            } else {
              newSites[siteID].annualTotal = rainAmount;
            }
          } catch(err) {
            console.log("No siteID found for " + siteID + " : " + err.message);
          }

        }
      });

      this.setState({sites : newSites});

      // Use the crossfilter tool to group rain data by site.
      let crossdata = crossfilter(rainData);

      let siteID = this.state.currentSiteID;
      crossdata.dimension(function(d) {return d.siteId}).filter(siteID);

      let siteTotal = crossdata.dimension(function(d) {
        let theDate = new Date(d['date']);
        //return JSON.stringify ( { year: theDate.getFullYear() , month: theDate.toLocaleString('default', { month: 'short' }) } ) ;
        return JSON.stringify ( { year: theDate.getFullYear() , month: theDate.getMonth() } ) ;
        //return (new Date(d['date']).getFullYear()) + '-'  + (new Date(d['date']).getMonth())
      });

      let siteTotals = siteTotal.group().reduceSum(item => item['rainfallMm']).all();
      //this.print_filter(siteTotals);

      let monthlyData = [];
      let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      siteTotals.forEach(function(item) {
        let theYear = JSON.parse(item.key).year;
        let theMonth = JSON.parse(item.key).month;
        let monthName = monthNames[theMonth];
        if (!monthlyData[theMonth]) {
          monthlyData[theMonth] = {month: monthName};
        }
        monthlyData[theMonth][theYear] = item.value;
      });

      //console.log(monthlyData);
      this.setState({monthlyData : monthlyData});
    } else {
      //console.log("data not loaded yet");
    }
  }

  calculateRainTable() {
    // console.log("calculating rain table");
    let dataMax = 0;
    if (this.state.rainData && this.state.sites) {
      // TODO: Use crossfilter to group/filter data instead.

      let rainData = this.state.rainData;
      let tableData = [];
      let daysToShow = 30;
      let fromDays = 60 + this.state.offset;

      switch (this.state.tableUnit) {
        case 'day':
          daysToShow = 30;
          break;
        case 'week':
          // Week of year calculation depends on the day of the week.
          // We don't want the week numbers to overlap from different years.
          // TODO: Change so that shows full weeks without overlap.
          daysToShow = 360;
          break;
        case 'month':
          daysToShow = 365;
          break;
        default:
          daysToShow = 30;
          break;
      }

      rainData.forEach(function(row) {
        let siteID = parseInt(row['siteId']);
        let siteName = this.getSiteByID(siteID);

        let rainDate = new Date(row['date']);
        let rainAmount = row['rainfallMm'];

        // Only push the row to the data set if it matches the necessary criteria.
        if (DateUtil.isBetweenDates(rainDate, fromDays, daysToShow)) {

          let dateColumn = DateUtil.getPeriodFormat(rainDate, this.state.tableUnit);
          //Add the entry to the correct table cell.
          if (!tableData[siteID]) {
            tableData[siteID] = {};
            tableData[siteID].siteId = siteID;
            tableData[siteID]['Site ID'] = siteName;
          }

          // Create a new entry if it doesn't exist ...
          if (!tableData[siteID][dateColumn]) {
            tableData[siteID][dateColumn] = rainAmount;
            tableData[siteID].siteId = siteID;
            tableData[siteID]['Site ID'] = siteName;
          } else {
            // ... otherwise add to the existing amount.
            tableData[siteID][dateColumn] += rainAmount;
            if (tableData[siteID][dateColumn] > dataMax) {
              dataMax = tableData[siteID][dateColumn];
            }
          }
        }

      }, this);
      let numToShow = this.state.tableEntriesToShow;

      let columnHeadings = [];
      for (let index = 0; index < numToShow; index++) {
        let dateColumn = new Date();
        dateColumn.setDate(dateColumn.getDate() - (fromDays-daysToShow));

        if (this.state.tableUnit === 'day') {
          dateColumn.setDate(dateColumn.getDate() - index);
        } else if (this.state.tableUnit === 'week') {
          dateColumn.setDate(dateColumn.getDate() - (index*7));
        } else {
          // month by default
          dateColumn.setMonth(dateColumn.getMonth() - index);
        }
        columnHeadings.push(DateUtil.getPeriodFormat(dateColumn, this.state.tableUnit));
      }
      columnHeadings.reverse();
      // Append the 'Site ID' column.
      let dateColumns = ['Site ID'].concat(columnHeadings);

      // Convert data set to array without gaps.
      let cellData =  [...new Set(tableData)];
      // Remove resulting first, empty element.
      if (!cellData[0]) { cellData.shift(); }

      this.setState({dayColumns : dateColumns});
      this.setState({tableData : cellData});
      this.setState({tableMax : dataMax});

    } else {
      // console.log("data not loaded yet");
    }
  }

  getSiteByID(searchID) {
    try {
      let matchingSite = this.state.sites.filter((site, index) => {return site.siteid === searchID} )
      return matchingSite[0].vanityName;
    } catch(err) {
      console.log("No name found for " + searchID + " : " + err.message);
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

  handleClickDay() {
    let entriesToShow = 30;
    this.setState({tableEntriesToShow: entriesToShow});
    this.setState({tableHeader: "Last 30 days"});
    this.setState({tableUnit: "day"});
    this.setState({offset: -30});
    this.calculateRainTable();
  }

  handleClickWeek() {
    let entriesToShow = 52;
    this.setState({tableEntriesToShow: entriesToShow});
    this.setState({tableHeader: "Last 52 weeks"});
    this.setState({tableUnit: "week"}, () => { this.calculateRainTable() })
    this.setState({offset: -30});
  }

  handleClickMonth() {
    let entriesToShow = 12;
    this.setState({tableEntriesToShow: entriesToShow});
    this.setState({tableHeader: "Last 12 months"});
    this.setState({tableUnit: "month"}, () => { this.calculateRainTable() });
    this.setState({offset: -30});
  }

  handleClickNext() {
    this.setState(prevState => {
      // Don't let the offset go into the future.
      if (prevState.offset > -30) {
        var newOffset;
        switch (this.state.tableUnit) {
          case 'day':
            newOffset = prevState.offset - 30;
            break;
          case 'week':
            newOffset = prevState.offset - 360;
            break;
          case 'month':
            newOffset = prevState.offset - 360;
            break;
          default:
            newOffset = prevState.offset - 30;
            break;
        }

        return {offset: newOffset}
      }
    }, () => {
      this.calculateRainTable();
    });
  }

  handleClickPrev() {
    this.setState(prevState => {
      var newOffset;
      switch (this.state.tableUnit) {
        case 'day':
          newOffset = prevState.offset + 30;
          break;
        case 'week':
          newOffset = prevState.offset + 360;
          break;
        case 'month':
          newOffset = prevState.offset + 360;
          break;
        default:
          newOffset = prevState.offset + 30;
          break;
      }
      return {offset: newOffset}
    }, () => {
      this.calculateRainTable();
    });
  }

  render() {
    return (
      <Paper square className='PaperPanel'>
        <TabPanel
          rainData={this.state.rainData}
          sites={this.state.sites}
          tableData={this.state.tableData}
          tableMax={this.state.tableMax}
          tableHeader={this.state.tableHeader}
          monthlyData={this.state.monthlyData}
          dayColumns={this.state.dayColumns}
          isLoading={this.state.isLoading}
          changeSite={this.changeSite.bind(this)}
          handleClickDay={this.handleClickDay.bind(this)}
          handleClickWeek={this.handleClickWeek.bind(this)}
          handleClickMonth={this.handleClickMonth.bind(this)}
          handleClickPrev={this.handleClickPrev.bind(this)}
          handleClickNext={this.handleClickNext.bind(this)}
        />
      </Paper>
    );
  }
}

export default DataLoader;