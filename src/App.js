// App.js
import React from 'react';
import { GlobalStyles } from './styles/global';
import { UtilityStyles } from './styles/utilities';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreSection from './components/ExploreSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';


const App = () => {
  return (
    <>
      <style>{GlobalStyles}</style>
      <style>{UtilityStyles}</style>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <ExploreSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default App;