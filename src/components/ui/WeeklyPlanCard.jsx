import React from 'react';
import Card from './Card';
import './WeeklyPlanCard.css';

const WeeklyPlanCard = ({ week, focus }) => {
  return (
    <Card className="weekly-plan-card-modern glass-effect mt-2">
      <div className="weekly-plan-week">{week}</div>
      <h4 className="weekly-plan-focus">{focus}</h4>
    </Card>
  );
};

export default WeeklyPlanCard;
