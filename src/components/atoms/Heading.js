import React from 'react';
import { Link } from 'react-router-dom';

const Heading = ({ heading, url = '/', title = '' }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-gray-700 font-semibold text-xl lg:text-2xl">
        {heading}
      </h2>
      <Link
        aria-label={title ? title : '/url-name'}
        to={url}
        className="font-medium text-gray-400"
        style={{ fontSize: '0.6rem' }}>
        {title}
      </Link>
    </div>
  );
};

export default Heading;
