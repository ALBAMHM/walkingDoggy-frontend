import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        location: '',
        bio: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setMessage(data.message);
            if (data.email) {
                localStorage.setItem('token', data.token);
                setTimeout(() => {
                    navigate('/profile');
                }, 1000);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Usuario" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
                <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} />
                <input type="text" name="location" placeholder="Ubicación" onChange={handleChange} />
                <input type="text" name="bio" placeholder="Bio" onChange={handleChange} />
                <button type="submit">Registrar</button>
            </form>
            <div className="links-container">
                <Link to="/" className="link">Página inicio</Link>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;