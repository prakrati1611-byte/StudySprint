import React, { useState } from 'react';

const SprintForm = ({ addSprint }) => {
  const [subject, setSubject] = useState('');
  const [unit, setUnit] = useState('');
  const [time, setTime] = useState('');
  const [emotion, setEmotion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !unit || !time) return;
    addSprint({ subject, unit, time, emotion, completed: false });
    setSubject('');
    setUnit('');
    setTime('');
    setEmotion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>📚 Plan Your Sprint</h2>
      <input
        placeholder="What subject calls to you today?"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <input
        placeholder="Which unit whispers for attention?"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <input
        placeholder="How long will you dwell in it?"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <input
        placeholder="What emotion colors this sprint?"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
      />
      <button type="submit">Add Sprint</button>
    </form>
  );
};

export default SprintForm;
