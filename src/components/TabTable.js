
import React, { Component } from "react";
import AppTitleBar from "./AppTitleBar";
import Loader from "./Loader";
import RainTable from './RainTable';

class TabTable extends Component {

  constructor(props) {
    super(props);

     this.state = {
      filteredData: [],
      filteredColumns: []
     };
  }

  componentDidMount() {
  }

  render() {

    //  this.setState({
    //    filteredData: this.props.tableData,
    //    filteredColumns: this.props.dayColumns
    //   });

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
          noMatch: this.props.isLoading ? (
            <Loader />
          ) : (
            <strong>No items to show. Try changing the filters you have set.</strong>
          )
        }
      },

      // customToolbar: () => {
      //   return (
      //     <ToolbarExtra active={props.showLiked} onClick={this.toggleShowLiked.bind(this)} />
      //   );
      // },
      setRowProps: (row) => {
        return {
          className: 'schoolRow',
        };
      }
    };

    return (
      <div>
        {/* <RainTable
            title={<AppTitleBar/>}
            data={this.state.filteredData}
            columns={this.state.filteredColumns}
            options={options}
          /> */}
          <RainTable
            title={<AppTitleBar/>}
            data={this.props.tableData}
            columns={this.props.dayColumns}
            options={options}
          />
      </div>
    );


  }
}

export default TabTable;
