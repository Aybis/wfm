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
    <motion.div className={['relative my-4 p-4', moreClass].join(' ')}>
      <div className="relative container mx-auto p-4">
        <CardHeading heading={heading} subheading={subheading} />
        {children}
      </div>
    </motion.div>
  );
}
