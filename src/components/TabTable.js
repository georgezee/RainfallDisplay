
import React, { Component } from "react";
import AppTitleBar from "./AppTitleBar";
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

    return (
      <div>
          <RainTable
            title={<AppTitleBar/>}
            data={this.props.tableData}
            dataMax={this.props.tableMax}
            header={this.props.tableHeader}
            columns={this.props.dayColumns}
            handleClickDay={this.props.handleClickDay}
            handleClickWeek={this.props.handleClickWeek}
            handleClickMonth={this.props.handleClickMonth}
          />
      </div>
    );


  }
}

export default TabTable;
