import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Container from '../layout/Container';
import CourseCard from '../ui/CourseCard';
import RoadmapStep from '../ui/RoadmapStep';
import SkillBadge from '../ui/SkillBadge';
import WeeklyPlanCard from '../ui/WeeklyPlanCard';
import CareerCard from '../ui/CareerCard';
import './Result.css';

const Result = ({ userData, recommendations, onReset, onRegenerate, onStartLearning }) => {
  const { courses, roadmap, weeklyPlan, skills, careers } = recommendations || {};
  const roadmapRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (!roadmapRef.current) return;
    
    // Create canvas
    const canvas = await html2canvas(roadmapRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0F172A' // match dark theme bg
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Calculate aspect ratio for A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${userData?.name || 'My'}_Learning_Roadmap.pdf`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="fade-in dashboard-container">
        <div className="dashboard-grid">
          
          <aside className="sidebar-section">
            <Card className="profile-card modern-glass-card shadow-premium">
              <div className="profile-name-modern text-center">{userData.name}</div>
              <div className="text-center mt-2">
                <span className="profile-tag-modern">{userData.interest}</span>
              </div>
              
              <div className="divider-modern"></div>
              
              <div className="actions-group-modern">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={onStartLearning} className="w-full btn-premium">
                    Start Learning
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={handleDownloadPDF} variant="outline" className="w-full reset-btn-modern">
                    Download Roadmap (PDF)
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={onRegenerate} variant="outline" className="w-full reset-btn-modern">
                    Regenerate AI Plan
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button onClick={onReset} variant="outline" className="w-full reset-btn-modern">
                    Home
                  </Button>
                </motion.div>
              </div>
            </Card>

            <Card className="ai-tips-card modern-glass-card mt-4">
              <h3 className="card-title-modern">Career Insight</h3>
              <p className="small-text-modern">
                Based on your {userData.level} level, we've filtered out entry-level noise to focus on high-impact skills for {userData.goal}.
              </p>
            </Card>
          </aside>

          <main className="main-content-section">
            <div className="hero-section-modern">
              <div className="confidence-badge-premium mb-2">
                Gemini 2.5 Flash Engine Connected
              </div>
              <h1 className="hero-title-modern">Dashboard</h1>
            </div>

            <section className="dashboard-block">
              <h2 className="section-title-premium">Recommended Courses</h2>
              <div className="course-grid-modern">
                {courses?.map((course, i) => (
                  <CourseCard key={i} course={course} />
                ))}
              </div>
            </section>

            <section className="dashboard-block" ref={roadmapRef} style={{ padding: '20px', borderRadius: '16px' }}>
              <h2 className="section-title-premium" data-html2canvas-ignore>Multi-Step Roadmap</h2>
              <Card className="roadmap-card-modern">
                <div className="roadmap-container-modern">
                  {roadmap?.map((step, i) => (
                    <RoadmapStep key={i} step={step} isLast={i === roadmap.length - 1} />
                  ))}
                </div>
              </Card>
            </section>

            <section className="dashboard-block">
              <h2 className="section-title-premium">Weekly Study Plan</h2>
              <div className="weekly-grid-modern">
                {weeklyPlan?.map((item, i) => (
                  <WeeklyPlanCard key={i} week={item.week} focus={item.focus} />
                ))}
              </div>
            </section>

            <section className="dashboard-block">
              <h2 className="section-title-premium">Skill Analysis</h2>
              <Card className="skills-card-modern">
                <div className="skills-flex-modern">
                  {skills?.map((skill, i) => (
                    <SkillBadge key={i} name={skill.name} status={skill.status} />
                  ))}
                </div>
              </Card>
            </section>
          </main>
        </div>

        <div className="bottom-section-modern">
          <section className="dashboard-block">
            <h2 className="section-title-premium">Career Insights</h2>
            <div className="career-grid-modern">
              {careers?.map((career, i) => (
                <CareerCard key={i} {...career} />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </motion.div>
  );
};

export default Result;
