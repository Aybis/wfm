import React from 'react';

export default function ButtonSubmit({ type, value, moreClass }) {
  let classBackground;

  if (type === 'in') {
    classBackground = 'bg-gradient-to-br from-lightBlue-400 to-indigo-600';
  } else if (type === 'out') {
    classBackground = 'bg-gradient-to-br from-red-500 to-pink-600';
  } else {
    classBackground = 'bg-apps-primary';
  }

  return (
    <button
      className={[
        `p-3 text-lg font-semibold  w-full text-center rounded-lg text-white `,
        classBackground,
        moreClass,
      ].join(' ')}>
      {value}
    </button>
  );
}
