import React from "react";
import { Link} from "@material-ui/core";
import License from "./License";

const Footer = () => {
  return (
    <div id="footer">
      <Link href="https://github.com/georgezee/RainfallDisplay">
        &lt; View the source on Github /&gt;
      </Link>
      <License />
    </div>
  );
};

export default Footer;
