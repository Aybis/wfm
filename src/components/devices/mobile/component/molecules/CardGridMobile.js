import React from 'react';
import CardHeadingMobile from './CardHeadingMobile';

export default function CardGridMobile({
  children,
  isHeading = false,
  heading,
  subheading,
  col,
}) {
  return (
    <div className="relative my-4">
      {isHeading && (
        <CardHeadingMobile heading={heading} subheading={subheading} />
      )}
      <div className={`grid grid-cols-${col} gap-4 mt-2`}>{children}</div>
    </div>
  );
}
