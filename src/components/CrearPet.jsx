import { useState } from 'react';
import { Link } from 'react-router-dom';

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
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setMessage('Pet created successfully!');
    } catch (error) {
      console.error('Error creating pet:', error);
      setMessage('Failed to create pet');
    }
  };

  return (
    <div>

        <form onSubmit={handleSubmit}>
          <h2>Registrar mascota</h2>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="species"
            placeholder="Especie"
            value={formData.species}
            onChange={handleChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="Raza"
            value={formData.breed}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Edad"
            value={formData.age}
            onChange={handleChange}
          />
          <input
            type="text"
            name="size"
            placeholder="Tamaño"
            value={formData.size}
            onChange={handleChange}
          />
          <input
            type="text"
            name="personality"
            placeholder="Personalidad"
            value={formData.personality}
            onChange={handleChange}
          />
          <input
            type="text"
            name="preferences"
            placeholder="Preferencias de paseo"
            value={formData.preferences}
            onChange={handleChange}
          />
          <button type="submit">Registrar mascota</button>
          {message && <p>{message}</p>}
        </form>
        <div className="links-container">
        <Link to="/profile" className="link">Volver al perfil</Link>
        </div>
  </div>
    
  );
};

export default CreatePet;