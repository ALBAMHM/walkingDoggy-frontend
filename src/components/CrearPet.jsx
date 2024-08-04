import { useState } from 'react';
import axios from 'axios';

const CreatePet = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/pets/', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Pet created successfully!');
    } catch (error) {
      console.error('Error creating pet:', error);
      setMessage('Failed to create pet');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Pet</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="species"
        placeholder="Species"
        value={formData.species}
        onChange={handleChange}
      />
      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={formData.breed}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <button type="submit">Create Pet</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreatePet;