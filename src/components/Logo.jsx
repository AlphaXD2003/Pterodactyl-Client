import React from "react";

const Logo = ({ width = "100px", src }) => {
  return (
    <div>
      <img width={width} src={src} />
    </div>
  );
};

export default Logo;
