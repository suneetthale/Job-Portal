import React from "react";
import "./Radio.css";

function Radio({
  id,
  label,
  onChange,
  value,
  layout,
  className,
  required,
  optionlist,
}) {
  return (
    <section className={className}>
      {label && (
        <div className="mb-3 text-sm">
          {label}
          {required && <span className="required-label">*</span>}
        </div>
      )}
      <section className="flex items-center gap-6">
        {optionlist && optionlist?.length
          ? optionlist.map((option) => (
              <section
                key={option.id}
                className={`flex ${
                  layout === "INLINE" ? "inline mr-4" : "block py-1"
                }`}
              >
                <input
                  id={option.id}
                  type="radio"
                  name={id}
                  className="w-5 h-5"
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e, id)}
                />
                <span
                  className="inline ml-1 text-sm place-holder-color"
                  htmlFor={option.id}
                >
                  {option.label}
                </span>
              </section>
            ))
          : null}
      </section>
    </section>
  );
}

export default Radio;
