# SERS: Smart E-Learning Recommendation System 🚀

SERS is a premium, AI-simulated dashboard that helps students and professionals build personalized learning roadmaps. It features a modern, glassmorphic UI, expanded domain support (Cybersecurity, Cloud, DevOps, Blockchain, UI/UX), and automated PDF generation.

## 🎯 Key Features
- **Redesigned 2-Column Dashboard**: Premium layout with 40px spacing system.
- **AI Career Architect**: Simulated intelligence to generate courses and roadmaps.
- **Skill Gap Analysis**: Identify missing tools for your target role.
- **Weekly Study Plans**: Structured 4-week learning schedule.
- **PDF Export**: Download your personalized roadmap for offline access.

---

## 🛠️ Setup & Installation

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 2. Clone/Download the Project
Download the repository to your local machine and navigate into the `sers` directory:
```bash
cd sers
```

### 3. Install Dependencies
Install all required libraries, including `react`, `vite`, and `jspdf`:
```bash
npm install
```

### 4. Run the Development Server
Launch the application locally to view the UI and test the AI flow:
```bash
npm run dev
```
Once the server is running, open your browser and visit:
`http://localhost:5173`

### 5. Build for Production (Optional)
To create an optimized production bundle:
```bash
npm run build
```
The output will be available in the `dist/` directory.

---

## 📁 Project Structure
- `src/components/screens/`: Dashboard and Form logic.
- `src/components/ui/`: Reusable premium components (Card, Button, etc.).
- `src/utils/`: AI Recommender and PDF Generator logic.
- `src/data/`: Course and resource databases.
- `src/styles/`: Global variables and glassmorphism styling.

---

## 🎤 Presentation Line
*"This system doesn’t just recommend courses; it builds a complete learning ecosystem including roadmaps, skill analysis, and career insights."*
