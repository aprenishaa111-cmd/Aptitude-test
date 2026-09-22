import React from 'react';

function Dashboard({ onSelectTopic }) {
  // These must match the keys in your COURSE_CATALOG exactly
  const topics = [
    "Logical Reasoning",
    "Quantitative Aptitude",
    "Verbal Ability",
    "Coding"
  ];

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Dashboard</h2>
      <p>Choose a topic to study with your virtual teacher:</p>
      
      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
        {topics.map((topic) => (
          <button 
            key={topic} 
            onClick={() => onSelectTopic(topic)}
            style={{ padding: '15px 30px', fontSize: '16px', cursor: 'pointer' }}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;