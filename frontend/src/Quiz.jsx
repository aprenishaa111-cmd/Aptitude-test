import React, { useState } from 'react';
import './App.css';

function Quiz({ topic, questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) return <div>No questions available.</div>;

  const currentQ = questions[currentIndex];

  const handleSelect = (option) => {
    if (selectedAnswer) return; // Prevent clicking again

    setSelectedAnswer(option);
    if (option === currentQ.answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null); // Reset for next question
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-card slide-up" style={{ textAlign: 'center', maxWidth: '500px' }}>
          <h2 style={{ fontSize: '36px', color: '#4E342E' }}>Test Complete!</h2>
          <div style={{ fontSize: '60px', margin: '20px 0' }}>
            {score >= questions.length / 2 ? '🎉' : '📚'}
          </div>
          <h3 style={{ fontSize: '24px', color: '#795548' }}>Your Score: {score} / {questions.length}</h3>
          <button onClick={onFinish} className="btn-primary" style={{ marginTop: '30px' }}>Return to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto' }}>
      <div className="glass-card slide-up" key={currentIndex}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8D6E63', fontWeight: 'bold', marginBottom: '20px' }}>
          <span>{topic}</span>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
        
        <h3 style={{ fontSize: '22px', color: '#3E2723', marginBottom: '30px' }}>{currentQ.q}</h3>
        
        <div>
          {currentQ.options.map((option, index) => {
            // Logic to determine button colors after selection
            let btnClass = "quiz-option";
            if (selectedAnswer) {
              if (option === currentQ.answer) btnClass += " correct";
              else if (option === selectedAnswer) btnClass += " wrong";
            }

            return (
              <button 
                key={index} 
                className={btnClass}
                onClick={() => handleSelect(option)}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* The Explanation Box reveals after an answer is chosen */}
        {selectedAnswer && (
          <div className="fade-in" style={{ 
            marginTop: '25px', padding: '20px', borderRadius: '10px', 
            backgroundColor: selectedAnswer === currentQ.answer ? '#E8F5E9' : '#FFEBEE',
            borderLeft: selectedAnswer === currentQ.answer ? '5px solid #4CAF50' : '5px solid #F44336'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: selectedAnswer === currentQ.answer ? '#2E7D32' : '#C62828' }}>
              {selectedAnswer === currentQ.answer ? 'Correct!' : 'Incorrect!'}
            </h4>
            <p style={{ margin: 0, color: '#4E342E', lineHeight: '1.6' }}>
              {currentQ.explanation || `The correct answer is ${currentQ.answer}.`}
            </p>
          </div>
        )}

        {selectedAnswer && (
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button onClick={handleNext} className="btn-primary">
              {currentIndex + 1 === questions.length ? 'See Results' : 'Next Question ➔'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;