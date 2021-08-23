import React from 'react';

export default function CardGridDekstop({ col, children }) {
  return (
    <div className={`grid grid-cols-${col} gap-4 mt-20 rounded-lg p-4`}>
      {children}
    </div>
  );
}
