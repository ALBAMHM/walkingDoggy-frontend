import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserPets = () => {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No token found, please log in.');
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setMessage('Failed to fetch pets');
      }
    };
    
    fetchPets();
  }, []);

  return (
    <div>
      <h2>Mis mascotas</h2>
      {message && <p>{message}</p>}
      <ul>
        {pets.length > 0 ? (
          pets.map(pet => (
            <li key={pet._id}>{pet.name} - {pet.species}</li>
          ))
        ) : (
          <li>Ninguna mascota encontrada.</li>
        )}
      </ul>
            <div className="links-container">
                <Link to="/profile" className="link">Volver al perfil</Link>
            </div>
    </div>
    
  );
};

export default UserPets;