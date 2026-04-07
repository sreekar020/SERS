import React from 'react';
import './SkillBadge.css';

const SkillBadge = ({ name, status }) => {
  const getStatusClass = (s) => {
    const low = s?.toLowerCase();
    if (low === 'good') return 'skill-badge-good';
    if (low === 'moderate') return 'skill-badge-moderate';
    if (low === 'weak') return 'skill-badge-weak';
    return 'skill-badge-default';
  };

  return (
    <div className={`skill-badge-premium ${getStatusClass(status)}`}>
      <span className="skill-badge-name">{name}</span>
      <span className="skill-badge-status-dot"></span>
      <span className="skill-badge-status-text">{status}</span>
    </div>
  );
};

export default SkillBadge;
