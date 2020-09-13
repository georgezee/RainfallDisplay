import React from "react";
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Link from '@material-ui/core/Link';
//import Alert from '@material-ui/lab/Alert';
import Logo from './Logo';

class PageAbout extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: props.open };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;
    const imgStyle = {width: 180, paddingLeft: 10, paddingRight: 10, top: 15, position: 'relative'}
    const cbImgStyle = {width: 160, float: 'right', padding: 10 }
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
              <Logo/>
              <br/>
              <br/>
              {/* <p>This is a community site where residents of Hout Bay share the rainfall data they have collected in their gardens for the benefit of interested parties.</p> */}

              <strong>Who are we?</strong>
              <p>We are simply a group of amateur weather-watchers from the community of Hout Bay, Cape Town,
              who collect rainfall in our gardens and wish to share the data with anyone interested!</p>

              <strong>Interpreting the rainfall data</strong>
              {/* <Alert severity="warning">Please note re the data on this site!</Alert> */}
              <div severity="warning">Please note re the data on this site!</div>

              <ol>
                <li>Although the rainfall data collectors do their best to collect the data appropriately,
                  no guarantees for accuracy can be made regarding the data presented here - it is meant for interest use only.</li>

                <li>Observations are generally made between 6 and 8am. All rainfall measured at that time is
                  then recorded as falling on the previous day.</li>

                <li>Data Collectors may upload their data at different intervals, so rain data may not be up to date.</li>
              </ol>

              If you wish to contact us, or would like to join our team of rainfall data collectors, email us at
              &nbsp;<Link href="mailto:houtbayrain@gmail.com">houtbayrain@gmail.com</Link>


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

PageAbout.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(PageAbout);

