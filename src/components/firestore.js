// Importă SDK-ul Firebase
import firebase from 'firebase/app';
import 'firebase/firestore'; // Importă și modulul pentru Firestore

// Configurarea Firebase (trebuie să înlocuiești cu datele tale din consola Firebase)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inițializează Firebase
firebase.initializeApp(firebaseConfig);

// Obține referința la Firestore
const db = firebase.firestore();

// Datele pentru quiz
const quizData = [
  {
    question: "Care este simbolul protejat al Deltei Dunării?",
    options: {
      a: "Pelicanii",
      b: "Cormoranii",
      c: "Lebedele",
      d: "Rațele sălbatice"
    },
    correct_answer: "a"
  },
  {
    question: "Care este capitala României?",
    options: {
      a: "București",
      b: "Cluj-Napoca",
      c: "Iași",
      d: "Timișoara"
    },
    correct_answer: "a"
  }
];

// Adăugăm întrebările în Firestore
quizData.forEach((item, index) => {
  db.collection("questions").doc("question_" + (index + 1)).set(item)
    .then(() => {
      console.log("Întrebarea a fost adăugată cu succes în Firestore!");
    })
    .catch((error) => {
      console.error("Eroare la adăugarea întrebării: ", error);
    });
});
