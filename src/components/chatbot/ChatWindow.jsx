import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import { getChatResponse } from '../../services/aiService';
import './ChatWindow.css';

const ChatWindow = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ai', text: "Hello! I'm your AI Learning Mentor. How can I help you with your learning path, skills, or career goals today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { id: Date.now().toString(), sender: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getChatResponse(userMsg.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: "I'm sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      { id: Date.now().toString(), sender: 'ai', text: "Chat cleared. What else can I assist you with regarding your learning and career?" }
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="chat-window-container"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-header-avatar">🤖</div>
              <div>
                <h3>AI Mentor</h3>
                <span className="chat-status">Online</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-icon-btn" onClick={clearChat} title="Clear Chat">🗑️</button>
              <button className="chat-icon-btn" onClick={onClose} title="Close">✕</button>
            </div>
          </div>

          <div className="chat-messages-area">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="chat-typing-indicator"
              >
                AI is thinking<span className="dot-anim">...</span>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your learning path..."
              disabled={isLoading}
              className="chat-input-field"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className="chat-send-btn"
            >
              ➤
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatWindow;
