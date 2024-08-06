import React, { useId } from "react";

const Input = ({ type = "text", label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="">
      {label && (
        <label htmlFor="id" className="">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
};
export default React.forwardRef(Input);
