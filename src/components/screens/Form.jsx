import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Container from '../layout/Container';
import './Form.css'; // Add import for styles if needed

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    interest: 'programming',
    level: 'beginner',
    goal: 'job',
    commitment: '2-4'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert("Please enter your name");
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="fade-in">
        <div className="text-center">
          <h1 className="section-title">Personalize Your Path</h1>
          <p className="section-subtitle">Tell us about yourself to let our AI design your roadmap.</p>
          
          <Card className="form-card">
            <form onSubmit={handleSubmit} className="stack-form">
              <Input
                label="What's your name?"
                id="name"
                placeholder="e.g. Sreekar"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Select
                label="Primary Interest"
                id="interest"
                options={[
                  { value: 'programming', label: 'Programming & Web Dev' },
                  { value: 'ai', label: 'Artificial Intelligence & ML' },
                  { value: 'cybersecurity', label: 'Cybersecurity Specialist' },
                  { value: 'cloud', label: 'Cloud Solutions Architecture' },
                  { value: 'devops', label: 'DevOps & Site Reliability' },
                  { value: 'data', label: 'Data Science & Analytics' },
                  { value: 'blockchain', label: 'Blockchain Development' },
                  { value: 'uiux', label: 'UI/UX Design & Research' }
                ]}
                value={formData.interest}
                onChange={handleChange}
              />

              <div className="form-row">
                <Select
                  label="Current Level"
                  id="level"
                  options={[
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' }
                  ]}
                  value={formData.level}
                  onChange={handleChange}
                />

                <Select
                  label="Daily Commitment"
                  id="commitment"
                  options={[
                    { value: '1', label: '1 Hour / Day' },
                    { value: '2-4', label: '2-4 Hours / Day' },
                    { value: '5+', label: '5+ Hours / Day' }
                  ]}
                  value={formData.commitment}
                  onChange={handleChange}
                />
              </div>

              <Select
                label="Primary Goal"
                id="goal"
                options={[
                  { value: 'job', label: 'Get a Job / Career Transition' },
                  { value: 'skill', label: 'Master a Specific Skill' },
                  { value: 'exam', label: 'Pass a Certification / Exam' }
                ]}
                value={formData.goal}
                onChange={handleChange}
              />

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" className="w-full mt-4 btn-premium">
                  Generate Detailed Roadmap
                </Button>
              </motion.div>
            </form>
          </Card>
        </div>
      </Container>
    </motion.div>
  );
};

export default Form;
