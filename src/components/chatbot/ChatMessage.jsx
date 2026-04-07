import React from 'react';
import { motion } from 'framer-motion';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isAi = message.sender === 'ai';

  return (
    <motion.div 
      className={`chat-message-row ${isAi ? 'ai-row' : 'user-row'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isAi && <div className="chat-avatar bg-accent">🤖</div>}
      
      <div className={`chat-bubble ${isAi ? 'ai-bubble' : 'user-bubble'}`}>
        {message.text}
      </div>

      {!isAi && <div className="chat-avatar bg-surface">👤</div>}
    </motion.div>
  );
};

export default ChatMessage;
