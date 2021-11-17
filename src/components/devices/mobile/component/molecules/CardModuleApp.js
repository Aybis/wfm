import React from 'react';

export default function CardModuleApp() {
  return (
    <div className="relative mt-4 hidden">
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((item) => (
          <div
            key={Math.random()}
            className="flex bg-white h-10 rounded-md"></div>
        ))}
      </div>
    </div>
  );
}
