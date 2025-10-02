import React from 'react';

const SprintSummary = ({ sprints }) => {
  const total = sprints.length;
  const completed = sprints.filter(s => s.completed).length;
  const pending = total - completed;

  return (
    <div>
      <h2>📈 Sprint Summary</h2>
      <p>Total: {total}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {pending}</p>
    </div>
  );
};

export default SprintSummary;