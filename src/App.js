import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Map from './components/Map';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreSection from './components/ExploreSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Quiz from './components/Quiz'; // Import componenta Quiz

// Styles
import { GlobalStyles } from './styles/global';
import { UtilityStyles } from './styles/utilities';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Ascunde Navbar și Footer pentru ruta /quiz
  const hideLayout = location.pathname === "/quiz";

  return (
    <>
      <style>{GlobalStyles}</style>
      <style>{UtilityStyles}</style>

      {!hideLayout && <header><Navbar /></header>}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero-section">
                  <Hero />
                </section>
                <section className="explore-section">
                  <ExploreSection />
                </section>
                <section id="faq-section" style={{ scrollMarginTop: '80px' }}>
                  <FAQ />
                </section>
                <section id="map-section" style={{ scrollMarginTop: '80px' }}>
                  <Map />
                </section>
              </>
            }
          />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </main>

      {!hideLayout && <footer><Footer /></footer>}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
