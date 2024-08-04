import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pets/all-pets`);
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

  const handleSendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div>
      <h2>Encontrar mascotas cercanas</h2>
      {message && <p>{message}</p>}
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>
            <h3>{pet.name}</h3>
            <p>Especie: {pet.species}</p>
            <p>Raza: {pet.breed}</p>
            <p>Edad: {pet.age}</p>
            {pet.owner ? (
              <>
                <p>Propietario: {pet.owner.email}</p>
                <p>Ubicación: {pet.owner.location}</p>
                <button onClick={() => handleSendEmail(pet.owner.email)}>Send Message</button>
              </>
            ) : (
              <p>No owner information available</p>
            )}
          </li>
        ))}
      </ul>
      <div className="links-container">
        <Link to="/profile" className="link">Volver al perfil</Link>
        </div>
 
    </div>
  );
};

export default AllPets;