import React from "react";
import "./Button.css";
import { buttonTypes } from "../../../constants/constants";

function Button({
  btnType,
  className,
  disabled = false,
  children,
  onClick,
  title,
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={(e) => (onClick ? onClick(e) : null)}
      className={`px-4 py-2 cust-btn ${
        btnType === buttonTypes.primary ? "btn-primary" : "btn-secondary"
      } ${className} uppercase rounded-md`}
    >
      {children}
    </button>
  );
}

export default Button;
