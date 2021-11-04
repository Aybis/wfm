import React from 'react';

export default function HeadingMobile({ heading, moreClass }) {
  return (
    <h1 className={`font-semibold text-gray-800 ${moreClass}`}>{heading}</h1>
  );
}
