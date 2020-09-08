import React, { Component } from "react";
import fire from "./firebase";
import MUIDataTable from "mui-datatables";
import Loader from "./Loader";
import AppTitleBar from "./AppTitleBar";
import ToolbarExtra from "./ToolbarExtra";
import Logo from "./Logo";

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

  {
    name: "key",
    label: "Key",
    options: {
      filter: false,
      sort: false,
      display: "excluded"
    }
  },

];


class RainTable extends Component {

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

  shouldComponentUpdate() {
    if (this.props.data) {
      return false;
    } else {
      return true;
    }

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



  onPopUpClose = event => {
    this.setState({ popUpOpen: false });
  };

  render() {
    const options = {
      pagination: false,
      selectableRows: 'none',
      expandableRows: false,
      expandableRowsOnClick: false,
      print: false,
      download: false,
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



console.log("rendering rain table");

    return (
      <div id='tableContainer'>
        <Logo/>
        <br/>

        <MUIDataTable
          title={<AppTitleBar/>}
          style={this.props.style}
          data={this.props.data}
          columns={this.props.columns}
          options={this.props.options}
        />
      </div>
    );
  }
}

export default RainTable;
