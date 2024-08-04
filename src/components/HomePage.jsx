import React from 'react';
import { Link } from 'react-router-dom';
import '../HomePage.css'; 

const HomePage = () => {
    return (
        <div className="home-container">
            <h1>Únete Hoy</h1>
            <div className="links-container">
                <Link to="/login" className="link">Iniciar sesión</Link>
                <Link to="/register" className="link">Registrarse</Link>
            </div>
            <p className="terms">
                Al registrarte, aceptas los Términos de servicio y la Política de privacidad, incluida la política de Uso de Cookies.
            </p>
        </div>
    );
};

export default HomePage;