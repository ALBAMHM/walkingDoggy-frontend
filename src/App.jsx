import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile'; // Asegúrate de crear un componente Profile.jsx similar al de Register.jsx
import Login from './components/Login';
import CreatePet from './components/CrearPet';
import UserPets from './components/UserPets';
import AllPets from './components/AllPets'

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-pet" element={<CreatePet />} />
                    <Route path="/my-pets" element={<UserPets />} />
                    <Route path="/all-pets" element={<AllPets />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;