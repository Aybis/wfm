import React from 'react';

export default function HeadingMobile({ heading, moreClass }) {
  return (
    <h1
      className={`text-lg font-semibold text-gray-700 tracking-wide ${moreClass}`}>
      {heading}
    </h1>
  );
}
