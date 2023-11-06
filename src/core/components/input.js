import React from "react";

export function Input({ label, id, type, value, onChange }) {
  return (
    <div className="field">
      <label className="label" htmlFor="{id}">
        {label}
      </label>
      <div className="control">
        <input
          className="input"
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
