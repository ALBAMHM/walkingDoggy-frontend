import { useEffect, useState } from 'react';
import axios from 'axios';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/pets/all-pets');
        setPets(response.data);
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
      <h2>All Pets</h2>
      {message && <p>{message}</p>}
      <ul>
        {pets.map(pet => (
          <li key={pet._id}>
            <h3>{pet.name}</h3>
            <p>Species: {pet.species}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            {pet.owner ? (
              <>
                <p>Owner: {pet.owner.email}</p>
                <p>Location: {pet.owner.location}</p>
                <button onClick={() => handleSendEmail(pet.owner.email)}>Send Message</button>
              </>
            ) : (
              <p>No owner information available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPets;