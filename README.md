# 🧩 21-Day Habit Challenge App  
A simple and clean React application that helps users track their daily habits with a task-based system, motivational quotes, progress storage, and a responsive UI.

Built with **React + Vite**, this app allows users to open each day, edit tasks, add notes, save progress, and mark days complete. All progress is stored in `localStorage` so nothing is lost on refresh.

---

## 🚀 Features

### ✅ Habit Tracking
- 21-day program based on Atomic Habits principles  
- Each day includes tasks, notes, and a motivational quote  
- Tasks can be **added**, **edited**, or **removed**

### 🔒 Progressive Unlocking
- A day is **locked** until the previous day is marked complete  
- Completed days display a check icon  
- Locked days show a lock icon

### 💾 Auto-Save + Persistence
- All data is saved to **localStorage**
- Progress is restored instantly on page load

### 📱 Fully Responsive
- 3-column layout on desktop  
- 2-column layout on tablets  
- 1-column layout on mobile  
- TaskCard adapts beautifully to small screens

### 🎨 Clean UI Theme
- Custom color variables  
- Smooth hover animations  
- Soft shadows and modern layout  

---

## 📂 Project Structure

.
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Grid.jsx
│   │   ├── Hero.jsx
│   │   ├── Layout.jsx
│   │   ├── Modal.jsx
│   │   └── TaskCard.jsx
│   ├── fanta.css
│   ├── index.css
│   ├── main.jsx
│   └── utils/
│       └── index.js
└── vite.config.js

# Clone the repository
git clone https://github.com/your-username/your-repo-name.git

cd your-repo-name

# Install dependencies
npm install

# Start development server
npm run dev

Data Persistence

All updates are saved to localStorage using a simple structure:
{
  "day1": {
    "tasks": [...],
    "notes": "",
    "isComplete": true
  }
}