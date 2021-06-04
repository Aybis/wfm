/** @format */

import React from "react";
import propTypes from "prop-types";

export default function Label({ inputClassName, name, labelName }) {
  return (
    <label
      htmlFor={name}
      className={["text-sm font-semibold text-gray-400", inputClassName].join(
        " ",
      )}>
      {labelName}
    </label>
  );
}

Label.propTypes = {
  error: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
};
