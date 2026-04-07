import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import './CareerCard.css';

const CareerCard = ({ role, salary, companies }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} layout>
      <Card className="career-card-modern hover-lift">
        <div className="career-card-role-title">{role}</div>
        <div className="career-card-salary-badge">Salary / Yr: {salary}</div>
        <p className="career-card-companies"><strong>Top Companies:</strong> {companies}</p>
      </Card>
    </motion.div>
  );
};

export default CareerCard;
