/** @format */

import React from 'react';
import propTypes from 'prop-types';

export default function Label({ inputClassName, name, labelName }) {
  return (
    <label
      htmlFor={name}
      className={['text-sm font-medium text-gray-500', inputClassName].join(
        ' ',
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
