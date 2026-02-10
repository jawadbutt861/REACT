import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import shuffleArray from 'shuffle-array';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [questionMarks, setQuestionMarks] = useState(0);
  const [result, setResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [showReview, setShowReview] = useState(false);

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

  // Memoize shuffled options to prevent re-shuffling on every render
  const currentShuffledOptions = useMemo(() => {
    if (!data || !data[index]) return [];
    return shuffleArray([
      ...data[index].incorrectAnswers,
      data[index].correctAnswer
    ]);
  }, [data, index]);

  // Memoize score calculations
  const { totalPossibleScore, isPassed } = useMemo(() => {
    const total = data ? data.length : 0;
    const possible = total * 10;
    const pass = possible * 0.7;
    return {
      totalPossibleScore: possible,
      isPassed: questionMarks >= pass
    };
  }, [data, questionMarks]);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0 && !result) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimeout(() => {
        setUserAnswers(prev => [...prev, { 
          question: data[index].question.text,
          selected: 'Time Up',
          correct: data[index].correctAnswer,
          isCorrect: false
        }]);
        
        if (index === data.length - 1) {
          setResult(true);
        } else {
          setIndex(prev => prev + 1);
          setSelectedAnswer('');
          setTimeLeft(30);
          setTimerActive(true);
        }
      }, 0);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, result, data, index]);

  // Restart quiz
  const restartQuiz = () => {
    setIndex(0);
    setQuestionMarks(0);
    setResult(false);
    setSelectedAnswer('');
    setUserAnswers([]);
    setTimeLeft(30);
    setTimerActive(true);
    setShowReview(false);
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



  // Next Question Handler
  const changeIndex = () => {
    if (!selectedAnswer) {
      alert('Please select an answer before proceeding!');
      return;
    }

    const isCorrect = selectedAnswer === data[index].correctAnswer;
    
    setQuestionMarks(prev => isCorrect ? prev + 10 : prev);
    setUserAnswers(prev => [...prev, {
      question: data[index].question.text,
      selected: selectedAnswer,
      correct: data[index].correctAnswer,
      isCorrect: isCorrect
    }]);

    if (index === data.length - 1) {
      setResult(true);
    } else {
      setIndex(prev => prev + 1);
      setSelectedAnswer('');
      setTimeLeft(30);
      setTimerActive(true);
    }
  };



  return (
    <div className="app-container">
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

      {!loading && !error && !data && (
        <div>
          <h1 className="app-title">🧠 Quiz Master</h1>
          <p className="app-subtitle">Test your knowledge with fun questions!</p>
          <button className="start-button" onClick={retryLoad}>
            Start Quiz
          </button>
        </div>
      )}

      {result && (
        <div className="result-container">
          <h1 className="result-title">🎉 Quiz Complete!</h1>
          <div className={`result-score ${isPassed ? 'pass' : 'fail'}`}>
            {questionMarks}
          </div>
          <p className="result-message">
            {isPassed ? "Excellent work! 🌟" : 
             questionMarks >= totalPossibleScore * 0.5 ? "Good job! 👍" : 
             "Keep practicing! 💪"}
          </p>
          <p className="result-details">
            You scored {questionMarks} out of {totalPossibleScore} points
          </p>
          
          <button className="restart-button" onClick={restartQuiz}>
            🔄 Take Quiz Again
          </button>
          
          <button 
            className="review-toggle" 
            onClick={() => setShowReview(!showReview)}
          >
            {showReview ? 'Hide' : 'Review'} Answers
          </button>

          {showReview && (
            <div className="result-summary">
              <h3>📊 Answer Summary:</h3>
              <div className="answers-review">
                {userAnswers.map((answer, i) => (
                  <div key={i} className={`answer-review ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-question">
                      Q{i + 1}: {answer.question}
                      <span className={`answer-status ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        {answer.isCorrect ? '✅' : '❌'}
                      </span>
                    </div>
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
          )}
        </div>
      )}

      {data && !result && (
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="progress-display">
              Q {index + 1} / {data.length}
            </div>
            <div className={`timer-display ${timeLeft <= 10 ? 'warning' : ''}`}>
              {timeLeft}s
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((index + 1) / data.length) * 100}%` }}
            ></div>
          </div>

          <div className="question-card">
            <div className="question-text">
              {data[index].question.text}
            </div>

            <div className="options-container">
              {currentShuffledOptions.map((item, i) => (
                <div 
                  key={`${index}-${i}`}
                  className={`option-item ${selectedAnswer === item ? 'selected' : ''}`}
                  onClick={() => setSelectedAnswer(item)}
                >
                  <input
                    type="radio"
                    id={`q${index}-${i}`}
                    name={`question-${index}`}
                    value={item}
                    checked={selectedAnswer === item}
                    onChange={() => setSelectedAnswer(item)}
                  />
                  <label htmlFor={`q${index}-${i}`}>{item}</label>
                </div>
              ))}
            </div>
          </div>

          <button 
            className={`submit-button ${!selectedAnswer ? 'disabled' : ''}`} 
            onClick={changeIndex}
            disabled={!selectedAnswer}
          >
            {index === data.length - 1 ? "Finish Quiz" : "Submit Answer"} →
          </button>
        </div>
      )}
    </div>
  );
};

export default App;