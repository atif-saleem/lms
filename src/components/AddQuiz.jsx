import { useState } from "react";
import { saveQuiz } from "../utils/quizData";
import { useLocation } from "react-router-dom";

function AddQuiz() {
  const location = useLocation();
  const courseId = new URLSearchParams(location.search).get("courseId");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: 0 }
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    if (field === "question") {
      updated[index].question = value;
    } else if (field.startsWith("option")) {
      const optIndex = parseInt(field.slice(6));
      updated[index].options[optIndex] = value;
    } else if (field === "answer") {
      updated[index].answer = parseInt(value);
    }
    setQuestions(updated);
  };

  const save = () => {
    if (!courseId) {
      alert("No course selected!");
      return;
    }

    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    saveQuiz(courseId, questions);
    alert("Quiz saved!");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Quiz</h2>

      <button className="btn btn-success mb-3" onClick={addQuestion}>
        + Add Question
      </button>

      {questions.map((q, i) => (
        <div key={i} className="card mb-3 p-3 shadow-sm">
          <input
            className="form-control mb-2"
            placeholder="Question"
            value={q.question}
            onChange={(e) => updateQuestion(i, "question", e.target.value)}
          />
          <div className="row g-2 mb-2">
            {q.options.map((opt, j) => (
              <div className="col-6" key={j}>
                <input
                  className="form-control"
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) =>
                    updateQuestion(i, `option${j}`, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <select
            className="form-select"
            value={q.answer}
            onChange={(e) => updateQuestion(i, "answer", e.target.value)}
          >
            <option value="">Select Correct Answer</option>
            {q.options.map((_, j) => (
              <option key={j} value={j}>
                Option {j + 1}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button className="btn btn-primary" onClick={save}>
        Save Quiz
      </button>
    </div>
  );
}

export default AddQuiz;
