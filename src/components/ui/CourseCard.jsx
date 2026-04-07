import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} layout>
      <Card className="course-card-modern hover-lift">
        <div className="course-card-header">
          <span className="course-platform-badge">{course.platform}</span>
          <span className="course-duration">{course.duration}</span>
        </div>
        <h3 className="course-title-modern">{course.title}</h3>
        <p className="course-description-modern">{course.description}</p>
      </Card>
    </motion.div>
  );
};

export default CourseCard;
