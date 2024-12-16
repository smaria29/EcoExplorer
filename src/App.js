import React, { useState, useEffect } from 'react';
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

// Styles
import { GlobalStyles } from './styles/global';
import { UtilityStyles } from './styles/utilities';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  // Fetch locations from Firebase
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchItems();
  }, []);

  // Handle location deletion
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "locations", id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <AuthProvider>
      <>
        <style>{GlobalStyles}</style>
        <style>{UtilityStyles}</style>
        
        <div className="app-container">
          <header>
            <Navbar />
          </header>

          <main>
            {/* Hero Section */}
            <section className="hero-section">
              <Hero />
            </section>

            {/* Explore Section */}
            <section className="explore-section">
              <ExploreSection />
            </section>

            {/* FAQ Section */}
            <section id="faq-section" style={{ scrollMarginTop: '80px' }}>
              <FAQ />
            </section>

            {/* Map Section */}
            <section id="map-section" style={{ scrollMarginTop: '80px' }}>
              <Map locations={items} />
            </section>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </>
    </AuthProvider>
  );
}

export default App;