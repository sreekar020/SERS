import { courses } from '../data/courses';

export const getRecommendations = (interest, level, goal, commitment = '2-4') => {
  const category = courses[interest] || courses.programming;
  const levelData = category[level] || category.beginner;
  
  const selected = [...levelData].sort(() => 0.5 - Math.random()).slice(0, 3).map(c => ({
    ...c,
    difficulty: level.charAt(0).toUpperCase() + level.slice(1),
    why: `Matches your ${level} background and helps with your ${goal} goal.`
  }));
  
  const confidence = Math.floor(Math.random() * (95 - 80 + 1)) + 80;
  
  // Adjust roadmap detail based on commitment
  const roadmapSteps = [
    { title: "Foundation & Setup", description: `Master the basic configuration and toolsets for ${interest}.`, skills: ["Environment Setup", "CORE Syntax"], tasks: ["Install necessary IDEs", "Configure local dev server", "Hello World project"] },
    { title: "Deep Dive into Core Concepts", description: `Learn the underlying mechanics and theoretical foundations of ${interest}.`, skills: ["Algorithm logic", "Architecture"], tasks: [commitment === '1' ? "Read 1 technical blog" : "Read 3 technical blogs", "Build a small CLI/utility"] },
    { title: "Intermediate Specialization", description: "Focus on industry-relevant frameworks and libraries.", skills: ["Framework mastery", "API Integration"], tasks: ["Integrate 2 external APIs", "Build a feature-rich mini-app", "Implement error handling"] },
    { title: "Project: Modern Application", description: "Construct a full-scale project following best practices.", skills: ["System Design", "UI/UX implementation"], tasks: ["Design database schema", "Connect frontend to backend", "Deploy to Production"] },
    { title: "Advanced Mastery & Scaling", description: "Optimize performance and learn advanced patterns.", skills: ["Performance Tuning", "Security"], tasks: ["Run performance audits", "Implement Auth logic", "Optimize asset loading"] },
    { title: "Career & Readiness", description: `Final polish for your ${goal} goal in ${interest}.`, skills: ["Technical Interviewing", "Portfolio Building"], tasks: ["Update LinkedIn/Resume", "Draft 5 project case studies", "3 Mock interview rounds"] }
  ];

  const skillGap = [
    { name: interest === 'programming' ? 'JavaScript' : interest === 'ai' ? 'Python' : interest === 'data' ? 'SQL' : 'Core Tools', status: 'Good', icon: '✔' },
    { name: 'Advanced Architecture', status: 'Needs Practice', icon: '⚠' },
    { name: 'Cloud Deployment', status: 'Missing', icon: '❌' }
  ];

  const studyPlan = [
    { week: "Week 1", title: "Core Fundamentals", topics: ["Introduction to the ecosystem", "Syntax overview", "Basic exercises"] },
    { week: "Week 2", title: "Logic & Architecture", topics: ["Data structures exploration", "Flow control mastery", "First mini-project"] },
    { week: "Week 3", title: "Project Development", topics: ["Building main portfolio app", "Troubleshooting bugs", "Code reviews"] },
    { week: "Week 4", title: "Portfolio & Readiness", topics: ["Deployment and optimization", "Resource final review", "Next steps"] }
  ];

  const careerInsights = {
    roles: interest === 'programming' ? 'Frontend, Backend, Fullstack' : interest === 'ai' ? 'ML Engineer, Data Scientist' : interest === 'cybersecurity' ? 'Security Architect' : 'Specialist Role',
    salary: interest === 'programming' ? '₹6–15 LPA' : interest === 'ai' ? '₹8–20 LPA' : '₹7–18 LPA',
    companies: "Top Tier Tech Companies, Innovative Startups"
  };

  const aiTips = [
    "Focus on project-based learning for maximum retention.",
    "Contribute to Open Source to build real-world credibility.",
    "Build your portfolio as early as Step 2."
  ];

  return {
    courses: selected,
    confidence,
    roadmapSteps,
    skillGap,
    studyPlan,
    careerInsights,
    aiTips,
    motivationalLine: "You're ahead of 80% learners. Your AI Career Architect 🚀"
  };
};
