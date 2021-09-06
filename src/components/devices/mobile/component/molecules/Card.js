import React from 'react';

export default function Card({ addClass, children }) {
  return (
    <div className={['my-4 relative', addClass].join(' ')}>{children}</div>
  );
}
