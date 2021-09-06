import React from 'react';
import propTypes from 'prop-types';

export default function Input({
  value,
  error,
  name,
  onChange,
  placeholder,
  labelName,
  inputClassName,
  type,
  onKeyDown,
  onKeyUp,
}) {
  return (
    <div className="flex flex-col gap-2 mb-2 lg:mb-4">
      {labelName && (
        <label
          htmlFor={name}
          className={[
            'text-sm lg:text-base font-medium tracking-wide',
            error ? 'text-red-600' : 'text-gray-500',
          ].join(' ')}>
          {labelName}
        </label>
      )}
      <input
        name={name}
        onChange={onChange}
        type={type}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        autoComplete="off"
        className={[
          'border-2 focus:outline-none transition-all duration-300 ease-in-out border-gray-200 p-3 font-regular rounded-lg  placeholder-gray-300 lg:text-lg',
          error
            ? 'border-red-600 text-red-600'
            : 'focus:border-gray-800 text-gray-800',
          inputClassName,
        ].join(' ')}
        value={value}
        placeholder={placeholder ?? 'Please change placeholder'}
      />
      <span className="text-apps-red pt-2">{error}</span>
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
  type: propTypes.oneOf(['text', 'email', 'password', 'number']),
};
