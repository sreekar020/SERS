import React from 'react';
import { motion } from 'framer-motion';
import './TaskItem.css';

const TaskItem = ({ task, onToggle }) => {
  return (
    <motion.div 
      className={`task-item-card ${task.completed ? 'completed' : ''}`}
      whileHover={{ scale: 1.01 }}
      layout
    >
      <label className="task-item-label">
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={onToggle}
          className="task-checkbox"
        />
        <div className="task-content">
          <span className="task-step-title">{task.stepTitle}</span>
          <p className="task-description">{task.description}</p>
        </div>
      </label>
    </motion.div>
  );
};

export default TaskItem;
