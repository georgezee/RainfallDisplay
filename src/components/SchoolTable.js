import React, { Component } from "react";
import fire from "./firebase";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Loader from "./Loader";
import ExpandableRow from "./ExpandableRow";
import AppTitleBar from "./AppTitleBar";
import ToolbarExtra from "./ToolbarExtra";
import Avatar from '@material-ui/core/Avatar';
import SchoolPopUp from "./SchoolPopUp";
import Logo from "./Logo";
import AreaMap from "./AreaMap";
import YearChart from "./YearChart";
import crossfilter from "crossfilter2";

const logoStyle = { borderRadius: 4, float: 'left', height: '30px', width: '30px', position: 'relative', left: '-15px' }

// Note: When adding new columns, if the column indexes change, then we need to review the "Show Column" hack, see index.css
const columns = [
  {
    name: "name",
    label: "Name",
    options: {
      filter: false,
      sort: false,
      sortDirection: "asc",
      viewColumns: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return (
          <div style={ {lineHeight: '30px'} }>
            {/* <Avatar aria-label="School Info" src={tableMeta.rowData[2]} className="avatar" style={logoStyle}></Avatar> */}
            {value}
          </div>
        );
      }
    }
  },
  // {
  //   name: "website",
  //   label: "Website",
  //   options: {
  //     filter: false,
  //     sort: false,
  //     display: "excluded"
  //   }
  // },
  // {
  //   name: "photo",
  //   label: "Photo",
  //   options: {
  //     filter: false,
  //     sort: false,
  //     display: "excluded"
  //   }
  // },
  {
    name: "key",
    label: "Key",
    options: {
      filter: false,
      sort: false,
      display: "excluded"
    }
  },
  // {
  //   name: "locations",
  //   label: "Locations",
  //   options: {
  //     display: true,
  //     filter: false,
  //     sort: false
  //   }
  // },
  // {
  //   name: "free",
  //   label: "Free",
  //   options: {
  //     filter: true,
  //     sort: false,
  //     display: "excluded"
  //   }
  // },
  // {
  //   name: "status",
  //   label: "Status",
  //   options: {
  //     filter: false,
  //     sort: true,
  //     customBodyRender: (value, tableMeta, updateValue) => {
  //       return value === 0 ? "-" : value;
  //     }
  //   }
  // },
  // {
  //   name: "dueBack",
  //   label: "Due Back",
  //   options: {
  //     filter: false,
  //     sort: true
  //   }
  // },
  // {
  //   name: "owner",
  //   label: "Owner",
  //   options: {
  //     filter: false,
  //     sort: true
  //   }
  // },
  // {
  //   name: "accreditationFilter",
  //   label: "Accreditation",
  //   options: {
  //     viewColumns: false,
  //     filter: true,
  //     display: false
  //   }
  // },
  // {
  //   name: "stipend",
  //   label: "Stipend",
  //   options: {
  //     sort: false,
  //     filter: false,
  //     display: false
  //   }
  // },
  // {
  //   name: "stipendFilter",
  //   label: "Stipend",
  //   options: {
  //     viewColumns: false,
  //     filter: true,
  //     display: false
  //   }
  // },
  // {
  //   name: "borrowingPeriod",
  //   label: "Borrowing Period",
  //   options: {
  //     sort: false,
  //     filter: false,
  //     display: false
  //   }
  // },
  // {
  //   name: "technologies",
  //   label: "Technologies",
  //   options: {
  //     sort: false,
  //     filter: false,
  //     display: false
  //   }
  // },
];


class SchoolTable extends Component {
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

  componentDidMount() {
    const img = new Image();
    img.src = "http://localhost:3000/images/logo-code-school-directory-full.png";
  }

