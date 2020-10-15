
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
          />
      </div>
    );


  }
}

export default TabTable;
