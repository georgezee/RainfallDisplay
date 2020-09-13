import React from "react";
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Link from '@material-ui/core/Link';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';

class PageOtherResources extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: props.open };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const buttonStyle = {padding: 20}

    return (
      <div id="about">
        <Dialog
            fullScreen={fullScreen}
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogContent>
              <br/>
              <strong>Other rain data from the SW Cape</strong>
              <br/><br/>
              <CloudQueueIcon fontSize="large"/> <strong>Option 1:</strong>
              <p>The City of Cape Town supplies&nbsp;
              <Link href="https://resource.capetown.gov.za/documentcentre/Documents/City%20research%20reports%20and%20review/damlevels.pdf">data weekly on rainfall</Link>
              &nbsp;at certain sites around the city (e.g. Newlands, Wynberg, and Table Mountain),
              and dam levels for both major and minor dams supplying Cape Town.
              </p>

              <CloudQueueIcon fontSize="large"/> <strong>Option 2:</strong>
              <p>The website for the <Link href="http://www.csag.uct.ac.za/current-seasons-rainfall-in-cape-town/">UCT Climate System Analysis Group</Link>, and shows the sites for which rainfall has been recorded since (in most cases) 2014.
              By clicking on a pin on their site you will be able to see monthly rainfall data for that location in time series and other forms.</p>

            </DialogContent>
            <DialogActions className="aboutClose">
              <Button onClick={this.props.handleClose} color="primary" style={buttonStyle} autoFocus>
                <CloseIcon />
                Close
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    );
  }
};

PageOtherResources.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(PageOtherResources);

