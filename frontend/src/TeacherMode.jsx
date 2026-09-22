import React from 'react';
import './App.css';

function TeacherMode({ topic, data, onStartTest }) {
  // 🛡️ THE SAFETY NET: If 'data' is undefined (topic not filled out yet), show this instead of crashing!
  if (!data) {
    return (
      <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <div className="glass-card slide-up">
          <h2 style={{ fontSize: '32px', color: '#3E2723' }}>{topic}</h2>
          <div style={{ fontSize: '50px', margin: '20px 0' }}>🚧</div>
          <h3 style={{ color: '#795548' }}>Topic Under Construction</h3>
          <p style={{ color: '#5D4037', marginBottom: '30px' }}>
            We are currently writing the elaborate guide and adding images for this section. Check back soon!
          </p>
          <button onClick={() => window.location.reload()} className="btn-secondary">
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => window.location.reload()} className="btn-secondary" style={{ marginBottom: '20px' }}>
        ← Back
      </button>

      <div className="glass-card slide-up">
        <h2 style={{ fontSize: '32px', borderBottom: '2px solid #EFEBE9', paddingBottom: '10px', color: '#3E2723' }}>
          {topic}
        </h2>
        
        {/* Safely check if data.image exists before trying to render it */}
        {data.image && (
          <img 
            src={data.image} 
            alt={topic} 
            style={{ width: '100%', borderRadius: '12px', marginTop: '20px', objectFit: 'cover', maxHeight: '300px' }} 
          />
        )}

        <div style={{ marginTop: '30px', color: '#5D4037', lineHeight: '1.8', fontSize: '17px' }}>
          {/* Safely check if elaborate text exists, otherwise show a default message */}
          <div dangerouslySetInnerHTML={{ __html: data.elaborate || "<p>Guide details coming soon...</p>" }} />
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button 
            onClick={onStartTest} 
            className="btn-primary" 
            style={{ padding: '15px 40px', fontSize: '18px' }}
            disabled={!data.questions || data.questions.length === 0} // Disable if no questions exist
          >
            I'm Ready. Start the Test!
          </button>
          
          {(!data.questions || data.questions.length === 0) && (
            <p style={{ color: '#F44336', fontSize: '14px', marginTop: '10px' }}>
              No quiz questions available for this topic yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherMode;