import React from 'react';

export default function LabelValueHorizontal({ label, value, classValue }) {
  return (
    <div className="flex">
      {/* Card Label */}
      <div className="w-1/3 ">
        <p className="text-gray-500 text-sm">{label}</p>
      </div>
      <div className="w-2/3">
        <h4
          className={[
            'text-gray-800 text-left text-sm font-medium lg:text-base',
            classValue,
          ].join(' ')}>
          : {value}
        </h4>
      </div>
    </div>
  );
}
