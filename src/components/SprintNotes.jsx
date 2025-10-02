// src/components/SprintNotes.jsx
import React, { useState } from 'react';

const SprintNotes = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="notes-page">
      <h2>📝 Sprint Notes</h2>
      <textarea
        placeholder="Write your sprint notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>
  );
};

export default SprintNotes;
