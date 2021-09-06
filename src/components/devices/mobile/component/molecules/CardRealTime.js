import convertDate from 'helpers/hooks/convertDate';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function CardRealTime({ moreClass }) {
  const [didMount, setDidMount] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setDidMount(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      setDidMount(false);
      clearInterval(interval);
    };
  }, []);
  if (!didMount) {
    return null;
  }
  return (
    <div
      className={['flex justify-center items-center w-full', moreClass].join(
        ' ',
      )}>
      <h1 className="text-xl font-medium text-white">
        {convertDate('fullTime', time)}
        <small> {convertDate('hours', time) > 12 ? 'PM' : 'AM'}</small>
      </h1>
    </div>
  );
}
