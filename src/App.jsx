import React, { useState, useEffect, useRef } from 'react';
import SprintForm from './components/SprintForm';
import SprintList from './components/SprintList';
import SprintSummary from './components/SprintSummary';
import TimerPage from './components/TimerPage';
import SprintNotes from './components/SprintNotes'; // ✅ New import
import './styles/app.css';

function App() {
  const [sprints, setSprints] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [view, setView] = useState('home'); // 'home', 'timer', 'notes'
  const [focusMode, setFocusMode] = useState(false);

  // ⏱ Clock logic
  useEffect(() => {
    const tick = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const addSprint = (sprint) => {
    setSprints([...sprints, sprint]);
  };

  const toggleComplete = (index) => {
    const updated = [...sprints];
    updated[index].completed = !updated[index].completed;
    setSprints(updated);
  };

  return (
    <div className={`App ${focusMode ? 'focus-mode' : ''}`}>
      <div className="main-layout">
        {/* 📌 Sidebar Navigation */}
        <div className="sidebar">
          <button onClick={() => setView('home')}>🏠 Home</button>
          <button onClick={() => setView('timer')}>⏱ Sprint Timer</button>
          <button onClick={() => setView('notes')}>📝 Sprint Notes</button>
          <button onClick={() => setFocusMode(!focusMode)}>
            {focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
          </button>
        </div>

        {/* 📄 Main Content */}
        <div className="content">
          {view === 'home' && (
            <>
              <div className="header">
                <h1>🎯 StudySprint</h1>
                <div className="clock">{formatTime(currentTime)}</div>
              </div>
              <SprintForm addSprint={addSprint} />
              <SprintList sprints={sprints} toggleComplete={toggleComplete} />
              <SprintSummary sprints={sprints} />
            </>
          )}

          {view === 'timer' && <TimerPage />}
          {view === 'notes' && <SprintNotes />} {/* ✅ New page */}
        </div>
      </div>
    </div>
  );
}

export default App;
