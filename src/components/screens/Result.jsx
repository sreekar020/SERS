import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Container from '../layout/Container';
import SkillGap from '../ui/SkillGap';
import StudyPlan from '../ui/StudyPlan';
import CareerInsights from '../ui/CareerInsights';
import { resources } from '../../data/resources';
import { generatePDF } from '../../utils/pdfGenerator';
import './Result.css';

const Result = ({ userData, recommendations, onReset, onRegenerate }) => {
  const [expandedStep, setExpandedStep] = useState(0);

  const handleDownload = () => {
    generatePDF(userData, recommendations);
  };

  return (
    <Container className="fade-in dashboard-container">
      <div className="dashboard-grid">
        
        {/* LEFT SIDEBAR (30%) */}
        <aside className="sidebar-section">
          <Card className="profile-card">
            <div className="profile-avatar text-center">👤</div>
            <h2 className="profile-name text-center">{userData.name}</h2>
            <div className="text-center mt-2">
              <span className="profile-tag">{userData.interest}</span>
            </div>
            
            <div className="divider"></div>
            
            <div className="progress-section">
              <div className="progress-header">
                <span>Overall Progress</span>
                <span>15%</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: '15%' }}></div>
              </div>
              <p className="progress-step-indicator">Step 1 of 6</p>
            </div>

            <div className="actions-group">
              <Button onClick={handleDownload} className="w-full">
                Download PDF 📥
              </Button>
              <Button onClick={onRegenerate} variant="outline" className="w-full">
                Regenerate AI Plan 🔄
              </Button>
              <Button onClick={onReset} variant="outline" className="w-full reset-btn">
                Home 🏠
              </Button>
            </div>
          </Card>

          <Card className="ai-tips-card">
            <h3 className="card-title">💡 Learning Tips</h3>
            {recommendations.aiTips.map((tip, i) => (
              <div key={i} className="tip-item mb-2">
                <p className="small-text">{tip}</p>
              </div>
            ))}
          </Card>
        </aside>

        {/* RIGHT MAIN CONTENT (70%) */}
        <main className="main-content-section">
          <div className="section-wrapper">
            <div className="confidence-badge mb-2">
              AI Match Accuracy: {recommendations.confidence}%
            </div>
            <h1 className="hero-title">{userData.name}'s Dashboard</h1>
            <p className="section-subtitle">{recommendations.motivationalLine}</p>
          </div>

          <section className="section-wrapper">
            <h2 className="section-title-dash">🎯 Recommended Courses</h2>
            <div className="course-list">
              {recommendations.courses.map((course, i) => (
                <div key={i} className="course-card-dash card-anim">
                  <div className="course-header-row">
                    <div className="course-title-group">
                      <div className="course-provider">{course.provider}</div>
                      <h4 className="mb-1">{course.title}</h4>
                      <div className="course-meta-inline">
                        <span>⏱️ {course.duration}</span>
                        <span className="difficulty-badge">{course.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="course-ai-why mt-2">
                    <strong>AI Insight:</strong> {course.why}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section-wrapper">
            <h2 className="section-title-dash">🛣️ Multi-Step Roadmap</h2>
            <div className="roadmap-grid">
              {recommendations.roadmapSteps.map((step, index) => (
                <div key={index} className={`roadmap-step-premium ${expandedStep === index ? 'expanded' : ''} mb-4`}>
                  <div className="step-summary" onClick={() => setExpandedStep(expandedStep === index ? -1 : index)}>
                    <div className="step-num-bubble">{index + 1}</div>
                    <div className="step-info-summary">
                      <h4>{step.title}</h4>
                      <p className="step-desc small-text">{step.description}</p>
                    </div>
                    <span className="expand-icon">{expandedStep === index ? '▼' : '▶'}</span>
                  </div>
                  
                  {expandedStep === index && (
                    <div className="step-details fade-in">
                      <div className="skills-tags mt-2">
                        {step.skills.map((s, si) => <span key={si} className="skill-tag">{s}</span>)}
                      </div>
                      <div className="task-checklist mt-3">
                        {step.tasks.map((t, ti) => (
                          <div key={ti} className="task-item">
                            <span className="task-dot"></span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="section-wrapper">
            <StudyPlan plan={recommendations.studyPlan} />
          </section>

          <section className="section-wrapper">
            <SkillGap skills={recommendations.skillGap} />
          </section>
        </main>
      </div>

      {/* BOTTOM SECTION (Full Width Grid) */}
      <div className="bottom-section">
        <section>
          <h2 className="section-title-dash">📚 Core Resources</h2>
          <div className="resource-grid-dash">
            {resources.map(res => (
              <Card key={res.name} className="resource-card-dashboard">
                <div className="res-info">
                  <strong>{res.name}</strong>
                  <div className="res-type small-text">{res.type}</div>
                </div>
                <a href={res.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="res-btn-small">Link ↗</Button>
                </a>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <CareerInsights insights={recommendations.careerInsights} />
        </section>
      </div>
    </Container>
  );
};

export default Result;
