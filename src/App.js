import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';  // removed addDoc
import Map from './components/Map';
import { GlobalStyles } from './styles/global';
import { UtilityStyles } from './styles/utilities';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExploreSection from './components/ExploreSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  // Commented out form state since we're not using it temporarily
  /*
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: ''
  });
  */

  // Fetch items from Firebase
  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "locations"));
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsList);
    };

    fetchItems();
  }, []);

  // Commented out form submission handler
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "locations"), {
        ...formData,
        createdAt: new Date()
      });
      setFormData({ name: '', location: '', description: '' });
      // Refresh the list
      const querySnapshot = await getDocs(collection(db, "locations"));
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsList);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  */

  // Handle deletion
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "locations", id));
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

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
        <div id="faq-section" style={{ scrollMarginTop: '80px' }}>
          <FAQ />
        </div>
      </main>
      {/* <Footer /> */}
      
      <div id="map-section" style={{ scrollMarginTop: '80px' }}>
        {/* Commented out form for adding locations
        <form onSubmit={handleSubmit} className="add-form">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location (latitude,longitude)"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <button type="submit">Add Location</button>
        </form>
        */}

        {/* Commented out table with locations 
        <table className="locations-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        */}

        {/* Map Component */}
        <Map locations={items} />
      </div>
    </>
  );
}

export default App;
