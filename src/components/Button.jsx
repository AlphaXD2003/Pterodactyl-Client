import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`${className} ${bgColor} ${textColor}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
