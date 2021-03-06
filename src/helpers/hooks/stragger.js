import React, { useContext } from 'react';

import { IntersectionContext } from '../intersection-observer';
import { MotionBox } from '../motion-box';

export const StaggerContext = React.createContext({
  stagger: false,
});

export const StaggerWrap = ({
  children,
  delayOrder,
  delay = 0,
  childrenDelay = 0.5,
  ...rest
}) => {
  const { inView } = useContext(IntersectionContext);

  // const offset = 0.4;

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // when: "beforeChildren",
        // delay: delayOrder ? delayOrder * offset : delay,
        delay,
        staggerChildren: childrenDelay,
      },
    },
  };

  return (
    <StaggerContext.Provider value={{ stagger: true }}>
      <MotionBox
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        exit="hidden"
        variants={variants}
        {...rest}>
        {children}
      </MotionBox>
    </StaggerContext.Provider>
  );
};
