import React from 'react';
import { motion } from 'framer-motion';
import './ChatButton.css';

const ChatButton = ({ onClick, isOpen }) => {
  return (
    <motion.button
      className="chat-floating-btn"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {isOpen ? '✕' : '💬'}
    </motion.button>
  );
};

export default ChatButton;
