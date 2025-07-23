// src/utils/quizData.js

export const saveQuiz = (courseId, quiz) => {
  const all = JSON.parse(localStorage.getItem("quizzes")) || {};
  all[courseId] = quiz;
  localStorage.setItem("quizzes", JSON.stringify(all));
};

export const getQuiz = (courseId) => {
  const all = JSON.parse(localStorage.getItem("quizzes")) || {};
  return all[courseId] || [];
};
