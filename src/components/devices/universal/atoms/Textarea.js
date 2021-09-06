import React from 'react';
import propTypes from 'prop-types';

export default function Textarea({
  value,
  error,
  name,
  onChange,
  placeholder,
  labelName,
  inputClassName,
}) {
  return (
    <div className="flex flex-col mb-2">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            'text-sm font-medium mb-2',
            error ? 'text-apps-red' : 'text-gray-500',
          ].join(' ')}>
          {labelName}
        </label>
      )}
      <textarea
        name={name}
        onChange={onChange}
        rows="3"
        className={[
          'bg-white focus:outline-none border-2 border-gray-200 w-full p-3 rounded-lg font-medium transition-all duration-300 ease-in-out',
          error
            ? 'border-red-500 text-red-500'
            : 'focus:border-gray-800 text-gray-700',
          inputClassName,
        ].join(' ')}
        value={value}
        placeholder={placeholder ?? 'Please change placeholder'}></textarea>
      <span className="text-red-500 pt-2">{error}</span>
    </div>
  );
}

Textarea.propTypes = {
  error: propTypes.string,
  name: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  placeholder: propTypes.string,
  labelName: propTypes.string,
  inputClassName: propTypes.string,
};
