import React from "react";

const ImagePhoto = props => {
  return (
    <div>
      <img width="300"
          src={props.url}
        />
    </div>
  );
};

export default ImagePhoto;
