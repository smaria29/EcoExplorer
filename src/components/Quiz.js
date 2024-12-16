import React, { useState } from 'react';
import '../styles/components/Quiz.css'; // Stiluri pentru cartonașe

const quizzes = [
  {
    id: 1,
    title: "Quiz 1: Animale protejate din România",
    questions: [
      { question: "Care este simbolul protejat al Deltei Dunării?", answer: "Pelicanii." },
      { question: "Ce mamifer rar poate fi găsit în Munții Carpați?", answer: "Ursul brun." }
    ]
  },
  {
    id: 2,
    title: "Quiz 2: Pădurile României",
    questions: [
      { question: "Ce procent din teritoriul României este acoperit de păduri?", answer: "Aproximativ 27%." },
      { question: "Ce specie de copac este predominantă în pădurile Carpaților?", answer: "Fagul." }
    ]
  },
  {
    id: 3,
    title: "Quiz 3: Specii marine",
    questions: [
      { question: "Ce mamifer marin se găsește în Marea Neagră?", answer: "Delfinul." },
      { question: "Care este cea mai mare specie de pește din Marea Neagră?", answer: "Sturionul." }
    ]
  }
];

const Quiz = () => {
  const [expandedQuiz, setExpandedQuiz] = useState(null);

  const toggleQuiz = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  return (
    <div className="quiz-container">
      <h1>Quiz-uri Interactive</h1>
      <p>Selectează un quiz pentru a începe!</p>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="quiz-card">
          <div className="quiz-header">
            <h2>{quiz.title}</h2>
            <button onClick={() => toggleQuiz(quiz.id)}>
              {expandedQuiz === quiz.id ? "Ascunde întrebările" : "Afișează întrebările"}
            </button>
          </div>
          {expandedQuiz === quiz.id && (
            <div className="quiz-questions">
              {quiz.questions.map((q, index) => (
                <div key={index} className="question">
                  <p><strong>Întrebare:</strong> {q.question}</p>
                  <p><strong>Răspuns:</strong> {q.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Quiz;
