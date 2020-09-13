import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import Loader from "./Loader";
import AppTitleBar from "./AppTitleBar";
import Logo from "./Logo";

// // Note: When adding new columns, if the column indexes change, then we need to review the "Show Column" hack, see index.css
// const columns = [
//   {
//     name: "name",
//     label: "Name",
//     options: {
//       filter: false,
//       sort: false,
//       sortDirection: "asc",
//       viewColumns: false,
//       customBodyRender: (value, tableMeta, updateValue) => {
//         return (
//           <div style={ {lineHeight: '30px'} }>
//             {/* <Avatar aria-label="School Info" src={tableMeta.rowData[2]} className="avatar" style={logoStyle}></Avatar> */}
//             {value}
//           </div>
//         );
//       }
//     }
//   },

//   {
//     name: "key",
//     label: "Key",
//     options: {
//       filter: false,
//       sort: false,
//       display: "excluded"
//     }
//   },

// ];

// // Note: When adding new columns, if the column indexes change, then we need to review the "Show Column" hack, see index.css
// const columns = [
//   {
//     name: "name",
//     label: "Name",
//     options: {
//       filter: false,
//       sort: false,
//       sortDirection: "asc",
//       viewColumns: false,
//       customBodyRender: (value, tableMeta, updateValue) => {
//         return (
//           <div style={ {lineHeight: '30px'} }>
//             {/* <Avatar aria-label="School Info" src={tableMeta.rowData[2]} className="avatar" style={logoStyle}></Avatar> */}
//             {value}
//           </div>
//         );
//       }
//     }
//   },
//   // {
//   //   name: "website",
//   //   label: "Website",
//   //   options: {
//   //     filter: false,
//   //     sort: false,
//   //     display: "excluded"
//   //   }
//   // },
//   // {
//   //   name: "photo",
//   //   label: "Photo",
//   //   options: {
//   //     filter: false,
//   //     sort: false,
//   //     display: "excluded"
//   //   }
//   // },
//   {
//     name: "key",
//     label: "Key",
//     options: {
//       filter: false,
//       sort: false,
//       display: "excluded"
//     }
//   },
//   // {
//   //   name: "locations",
//   //   label: "Locations",
//   //   options: {
//   //     display: true,
//   //     filter: false,
//   //     sort: false
//   //   }
//   // },
//   // {
//   //   name: "free",
//   //   label: "Free",
//   //   options: {
//   //     filter: true,
//   //     sort: false,
//   //     display: "excluded"
//   //   }
//   // },
//   // {
//   //   name: "status",
//   //   label: "Status",
//   //   options: {
//   //     filter: false,
//   //     sort: true,
//   //     customBodyRender: (value, tableMeta, updateValue) => {
//   //       return value === 0 ? "-" : value;
//   //     }
//   //   }
//   // },
//   // {
//   //   name: "dueBack",
//   //   label: "Due Back",
//   //   options: {
//   //     filter: false,
//   //     sort: true
//   //   }
//   // },
//   // {
//   //   name: "owner",
//   //   label: "Owner",
//   //   options: {
//   //     filter: false,
//   //     sort: true
//   //   }
//   // },
//   // {
//   //   name: "accreditationFilter",
//   //   label: "Accreditation",
//   //   options: {
//   //     viewColumns: false,
//   //     filter: true,
//   //     display: false
//   //   }
//   // },
//   // {
//   //   name: "stipend",
//   //   label: "Stipend",
//   //   options: {
//   //     sort: false,
//   //     filter: false,
//   //     display: false
//   //   }
//   // },
//   // {
//   //   name: "stipendFilter",
//   //   label: "Stipend",
//   //   options: {
//   //     viewColumns: false,
//   //     filter: true,
//   //     display: false
//   //   }
//   // },
//   // {
//   //   name: "borrowingPeriod",
//   //   label: "Borrowing Period",
//   //   options: {
//   //     sort: false,
//   //     filter: false,
//   //     display: false
//   //   }
//   // },
//   // {
//   //   name: "technologies",
//   //   label: "Technologies",
//   //   options: {
//   //     sort: false,
//   //     filter: false,
//   //     display: false
//   //   }
//   // },
// ];


class RainTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      hiddenSchools: [],
      isLoading: true,
      popUpOpen: false,
      selectedSchool: {},
      currentSiteID : 112
     };
  }

  // TODO: Determine correct flow for table updating.
  shouldComponentUpdate() {
    if (this.props.data) {
      return false;
    } else {
      return true;
    }

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

      setRowProps: (row) => {
        return {
          className: 'schoolRow',
        };
      }
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
          options={options}
        />
      </div>
    );
  }
}

export default RainTable;
