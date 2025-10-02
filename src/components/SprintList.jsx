import React from 'react';

const SprintList = ({ sprints, toggleComplete }) => {
  return (
    <div>
      <h2>🧾 Your Sprints</h2>
      {sprints.map((sprint, index) => (
        <div
          key={index}
          style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: sprint.completed ? '#f0f0f0' : '#fff',
            textDecoration: sprint.completed ? 'line-through' : 'none',
          }}
        >
          <p>
            <strong>{sprint.subject}</strong> — Unit {sprint.unit} — {sprint.time}
          </p>
          {sprint.emotion && <p>💭 <em>{sprint.emotion}</em></p>}
          <button onClick={() => toggleComplete(index)}>
            {sprint.completed ? 'Undo' : 'Mark Done'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SprintList;
