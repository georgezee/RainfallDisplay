import React from "react";
import { Button, ButtonGroup } from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';


function TableFilterOptions(props) {
  const theme = useTheme();
  const secondaryLight = theme.palette.secondary.light;
  const buttonStyle = {
      backgroundColor: secondaryLight,
      color: "#ffffff"
  }
  const filterButtonStyle = { display: 'inline' };

  return (
    <div id="tableFilterOptions" style={filterButtonStyle}>
      <ButtonGroup variant="contained" style={buttonStyle} aria-label="contained secondary button group">
        <Button style={buttonStyle} onClick={props.handleClickDay}>By Day</Button>
        <Button style={buttonStyle} onClick={props.handleClickWeek}>Week</Button>
        <Button style={buttonStyle} onClick={props.handleClickMonth}>Month</Button>
      </ButtonGroup>
    </div>
  );
}

export default TableFilterOptions;