  print_filter(f){
    //var f=eval(filter);
    if (typeof(f.length) != "undefined") {}else{}
    if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
    if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
    console.log("("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
  }

  getSiteByName(vanityName) {
    let matchingSite = this.state.sites.filter((site, index) => {return site.vanityName == vanityName} )
    return matchingSite[0].siteid;
  }

  changeSite(vanityName) {
    let siteID = this.getSiteByName(vanityName);
    this.setState({currentSiteID: siteID});
    this.calculateRain();
  }

  likeClick(school) {
    // Use localstorage to manage favourites.
    var favorites = JSON.parse(localStorage.getItem('csd-likes')) || [];

    var id = school.key;

    // return if target doesn't have an id (shouldn't happen)
    if (!id) return;

    let index = favorites.indexOf(id);
    // It doesn't exist yet, so add it.
    if (index === -1) {
      favorites.push(id);
      // Boolean values don't work in this context, so we use a string instead.
      school.liked = 'true';
    } else {
      // It already exists, so remove it.
      favorites.splice(index, 1);
      school.liked = 'false';
    }
    // Store array (converted to string) in local storage.
    localStorage.setItem('csd-likes', JSON.stringify(favorites));

    this.setState(prevState => {
      const schools = prevState.schools.map((item, j) => {
        if (item.key === school.key) {
          return school;
        } else {
          return item;
        }
      });

      return {
        schools,
      };
    });

    return;
  }

  toggleShowLiked() {
    // When likes are toggled, we hide all other schools in a separate list.
    // These lists are merged again to show all schools.
    this.setState(prevState => {
      if (prevState.hiddenSchools.length === 0) {
        const schools = prevState.schools.filter((item) => item.liked === "true");
        const hiddenSchools = prevState.schools.filter((item) => item.liked === "false");
        const showLiked = true;
        return {
          schools, hiddenSchools, showLiked
        };
      } else {
        const schools = prevState.schools.concat(prevState.hiddenSchools);
        const hiddenSchools = [];
        const showLiked = false;
        return {
          schools, hiddenSchools, showLiked
        };
      }
    });
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
    }.bind(this));
  }

  clearSitesRaindata(sitesData) {
    sitesData.forEach(function(row) {
      delete row.annualTotal;
    });
    return sitesData;
  }

  calculateRain() {
    if (this.state.rainData && this.state.sites) {

      // Clean data (skip sites that didn't have entries throughout the period)

      let rainData = this.state.rainData;
      let newSites = this.state.sites;

      newSites = this.clearSitesRaindata(newSites);

      // Calculate the annual rain
      rainData.forEach(function(row) {
        let siteID = parseInt(row['key']);
        let rainDate = new Date(row['name']);
        let rainAmount = row['rainfall(Mm)'];
        let currentYear = 2019;

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
      siteTotals.forEach(function(item) {
        let theYear = JSON.parse(item.key).year;
        let theMonth = JSON.parse(item.key).month;
        if (!monthlyData[theMonth]) {
          monthlyData[theMonth] = {name: theMonth};
        }
        monthlyData[theMonth][theYear] = item.value;
      });

      //console.log(monthlyData);
      this.setState({monthlyData : monthlyData});
    } else {
      console.log("data not loaded");
    }
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
      // Load user favorites from local storage if they exist.
      var favorites = JSON.parse(localStorage.getItem('csd-likes')) || [];
      let highlightRow = null;

      let i = 0;

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

    }.bind(this));
  }

  onPopUpClose = event => {
    this.setState({ popUpOpen: false });
  };

  render() {
    const options = {
      pagination: false,
      selectableRows: 'none',
      expandableRows: true,
      expandableRowsOnClick: true,
      print: false,
      download: false,
      onCellClick: (cellIndex, rowIndex) => {
        console.log("todo: expand/collapse " + cellIndex, rowIndex);

      },
      onRowClick: rowData => {
        // Set the url to the key for this opened school.
        // TODO: remove instance of magic number.
        const key = rowData[3];
        this.props.history.push(key, {schoolSelected: key});
      },
      textLabels: {
        body: {
          noMatch: this.state.isLoading ? (
            <Loader />
          ) : (
            <strong>No items to show. Try changing the filters you have set.</strong>
          )
        }
      },
      renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              <ExpandableRow school={this.state.sites[rowMeta.dataIndex]} likeClick={this.likeClick.bind(this)} />
            </TableCell>
          </TableRow>
        );

      },
      customToolbar: () => {
        return (
          <ToolbarExtra active={this.state.showLiked} onClick={this.toggleShowLiked.bind(this)} />
        );
      },
      setRowProps: (row) => {
        return {
          className: 'schoolRow',
        };
      }
    };

    const style = {
      margin: "16px"
    };

    return (
      <div id='tableContainer'>
        <Logo/>
        <br/>
        <AreaMap sitesData={this.state.sites} clickSite={this.changeSite.bind(this)}/>
        <br/>
        <YearChart monthlyData={this.state.monthlyData}/>
        {/* <SchoolPopUp
          open={this.state.popUpOpen}
          school={this.state.selectedSchool}
          onClose={this.onPopUpClose}
        />

        <MUIDataTable
          title={<AppTitleBar toggleLikesClick={this.toggleShowLiked.bind(this)} showLikesStatus={this.state.showLiked}/>}
          style={style}
          data={this.state.schools}
          columns={columns}
          options={options}
        /> */}
      </div>
    );
  }
}

export default SchoolTable;
