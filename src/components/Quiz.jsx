import { useState, useEffect } from "react";
import { getQuiz } from "../utils/quizData";

function Quiz({ courseId }) {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (courseId) {
      const q = getQuiz(courseId);
      setQuiz(q);
      setAnswers(Array(q.length).fill(null));
    }
  }, [courseId]);

  const handleSelect = (qIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const submitQuiz = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
  };

  if (!courseId || quiz.length === 0) {
    return (
      <div className="container mt-4">
        <h4>No quiz available for this course.</h4>
      </div>
    );
  }

  const score = answers.filter((a, i) => a === quiz[i]?.answer).length;

  return (
    <div className="container mt-4">
      <h3>Quiz</h3>

      {quiz.map((q, i) => (
        <div key={i} className="mb-4">
          <h5>
            Q{i + 1}: {q.question}
          </h5>
          {q.options.map((opt, j) => (
            <div className="form-check" key={j}>
              <input
                className="form-check-input"
                type="radio"
                name={`q-${i}`}
                id={`q-${i}-opt-${j}`}
                value={j}
                checked={answers[i] === j}
                disabled={submitted}
                onChange={() => handleSelect(i, j)}
              />
              <label className="form-check-label" htmlFor={`q-${i}-opt-${j}`}>
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button className="btn btn-primary" onClick={submitQuiz}>
          Submit Quiz
        </button>
      ) : (
        <div className="alert alert-success">
          Quiz Submitted! Your Score: {score}/{quiz.length}
        </div>
      )}
    </div>
  );
}

export default Quiz;
