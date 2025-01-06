import { db } from '../firebase';  
import { collection, addDoc } from 'firebase/firestore';

import '../styles/components/Quiz.css'; // Stiluri pentru cartonașe
import React, { useState, useEffect } from 'react';



const quizzes = [
  {
    id: 1,
    title: "Quiz 1: Delta Dunării",
    questions: [
      {
        question: "Care este simbolul protejat al Deltei Dunării?",
        answers: ["Pelicanii", "Cormoranii", "Lebedele", "Rațele sălbatice"],
        correctAnswer: "Pelicanii"
      },
      {
        question: "Ce specii de pești sunt caracteristice Deltei Dunării?",
        answers: ["Sturionii", "Somnii", "Carasul", "Tonul"],
        correctAnswer: "Sturionii"
      },
      {
        question: "Ce tip de habitat este cel mai răspândit în Delta Dunării?",
        answers: ["Zonele umede", "Pajiștile alpine", "Pădurile de foioase", "Deșerturile nisipoase"],
        correctAnswer: "Zonele umede"
      }
    ]
  },
  {
    id: 2,
    title: "Quiz 2: Munții Carpați",
    questions: [
      {
        question: "Ce mamifer emblematic trăiește în Munții Carpați?",
        answers: ["Ursul brun", "Vulpea polară", "Elefantul", "Leul"],
        correctAnswer: "Ursul brun"
      },
      {
        question: "Ce specie de copac domină pădurile din Carpați?",
        answers: ["Fagul", "Bradul", "Pinul", "Stejarul"],
        correctAnswer: "Fagul"
      },
      {
        question: "Care dintre aceste specii este protejată în Parcul Național Retezat?",
        answers: ["Râsul", "Zimbrul", "Lupul cenușiu", "Cerbul roșu"],
        correctAnswer: "Râsul"
      }
    ]
  },
  {
    id: 3,
    title: "Quiz 3: Păduri și biodiversitate",
    questions: [
      {
        question: "Ce procent din România este acoperit de păduri?",
        answers: ["Aproximativ 27%", "Aproximativ 50%", "Aproximativ 15%", "Aproximativ 35%"],
        correctAnswer: "Aproximativ 27%"
      },
      {
        question: "Ce pădure din România este inclusă în Patrimoniul UNESCO?",
        answers: ["Pădurea Hoia-Baciu", "Pădurile virgine de fag", "Pădurea Comana", "Pădurea Snagov"],
        correctAnswer: "Pădurile virgine de fag"
      },
      {
        question: "Ce rol joacă pădurile în reducerea efectului de seră?",
        answers: ["Absorb dioxidul de carbon", "Emană oxigen", "Reduc ploile acide", "Previn erodarea solului"],
        correctAnswer: "Absorb dioxidul de carbon"
      }
    ]
  },
  {
    id: 4,
    title: "Quiz 4: Specii protejate din România",
    questions: [
      {
        question: "Ce pasăre este un simbol al biodiversității României?",
        answers: ["Vulturul pleșuv", "Cocoșul de munte", "Cioara de semănătură", "Fazanul"],
        correctAnswer: "Cocoșul de munte"
      },
      {
        question: "Ce mamifer marin protejat trăiește în Marea Neagră?",
        answers: ["Delfinul", "Balena albastră", "Rechinul alb", "Foca de Groenlanda"],
        correctAnswer: "Delfinul"
      },
      {
        question: "Ce reptilă rară poate fi întâlnită în zonele protejate?",
        answers: ["Vipera de stepă", "Șopârla de nisip", "Broasca țestoasă de uscat", "Șarpele boa"],
        correctAnswer: "Vipera de stepă"
      }
    ]
  },
  {
    id: 5,
    title: "Quiz 5: Parcuri naționale",
    questions: [
      {
        question: "Care este primul parc național înființat în România?",
        answers: ["Parcul Național Retezat", "Parcul Național Piatra Craiului", "Parcul Național Ceahlău", "Parcul Național Domogled"],
        correctAnswer: "Parcul Național Retezat"
      },
      {
        question: "În ce județ se află Parcul Național Piatra Craiului?",
        answers: ["Brașov", "Sibiu", "Maramureș", "Tulcea"],
        correctAnswer: "Brașov"
      },
      {
        question: "Ce animal este un simbol al Parcului Național Apuseni?",
        answers: ["Râsul", "Cerbul lopătar", "Lupul", "Vidra"],
        correctAnswer: "Vidra"
      }
    ]
  },
  {
    id: 6,
    title: "Quiz 6: Probleme de mediu",
    questions: [
      {
        question: "Ce fenomen este cauzat de despăduriri masive?",
        answers: ["Eroziunea solului", "Creșterea biodiversității", "Reducerea emisiilor de CO2", "Îmbunătățirea calității apei"],
        correctAnswer: "Eroziunea solului"
      },
      {
        question: "Ce contribuie cel mai mult la poluarea oceanelor?",
        answers: ["Plasticul", "Uleiul de gătit", "Deșeurile de hârtie", "Resturile alimentare"],
        correctAnswer: "Plasticul"
      },
      {
        question: "Cum poate fi redusă poluarea aerului?",
        answers: ["Folosind transport public", "Arzând deșeuri", "Defrișând pădurile", "Folosind mai multă energie fosilă"],
        correctAnswer: "Folosind transport public"
      }
    ]
  },
  {
    id: 7,
    title: "Quiz 7: Energie regenerabilă",
    questions: [
      {
        question: "Ce sursă de energie regenerabilă este cea mai folosită în România?",
        answers: ["Hidroenergia", "Energia solară", "Energia geotermală", "Energia eoliană"],
        correctAnswer: "Hidroenergia"
      },
      {
        question: "Ce resursă este utilizată pentru energia solară?",
        answers: ["Lumină", "Cărbune", "Vânt", "Apă"],
        correctAnswer: "Lumină"
      },
      {
        question: "Care este principalul avantaj al energiei regenerabile?",
        answers: ["Nu produce emisii de CO2", "Este nelimitată", "Este ieftină", "Funcționează doar pe soare"],
        correctAnswer: "Nu produce emisii de CO2"
      }
    ]
  },
  {
    id: 8,
    title: "Quiz 8: Apa și viața",
    questions: [
      {
        question: "Ce procent din suprafața Pământului este acoperit de apă?",
        answers: ["71%", "50%", "85%", "60%"],
        correctAnswer: "71%"
      },
      {
        question: "Cum se numește ciclul natural al apei?",
        answers: ["Ciclul hidrologic", "Ciclul geologic", "Ciclul atmosferic", "Ciclul nutritiv"],
        correctAnswer: "Ciclul hidrologic"
      },
      {
        question: "Care este principala sursă de apă potabilă în natură?",
        answers: ["Apele subterane", "Lacurile sărate", "Oceanul", "Mările"],
        correctAnswer: "Apele subterane"
      }
    ]
  },
  {
    id: 9,
    title: "Quiz 9: Flora României",
    questions: [
      {
        question: "Ce floare este un simbol al Carpaților?",
        answers: ["Floarea de colț", "Laleaua", "Macul", "Ghiocelul"],
        correctAnswer: "Floarea de colț"
      },
      {
        question: "Ce plantă carnivoră crește în zonele umede din România?",
        answers: ["Roua cerului", "Lăcrămioara", "Feriga", "Mesteacănul"],
        correctAnswer: "Roua cerului"
      },
      {
        question: "Ce arbust este protejat în Parcul Național Ceahlău?",
        answers: ["Tisa", "Măceșul", "Cornul", "Ienupărul"],
        correctAnswer: "Tisa"
      }
    ]
  },
  {
    id: 10,
    title: "Quiz 10: Animale dispărute și reintroduse",
    questions: [
      {
        question: "Ce mamifer a fost reintrodus în România după dispariție?",
        answers: ["Zimbrul", "Lupul", "Capra neagră", "Vulpea polară"],
        correctAnswer: "Zimbrul"
      },
      {
        question: "Ce pasăre a fost protejată pentru a evita dispariția?",
        answers: ["Barza albă", "Cioara grivă", "Papagalul", "Pescărușul albastru"],
        correctAnswer: "Barza albă"
      },
      {
        question: "Ce specie dispărută a fost introdusă în Delta Dunării?",
        answers: ["Sturionii", "Rața mandarin", "Somnul uriaș", "Crabul de râu"],
        correctAnswer: "Sturionii"
      }
    ]
  }
];


