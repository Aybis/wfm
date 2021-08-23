import React from 'react';

export default function Heading({ heading }) {
  return (
    <h1 className="text-2xl text-gray-800 font-bold tracking-wide">
      {heading}
    </h1>
  );
}
