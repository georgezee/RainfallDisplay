import React from "react";

const Logo = props => {

  if (props.type === 'full') {
    let style = {width: 170, paddingLeft: 20, paddingTop: 20, paddingBottom: 20}
    return (
      <div id="menu-logo">
        <img
          src="./images/logo-hout-bay-rainfall-full.png"
          alt="Rainfall Network Menu"
          style={style}
        />
      </div>
    );
  } else {
    let style = {width: 160, display: 'block', paddingTop: 10};
    return (
      <div id="logo">
        <img
          src="./images/logo-hout-bay-rainfall-full.png"
          alt="the Rainfall Network logo"
          style={style}
        />
      </div>
    );
  }
};

export default Logo;
