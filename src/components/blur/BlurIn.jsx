import './blurIn.scss';
import { motion, useInView } from 'framer-motion';
import * as React from 'react';

const BlurIn = ({ title }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      className='title'
    >
      <h1 className='title'>{title}</h1>
    </motion.div>
  );
};

export default BlurIn;
