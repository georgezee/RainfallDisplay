import React from "react";

const Logo = props => {

  let logoID = 'logo';
  let style = {width: 160, display: 'block', paddingTop: 10};
  if (props.type === 'full') {
    logoID = 'menu-logo';
    style = {width: 170, paddingLeft: 20, paddingTop: 20, paddingBottom: 20}
  } else if (props.type === 'inline') {
    style = {width: 170, paddingLeft: 20, paddingTop: 20, paddingBottom: 20}
    logoID = 'inline-logo';
  }

  return (
    <div id={logoID}>
      <img
        src="./images/logo-hout-bay-rainfall-full.png"
        alt="the Rainfall Network logo"
        style={style}
      />
    </div>
  );

};

export default Logo;
