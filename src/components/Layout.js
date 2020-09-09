import React from 'react';
import Paper from '@material-ui/core/Paper';
//import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import AppTitleBar from "./AppTitleBar";

// const useStyles = makeStyles({
//   root: {
//     flexGrow: 1,
//     maxWidth: 500,
//   },
// });

export default function Layout() {
  const classes = {root: 'this'}; //useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <TabPanel/>
    </Paper>
  );
}