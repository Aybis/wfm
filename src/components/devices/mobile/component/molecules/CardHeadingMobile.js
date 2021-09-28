import React from 'react';
import HeadingMobile from '../atoms/HeadingMobile';
import SubHeadingMobile from '../atoms/SubHeadingMobile';

export default function CardHeadingMobile({
  heading,
  subheading,
  navigation,
  link,
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      <div className="flex flex-col">
        <HeadingMobile heading={heading} />
        <SubHeadingMobile subheading={subheading} />
      </div>
      {navigation && (
        <a href={link} className="cursor-pointer">
          Download
        </a>
      )}
    </div>
  );
}
