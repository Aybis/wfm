/** @format */

import React from "react";
import propTypes from "prop-types";

export default function Textarea({
  value,
  error,
  name,
  onChange,
  placeholder,
  labelName,
  inputClassName,
  type,
}) {
  return (
    <div className="flex flex-col mb-2">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            "text-sm font-semibold mb-2",
            error ? "text-red-500" : "text-gray-400",
          ].join(" ")}>
          {labelName}
        </label>
      )}
      <textarea
        name={name}
        onChange={onChange}
        type={type}
        rows="3"
        className={[
          "bg-white focus:outline-none border w-full p-3 rounded font-medium",
          error
            ? "border-red-500 text-red-500"
            : "focus:border-blue-500 border-gray-300 text-gray-800",
          inputClassName,
        ].join(" ")}
        value={value}
        placeholder={placeholder ?? "Please change placeholder"}></textarea>
      <span className="text-red-500 pt-2">{error}</span>
    </div>
  );
}

Textarea.propTypes = {
  error: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
  type: propTypes.oneOf(["text", "email", "password", "number"]),
};
