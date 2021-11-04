import React, { Children, useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/solid';

export default function Select({
  labelName,
  id,
  name,
  value,
  className,
  children,
  onClick,
  handlerChange = null,
  fallbackText,
  border = true,
}) {
  const [toggle, settoggle] = useState(() => false);
  const selectWrapper = useRef(null);

  const items = Children.toArray(children);

  function toggleSelect() {
    settoggle(() => !toggle);
  }

  function clickOutside(event) {
    if (selectWrapper && !selectWrapper.current.contains(event.target))
      settoggle(false);
  }

  useEffect(() => {
    window.addEventListener('mousedown', clickOutside);
    return () => {
      window.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const selected = items.find((item) => item.props.value === value);

  return (
    <div className="flex flex-col gap-2 mb-2 lg:mb-4 z-20">
      {labelName && (
        <label
          htmlFor=""
          className="text-gray-500 text-sm font-medium tracking-wide">
          {labelName}
        </label>
      )}
      <div className="relative" ref={selectWrapper} onClick={toggleSelect}>
        <div
          className={[
            'flex justify-between rounded-md cursor-pointer bg-white focus:border-gray-800  transition-all duration-200 border-2 px-4 py-2 pr-4 w-full text-gray-800 capitalize',
            toggle
              ? 'border-gray-800'
              : `${border ? 'border-transparent' : 'border-gray-200'}`,
            className,
          ].join(' ')}>
          <span className={value === '' ? 'text-gray-600' : 'text-gray-800'}>
            {selected?.props.children ?? fallbackText}
          </span>
          <div className="transition-all duration-200 border-apps-gray border-opacity-40 border-b-2 border-r-2 transform rotate-45 translate-y-1 w-2 h-2 "></div>
        </div>
        <div
          className={[
            'absolute left-0 bg-white border-2 border-gray-400 py-2 w-full rounded-md mt-2 max-h-48 overflow-auto shadow-lg capitalize',
            toggle ? '' : 'hidden',
          ].join(' ')}>
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`group flex justify-between cursor-pointer px-4 py-2 bg-white transition-all duration-200 hover:bg-apps-primary mx-1 rounded-md hover:text-white capitalize ${
                  selected.props.value === item.props.value
                    ? 'text-gray-800 font-medium'
                    : 'text-gray-800 text-opacity-40'
                }`}
                onClick={() => {
                  onClick({ target: { name: name, value: item.props.value } });
                  handlerChange && handlerChange(name, item.props.value, item);
                }}>
                {item.props.children}{' '}
                {selected.props.value === item.props.value && (
                  <CheckIcon className="text-apps-primary h-5 w-5 group-hover:text-white" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Select.propTypes = {
  onClick: propTypes.func.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  name: propTypes.string.isRequired,
  fallbackText: propTypes.string,

  labelName: propTypes.string,
  id: propTypes.string,
  className: propTypes.string,
};
