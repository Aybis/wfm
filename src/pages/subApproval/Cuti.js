import CardFilterMonthAndYear from 'components/devices/mobile/component/molecules/CardFilterMonthAndYear';
import React from 'react';

export default function Cuti() {
  const handlerOnChange = (type, value) => {
    console.log(value);
  };
  return (
    <div>
      {/* Start Filter Month And Year  */}
      <CardFilterMonthAndYear handlerOnChange={handlerOnChange} />
      {/* End Filter Month And Year  */}
      <div className="relative text-xl font-semibold text-indigo-600 my-4">
        Cuti page
      </div>
    </div>
  );
}
