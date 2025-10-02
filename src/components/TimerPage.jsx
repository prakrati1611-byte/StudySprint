import React, { useState, useEffect, useRef } from 'react';
import '../styles/app.css';

const TimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // default 1 hour
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [sprintName, setSprintName] = useState('');
  const [quote, setQuote] = useState("“Focus is a muscle. Train it.”");
  const alarmRef = useRef(null);

  const quotes = [
    "“Focus is a muscle. Train it.”",
    "“Small steps every day lead to big results.”",
    "“You don’t need more time, you need more focus.”",
    "“Discipline is choosing between what you want now and what you want most.”",
    "“Your future self will thank you.”"
  ];

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      if (timeLeft === 60 * 60) {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(random);
      }
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setCompleted(true);
      playAlarm();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const playAlarm = () => {
    alarmRef.current = new Audio('/alarm_15.mp3');
    alarmRef.current.play();
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setCompleted(false);
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeEdit = (value) => {
    const parts = value.split(':').map(p => parseInt(p, 10));
    if (
      parts.length === 3 &&
      parts.every(n => !isNaN(n)) &&
      parts[0] >= 0 && parts[0] < 24 &&
      parts[1] >= 0 && parts[1] < 60 &&
      parts[2] >= 0 && parts[2] < 60
    ) {
      const [h, m, s] = parts;
      const totalSeconds = h * 3600 + m * 60 + s;
      setTimeLeft(totalSeconds);
      setCompleted(false);
    }
  };

  return (
    <div className="timer-page">
      <input
        type="text"
        className="sprint-title"
        placeholder="Name your sprint..."
        value={sprintName}
        onChange={(e) => setSprintName(e.target.value)}
        disabled={isRunning}
      />

      <input
        type="text"
        className={`timer-display editable ${isRunning ? 'running' : ''}`}
        value={formatTime(timeLeft)}
        onChange={(e) => handleTimeEdit(e.target.value)}
        disabled={isRunning}
      />

      <div className="timer-controls">
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      {isRunning && (
        <p className="progress-text">
          {Math.floor(((60 * 60 - timeLeft) / (60 * 60)) * 100)}% complete
        </p>
      )}

      <p className="quote">{quote}</p>

      {completed && (
        <p className="completion-message">🎉 Sprint complete! Take a breath.</p>
      )}
    </div>
  );
};

export default TimerPage;
