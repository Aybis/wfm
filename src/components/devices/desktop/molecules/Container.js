import React from 'react';

export default function Container({ children }) {
  return (
    <div className="relative my-4 w-full bg-white">
      <div className="container mx-auto p-4">{children}</div>
    </div>
  );
}
