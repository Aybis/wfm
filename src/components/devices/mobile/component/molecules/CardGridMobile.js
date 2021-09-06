import React from 'react';
import CardHeadingMobile from './CardHeadingMobile';

export default function CardGridMobile({
  children,
  isHeading = false,
  heading,
  subheading,
}) {
  return (
    <div className="relative my-4">
      {isHeading && (
        <CardHeadingMobile heading={heading} subheading={subheading} />
      )}
      <div className="grid grid-cols-1 gap-4 mt-2">{children}</div>
    </div>
  );
}
