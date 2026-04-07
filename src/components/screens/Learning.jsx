import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import TaskItem from '../ui/TaskItem';
import Container from '../layout/Container';
import './Learning.css';

const Learning = ({ roadmap, onBack }) => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize tasks from roadmap
    let formattedTasks = [];
    roadmap?.forEach((step) => {
      if (step.tasks) {
        step.tasks.forEach((taskDesc) => {
          formattedTasks.push({
            id: `${step.step}-${taskDesc}`,
            stepTitle: step.title,
            description: taskDesc,
            completed: false
          });
        });
      }
    });

    const savedProgress = localStorage.getItem('sers_learning_progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (parsed.length === formattedTasks.length || parsed.length > 0) {
        // Simple heuristic to load if shape matches mostly
        formattedTasks = formattedTasks.map(t => {
          const match = parsed.find(p => p.id === t.id);
          return match ? { ...t, completed: match.completed } : t;
        });
      }
    }

    setTasks(formattedTasks);
    calculateProgress(formattedTasks);
  }, [roadmap]);

  const calculateProgress = (currentTasks) => {
    if (currentTasks.length === 0) return setProgress(0);
    const completed = currentTasks.filter(t => t.completed).length;
    setProgress(Math.round((completed / currentTasks.length) * 100));
  };

  const handleToggleTask = (taskId) => {
    const newTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
    calculateProgress(newTasks);
    localStorage.setItem('sers_learning_progress', JSON.stringify(newTasks));
  };

  const clearProgress = () => {
    localStorage.removeItem('sers_learning_progress');
    const reset = tasks.map(t => ({ ...t, completed: false }));
    setTasks(reset);
    calculateProgress(reset);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="learning-container">
        <header className="learning-header">
          <Button variant="outline" onClick={onBack}>Back to Dashboard</Button>
          <div className="learning-header-right">
            <h2>Your Journey</h2>
            <Button variant="outline" onClick={clearProgress}>Reset Progress</Button>
          </div>
        </header>

        <section className="learning-progress-section">
          <h3>Progress Tracker</h3>
          <ProgressBar progress={progress} />
          <p className="progress-text">{progress}% Completed</p>
        </section>

        <section className="learning-task-list">
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={() => handleToggleTask(task.id)} 
            />
          ))}
          {tasks.length === 0 && <p>No tasks found in roadmap.</p>}
        </section>
      </Container>
    </motion.div>
  );
};

export default Learning;
