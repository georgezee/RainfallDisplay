import React from "react";
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Link from '@material-ui/core/Link';
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

