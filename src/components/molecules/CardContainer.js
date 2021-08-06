import React from 'react';

export default function CardContainer({
  customClassRoot,
  customClass,
  children,
}) {
  return (
    <div className={['relative p-2 lg:p-8 mt-8', customClassRoot].join(' ')}>
      <div className={['container mx-auto', customClass].join(' ')}>
        {children}
      </div>
    </div>
  );
}
