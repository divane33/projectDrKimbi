import React from 'react';
import '../pagescss/home.css';
import disasterLogo from './images/disasterLogo.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='homecss'>
            <img src={disasterLogo} id='imgLogo' alt='disasterLogo'/>
            <h1>ALERT DISASTER</h1>
            <p id='presentation'>Bienvenu sur la plateforme <span>Alert Disaster</span>, plateforme sur laquelle vous pouvez être notifié
            des différentes catastrophes naturelles dans le monde. Vous pouvez aussi signaler des catastrophes en les ajoutant 
            sur la plateforme. Commencez en cliquant sur le bouton ci-dessous </p>
            <button id='button'><Link to="/signup">Commencez</Link></button>
            
        </div>
    );
};

export default Home;