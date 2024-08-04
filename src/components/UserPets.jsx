import { useEffect, useState } from 'react';
import axios from 'axios';

const UserPets = () => {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/pets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setMessage('Failed to fetch pets');
      }
    };
    
    fetchPets();
  }, []);

  return (
    <div>
      <h2>Your Pets</h2>
      {message && <p>{message}</p>}
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>{pet.name} - {pet.species}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPets;