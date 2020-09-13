import React from "react";

import SideBar from "./SideBar";

function AppTitleBar(props) {
  const style = { position: 'relative', left: -20 }
  return (
    <div id="appTitleBar" style={style}>
      <SideBar showLikesStatus={props.showLikesStatus} toggleLikesClick={props.toggleLikesClick}/>
    </div>
  );
}

export default AppTitleBar;
