import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pagescss/signin.css';
import siteLogo from './images/disasterLogo.png';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8081/users')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))

    }, []);

    // Constante pour la navigation
    const navigate = useNavigate();

    // Constantes du formulaire
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Fonction pour authentifier l'utilisateur
    const authentification = (event) => {
        event.preventDefault();
        for(let elt of users){
            if(username === elt.username && password === elt.password){
                localStorage.setItem("username", elt.username);
                localStorage.setItem("admin", elt.admin);
                navigate('/dashboard');
                return
            }
        }
        alert("Mot de passe ou Username incorrect. Veuillez reéssayer s'il vous plaît");
    }

    return (
        <div className='signin-block'>
            <div className='formDiv'>
                <div className='formDiv1'>
                 <img src={siteLogo} alt='siteLogo' onClick={() => {
                window.location.href = "http://localhost:3000/home";
              }}/>
                  <span>Pas encore Inscrit ?</span>
                  <span><Link to="/signup">S'inscrire</Link></span>
                </div>
                <div className='formDiv2'>
                   <h3>Connexion</h3>
                   <form onSubmit={authentification}>
                        <label>Username:</label>
                        <input type='text' onChange={e => setUsername(e.target.value)} required/>
                        <label>Password:</label>
                        <input type='password' onChange={e => setPassword(e.target.value)} required/>
                        <input type='submit' value="Se Connecter" id='submitButton'/>
                   </form>
                   
                </div>
            </div>
        </div>
    );
};

export default Signin;