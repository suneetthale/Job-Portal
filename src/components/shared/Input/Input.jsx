import React from "react";
import "./Input.css";

function Input({
  id,
  type = "text",
  className,
  label,
  errorMsg,
  value,
  placeholder,
  required,
  onChange,
}) {
  return (
    <section className={`${className ? className : ""}`}>
      {label && (
        <div
          className={`mb-1 font-color text-sm ${
            label === "null" ? "invisible" : ""
          }`}
        >
          {label}
          {required && <span className="required-label">*</span>}
        </div>
      )}
      <input
        type={type}
        className={`w-full text-sm custom-input ${label ? "" : "mt-4"}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e, id)}
      ></input>
      {errorMsg && errorMsg.length ? (
        <div className={`mt-1 text-sm float-left error-color`}>{errorMsg}</div>
      ) : null}
    </section>
  );
}

export default Input;
