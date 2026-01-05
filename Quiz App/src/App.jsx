import axios from 'axios'
import { useEffect, useRef, useState, useCallback } from 'react'
import shuffleArray from 'shuffle-array';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [questionMarks, setQuestionMarks] = useState(0);
  const [result, setResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const input = useRef([]);

  // Reset timer for next question
  const resetTimer = useCallback(() => {
    setTimeLeft(30);
    setTimerActive(true);
  }, []);

  // Move to next question
  const nextQuestion = useCallback(() => {
    setIndex(prev => prev + 1);
    setSelectedAnswer('');
    setShowFeedback(false);
    resetTimer();
    // Clear radio buttons
    input.current.forEach(inp => {
      if (inp) inp.checked = false;
    });
  }, [resetTimer]);

  // Handle time up
  const handleTimeUp = useCallback(() => {
    setShowFeedback(true);
    setUserAnswers(prev => [...prev, { 
      question: data[index].question.text,
      selected: 'Time Up',
      correct: data[index].correctAnswer,
      isCorrect: false
    }]);
    setTimeout(() => {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        nextQuestion();
      }
    }, 2000);
  }, [data, index, nextQuestion]);

  // Fetch Data
  useEffect(() => {
    axios('https://the-trivia-api.com/v2/questions')
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setTimerActive(true);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0 && !result && !showFeedback) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, result, showFeedback, handleTimeUp]);

  // Restart quiz
  const restartQuiz = () => {
    setIndex(0);
    setQuestionMarks(0);
    setResult(false);
    setSelectedAnswer('');
    setShowFeedback(false);
    setUserAnswers([]);
    setTimeLeft(30);
    setTimerActive(true);
    // Clear radio buttons
    input.current.forEach(inp => {
      if (inp) inp.checked = false;
    });
  };

  // Retry loading data
  const retryLoad = () => {
    setError(false);
    setLoading(true);
    axios('https://the-trivia-api.com/v2/questions')
      .then(res => {
        setData(res.data);
        setTimerActive(true);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Next Question Handler
  const changeIndex = () => {
    if (!selectedAnswer) {
      alert('Please select an answer before proceeding!');
      return;
    }

    const isCorrect = selectedAnswer === data[index].correctAnswer;
    
    // Add marks
    setQuestionMarks(prev => isCorrect ? prev + 10 : prev);
    
    // Store user answer
    setUserAnswers(prev => [...prev, {
      question: data[index].question.text,
      selected: selectedAnswer,
      correct: data[index].correctAnswer,
      isCorrect: isCorrect
    }]);

    // Show feedback
    setShowFeedback(true);
    setTimerActive(false);

    // Auto proceed after showing feedback
    setTimeout(() => {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        nextQuestion();
      }
    }, 2000);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🧠 Quiz Master</h1>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 className="loading-text">Loading your quiz...</h2>
        </div>
      )}

      {error && (
        <div className="error-container">
          <h2 className="error-text">❌ Oops! Something went wrong</h2>
          <p>Please check your internet connection and try again.</p>
          <button className="retry-button" onClick={retryLoad}>
            🔄 Try Again
          </button>
        </div>
      )}

      {result && (
        <div className="result-container">
          <h1 className="result-title">🎉 Quiz Complete!</h1>
          <div className="result-score">{questionMarks}</div>
          <p className="result-message">
            {questionMarks >= 70 ? "Excellent work! 🌟" : 
             questionMarks >= 50 ? "Good job! 👍" : 
             "Keep practicing! 💪"}
          </p>
          <p>You scored {questionMarks} out of {data ? data.length * 10 : 0} points</p>
          
          <div className="result-summary">
            <h3>📊 Answer Summary:</h3>
            <div className="answers-review">
              {userAnswers.map((answer, i) => (
                <div key={i} className={`answer-review ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="review-question">Q{i + 1}: {answer.question}</div>
                  <div className="review-answers">
                    <div className="your-answer">Your answer: {answer.selected}</div>
                    {!answer.isCorrect && (
                      <div className="correct-answer">Correct answer: {answer.correct}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="restart-button" onClick={restartQuiz}>
            🔄 Take Quiz Again
          </button>
        </div>
      )}

      {data && !result && (
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="score-display">
              Score: {questionMarks}
            </div>
            <div className="timer-display">
              ⏰ {timeLeft}s
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((index + 1) / data.length) * 100}%` }}
            ></div>
          </div>

          <div className="question-header">
            <div className="question-number">
              Question {index + 1} of {data.length}
            </div>
            <div className="question-text">
              {data[index].question.text}
            </div>
          </div>

          {showFeedback && (
            <div className={`feedback ${selectedAnswer === data[index].correctAnswer ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {selectedAnswer === data[index].correctAnswer ? (
                <div>✅ Correct! Well done!</div>
              ) : (
                <div>
                  ❌ {selectedAnswer === 'Time Up' ? 'Time\'s up!' : 'Incorrect!'} 
                  <br />The correct answer is: <strong>{data[index].correctAnswer}</strong>
                </div>
              )}
            </div>
          )}

          <div className="options-container">
            {shuffleArray([
              ...data[index].incorrectAnswers,
              data[index].correctAnswer
            ]).map((item, i) => (
              <div 
                key={`option${i}`} 
                className={`option-item ${selectedAnswer === item ? 'selected' : ''} ${
                  showFeedback ? (
                    item === data[index].correctAnswer ? 'correct-option' : 
                    selectedAnswer === item ? 'incorrect-option' : 'disabled-option'
                  ) : ''
                }`}
                onClick={() => !showFeedback && handleAnswerSelect(item)}
              >
                <input
                  type="radio"
                  id={i}
                  name="question"
                  value={item}
                  checked={selectedAnswer === item}
                  onChange={() => handleAnswerSelect(item)}
                  disabled={showFeedback}
                  ref={el => (input.current[i] = el)}
                />
                <label htmlFor={i}>{item}</label>
              </div>
            ))}
          </div>

          {!showFeedback && (
            <button 
              className={`next-button ${!selectedAnswer ? 'disabled' : ''}`} 
              onClick={changeIndex}
              disabled={!selectedAnswer}
            >
              {index === data.length - 1 ? "Finish Quiz" : "Submit Answer"} →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default App;