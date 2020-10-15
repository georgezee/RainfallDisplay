import React from "react";
import { Button, ButtonGroup } from '@material-ui/core';

function TableFilterOptions(props) {
  const style = { display: 'inline' }
  return (
    <div id="tableFilterOptions" style={style}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button onClick={() => alert("Day placeholder")}>By Day</Button>
        <Button onClick={() => alert("Week placeholder")}>Week</Button>
        <Button onClick={() => alert("Month placeholder")}>Month</Button>
      </ButtonGroup>
    </div>
  );
}

export default TableFilterOptions;
