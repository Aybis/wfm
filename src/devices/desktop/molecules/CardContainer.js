import { motion } from 'framer-motion';
import React from 'react';
import CardHeading from './CardHeading';

export default function CardContainer({
  moreClass,
  heading,
  subheading,
  children,
  isAnimate,
}) {
  return (
    <motion.div
      initial={
        isAnimate && {
          width: 0,
          opacity: 0,
        }
      }
      animate={isAnimate && { width: '100%', opacity: 1 }}
      transition={isAnimate && { duration: 0.5 }}
      className={['relative my-4 p-4', moreClass].join(' ')}>
      <div className="relative container mx-auto p-4">
        <CardHeading heading={heading} subheading={subheading} />
        {children}
      </div>
    </motion.div>
  );
}
