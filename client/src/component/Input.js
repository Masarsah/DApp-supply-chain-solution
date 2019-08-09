import React from "react";

const Input = ({ name, lable, ...rest }) => {
  return (
    <div className="form-group">
      <div>{lable}</div>
      <input {...rest} name={name} className="form-control" />
    </div>
  );
};

export default Input;