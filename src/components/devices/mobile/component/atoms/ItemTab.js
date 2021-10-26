import React from 'react';

export default function ItemTab({
  value,
  name,
  label,
  handlerOnClick,
  isActive,
  setState,
}) {
  return (
    <input
      type="button"
      onClick={(event) => handlerOnClick(event)}
      name={name}
      value={value}
      className={`${
        isActive
          ? 'bg-white text-warmGray-800 shadow-lg'
          : 'bg-warmGray-100 text-warmGray-400'
      } py-2 px-4 rounded-lg font-medium text-sm `}
      value={label}
    />
  );
}
