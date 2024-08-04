import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Profile from './components/Profile'; 
import Login from './components/Login';
import CreatePet from './components/CrearPet';
import UserPets from './components/UserPets';
import AllPets from './components/AllPets'
import HomePage from './components/HomePage';
import Header from './components/Header';

import './App.css'

const App = () => {
    return (
        <Router>
            <Header />
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
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