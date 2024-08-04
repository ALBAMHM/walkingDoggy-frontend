import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Profile.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No token found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
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
                setUser(data);
            } catch (error) {
                setError('Failed to fetch profile data');
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Perfil</h1>
            {user ? (
                <div>
                    <p>Usuario: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Nombre: {user.first_name}</p>
                    <p>Apellido: {user.last_name}</p>
                    <p>Ubicación: {user.location}</p>
                    <p>Bio: {user.bio}</p>
                    <div className="profile-links">
                        <Link to="/my-pets" className="profile-link">Mis mascotas</Link>
                        <Link to="/create-pet" className="profile-link">Crear mascota</Link>
                        <Link to="/all-pets" className="profile-link">Encontrar mascotas cercanas</Link>
                        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
                    </div>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Profile;