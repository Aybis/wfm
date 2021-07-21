import React from 'react';

export default function LabelValueHorizontal({ label, value }) {
  return (
    <div className="flex">
      {/* Card Label */}
      <div className="w-1/3 ">
        <p className="text-apps-gray text-sm">{label}</p>
      </div>
      <div className="w-2/3">
        <h4 className="text-gray-800 text-left">{value}</h4>
      </div>
    </div>
  );
}
