import React, { useState } from 'react';
import './App.css'; // Import the new styles!

function Signup({ onComplete }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError('Access denied. Please use a valid @gmail.com address.');
      return;
    }
    setError('');
    if (email.trim()) onComplete(email);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="glass-card slide-up" style={{ maxWidth: '450px', width: '90%', textAlign: 'center' }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎓</div>
        <h1 style={{ color: '#4E342E', marginBottom: '10px' }}>Aptitude Master</h1>
        <p style={{ color: '#8D6E63', marginBottom: '30px' }}>Log in with your Gmail to unlock your potential.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <input 
              type="email" 
              placeholder="example@gmail.com" 
              value={email} 
              onChange={(e) => { setEmail(e.target.value); setError(''); }} 
              style={{ 
                width: '100%', padding: '15px', fontSize: '16px', borderRadius: '8px', 
                border: error ? '2px solid #F44336' : '2px solid #D7CCC8', outline: 'none'
              }}
              required 
            />
            {error && <div style={{ color: '#F44336', fontSize: '12px', marginTop: '5px' }}>{error}</div>}
          </div>
          <button type="submit" className="btn-primary">Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;