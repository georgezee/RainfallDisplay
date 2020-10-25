import React, { Component } from "react";
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CodeIcon from '@material-ui/icons/Code';
import EditIcon from '@material-ui/icons/Edit';
import MailIcon from '@material-ui/icons/Mail';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import SchoolIcon from '@material-ui/icons/School';
import Logo from "./Logo";
import PageAbout from "./PageAbout";
import PageOtherResources from "./PageOtherResources";

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class SideBar extends Component {

  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
    aboutOpen: false,
    aboutDataOpen: false
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  toggleAbout = (open) => () => {
    this.setState({
      aboutOpen: open,
    });
  };

  toggleAboutData = (open) => () => {
    this.setState({
      aboutDataOpen: open,
    });
  };

  render() {

    const classes = {
      list: "list"
    };

    const buttonClass = (this.props.showLikesStatus === true) ?  "buttonDefault" : "buttonHighlight";

    const sideList = (
      <div id="menuList" className={classes.list}>
        <List>
          <Logo type='full' />
          <ListItem button key="about" onClick={this.toggleAbout(true)}>
              <ListItemIcon><SchoolIcon /></ListItemIcon>
              <ListItemText primary="About this Project" />
          </ListItem>
          <ListItem button key="datainfo" onClick={this.toggleAboutData(true)} className={buttonClass}>
              <ListItemIcon><CollectionsBookmark /></ListItemIcon>
              <ListItemText primary="Other Resources" />
          </ListItem>
          <Link href="https://github.com/georgezee/RainfallDisplay">
            <ListItem button key="github">
              <ListItemIcon><CodeIcon /></ListItemIcon>
              <ListItemText primary="Get the Code!" />
            </ListItem>
          </Link>
          <Link href="mailto:houtbayrain@gmail.com">
            <ListItem button key="join">
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="Join" />
            </ListItem>
          </Link>
          <Divider />
          <Link href="mailto:houtbayrain@gmail.com">
            <ListItem button key="contact-us">
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </Link>
          <Divider />
        </List>
      </div>
    );

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns="menuList"
          aria-haspopup="true"
          onClick={this.toggleDrawer('left', true)}
          className="menuIcon"
        >
          <MenuIcon />
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
        <PageAbout open={this.state.aboutOpen} handleClose={this.toggleAbout(false)} />
        <PageOtherResources open={this.state.aboutDataOpen} handleClose={this.toggleAboutData(false)} />
      </div>
    );
  }
}

export default SideBar;