// const Quiz = () => {
//   const [expandedQuiz, setExpandedQuiz] = useState(null);

//   const toggleQuiz = (quizId) => {
//     setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
//   };

//   return (
//     <div className="quiz-container">
//       <h1>Quiz-uri Interactive</h1>
//       <p>Selectează un quiz pentru a începe!</p>
//       {quizzes.map((quiz) => (
//         <div key={quiz.id} className="quiz-card">
//           <div className="quiz-header">
//             <h2>{quiz.title}</h2>
//             <button onClick={() => toggleQuiz(quiz.id)}>
//               {expandedQuiz === quiz.id ? "Ascunde întrebările" : "Afișează întrebările"}
//             </button>
//           </div>
//           {expandedQuiz === quiz.id && (
//             <div className="quiz-questions">
//               {quiz.questions.map((q, index) => (
//                 <div key={index} className="question">
//                   <p><strong>Întrebare:</strong> {q.question}</p>
//                   <p><strong>Răspuns:</strong> {q.answer}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };


// export default Quiz;

const Quiz = () => {
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const toggleQuiz = (quizId) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
    setSubmitted(false);
    setSelectedAnswers({});
    setScore(null);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const saveAnswersToFirestore = async (quizId, answers, userScore) => {
    try {
      const docRef = await addDoc(collection(db, 'userAnswers'), {
        quizId,
        answers,
        score: userScore,
        timestamp: new Date(),
      });
      console.log('Document scris cu ID-ul: ', docRef.id);
    } catch (e) {
      console.error('Eroare la adăugarea documentului: ', e);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);

    const currentQuiz = quizzes.find((quiz) => quiz.id === expandedQuiz);
    if (!currentQuiz) return;

    let correctAnswersCount = 0;
    const results = Object.keys(selectedAnswers).map((questionIndex) => {
      const userAnswer = selectedAnswers[questionIndex];
      const correctAnswer = currentQuiz.questions[questionIndex].correctAnswer;

      const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase() ? 1 : 0;

      if (isCorrect) correctAnswersCount++;

      return {
        questionIndex,
        isCorrect,
      };
    });

    const userScore = correctAnswersCount; // Scorul utilizatorului
    setScore(userScore); // Setează scorul

    saveAnswersToFirestore(expandedQuiz, results, userScore); // Salvează în Firestore
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
                  <div className="answers">
                    {q.answers.map((answer, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={answer}
                          onChange={() => handleAnswerSelect(index, answer)}
                          disabled={submitted}
                          checked={selectedAnswers[index] === answer}
                        />
                        {answer}
                      </label>
                    ))}
                  </div>
                  {submitted && (
                    <p
                      style={{
                        color: selectedAnswers[index] === q.correctAnswer ? "green" : "red",
                      }}
                    >
                      {selectedAnswers[index] === q.correctAnswer
                        ? "Corect!"
                        : `Greșit! Răspunsul corect este: ${q.correctAnswer}`}
                    </p>
                  )}
                </div>
              ))}
              {!submitted && (
                <button onClick={handleSubmit} className="submit-button">
                  Trimite răspunsurile
                </button>
              )}
              {submitted && score !== null && (
                <div className="score">
                  <h3>Scorul tău este: {score}/3</h3>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Quiz;