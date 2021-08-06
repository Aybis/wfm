import React from 'react';
import { isDesktop } from 'react-device-detect';
import { Link } from 'react-router-dom';

export default function CardHeadingDesktop({
  heading,
  description,
  link = null,
}) {
  let customClass = isDesktop ? 'text-center' : 'text-left';

  return (
    <div className="flex justify-between items-center mb-8">
      <div className={`w-full ${customClass}`}>
        <h1
          className={`text-2xl lg:text-4xl text-gray-700 font-semibold mb-2 `}>
          {heading}
        </h1>
        <h2 className="text-gray-500 text-sm lg:text-lg">{description}</h2>
      </div>

      {link && (
        <Link
          to={link}
          className="text-sm text-apps-gray hover:text-apps-primary transition-all duration-300 ease-in-out">
          View more
        </Link>
      )}
    </div>
  );
}
