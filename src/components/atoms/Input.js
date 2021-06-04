/** @format */

import React from "react";
import propTypes from "prop-types";

export default function Input({
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
    <div className="flex flex-col gap-2 mb-4">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            "text-sm font-semibold ",
            error ? "text-red-500" : "text-gray-600",
          ].join(" ")}>
          {labelName}
        </label>
      )}
      <input
        name={name}
        onChange={onChange}
        type={type}
        autoComplete="off"
        className={[
          "bg-white focus:outline-none border w-full p-2 rounded-md ",
          error
            ? "border-red-500 text-red-500"
            : "focus:border-teal-500 border-gray-300 text-gray-600",
          inputClassName,
        ].join(" ")}
        value={value}
        placeholder={placeholder ?? "Please change placeholder"}
      />
      <span className="text-red-500 pt-2">{error}</span>
    </div>
  );
}

Input.propTypes = {
  error: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
  type: propTypes.oneOf(["text", "email", "password", "number"]),
};
