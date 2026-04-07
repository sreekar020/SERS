import React from 'react';
import { motion } from 'framer-motion';
import './RoadmapStep.css';

const RoadmapStep = ({ step, isLast }) => {
  return (
    <motion.div 
      className={`roadmap-timeline-item ${isLast ? 'is-last' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="roadmap-timeline-left">
        <div className="roadmap-step-circle">{step.step || '•'}</div>
        {!isLast && <div className="roadmap-timeline-line"></div>}
      </div>
      <div className="roadmap-timeline-content">
        <h4 className="roadmap-step-title">{step.title}</h4>
        <p className="roadmap-step-desc">{step.description}</p>
        {step.tasks && step.tasks.length > 0 && (
          <ul className="roadmap-tasks-list">
            {step.tasks.map((task, i) => (
              <li key={i} className="roadmap-task-item">
                <span className="task-check">●</span>
                {task}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default RoadmapStep;
