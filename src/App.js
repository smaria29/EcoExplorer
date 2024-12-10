import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Map from './components/Map';  // Importă componenta Map
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: ''
  });

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

  // Handle form submission
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
    <div className="App">
      <h1>EcoExplorer Locations</h1>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location (latitude,longitude)"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">Add Location</button>
      </form>

      {/* Display Table */}
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

      {/* Map Component */}
      <Map locations={items} />
    </div>
  );
}

export default App;
