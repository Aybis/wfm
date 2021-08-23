import React from 'react';
import Heading from '../atoms/Heading';
import SubHeading from '../atoms/SubHeading';

export default function CardHeading({ heading, subheading }) {
  return (
    <div className="flex flex-col gap-1">
      <Heading heading={heading} />
      <SubHeading subheading={subheading} />
    </div>
  );
}
