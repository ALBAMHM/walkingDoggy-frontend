import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
            const response = await axios.post('http://localhost:3000/api/auth/register', formData);
            setMessage(response.data.message);
            if (response.data.email) {
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate('/profile'); // Usa `navigate` para redirigir
                }, 1000);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setMessage('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} />
                <input type="text" name="location" placeholder="Location" onChange={handleChange} />
                <input type="text" name="bio" placeholder="Bio" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;