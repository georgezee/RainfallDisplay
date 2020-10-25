import React from "react";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from '../theme/muiTheme';
import ReactGA from 'react-ga';
import DataLoader from './DataLoader';

import { createBrowserHistory } from 'history';

if (process.env.REACT_APP_ANALYTICS_KEY) {
  // Initalize analytics.
  // For debugging can add: { testMode: true }
  ReactGA.initialize(process.env.REACT_APP_ANALYTICS_KEY);
  ReactGA.pageview('/home');
} else {
  // Setup dummy functions so that no errors are triggered.
  console.log('Analytics disabled: no key.');
  ReactGA.event = function () {};
  ReactGA.pageview = function () {};
}


// Use history to assign urls to specific app states.
const history = createBrowserHistory();
// Set the current location to the homepage.

const App = () => (
  <MuiThemeProvider theme={muiTheme}>
    <div>
      <Grid container>
        <Grid item xs={12}>
          <DataLoader history={history} />
        </Grid>
        <Grid item xs={3} />
      </Grid>
      <Footer />
    </div>
  </MuiThemeProvider>
);

export default App;
