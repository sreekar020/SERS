import React from 'react';
import { motion } from 'framer-motion';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-track">
      <motion.div 
        className="progress-bar-fill-dynamic"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

export default ProgressBar;
