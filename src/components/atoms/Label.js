/** @format */

import React from 'react';
import propTypes from 'prop-types';

export default function Label({ inputClassName, name, labelName }) {
  return (
    <label
      htmlFor={name}
      className={['text-sm font-semibold text-apps-text', inputClassName].join(
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
