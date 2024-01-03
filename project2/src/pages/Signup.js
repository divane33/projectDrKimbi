import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../pagescss/signup.css';
import siteLogo from './images/disasterLogo.png';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    // Partie pour recupérer tous les utilisateurs de la BD (ceci c'est pour eviter d'enregistrer des mêmes infos)
    const [users, setUsers] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8081/users')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))

    }, []);

    // Constantes des champs du formulaire
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [admin, setAdmin] = useState('non');
    const notification = 'non';

    // Constante pour la navigation
    const navigate = useNavigate();

   //var coche = false;
   const [coche, setCoche] = useState(false)
    const cocheBox = () => {
        if(coche === false){
            setCoche(true);
            setAdmin('oui');
            
        }else{
            setCoche(false);
            setAdmin('non')
        }
    }

    // Fonction déclanchant l'enregistrement
    const saveUser = (event) => {

                event.preventDefault();

                for(let elt of users){
                    if(elt.username === username || elt.email === email) {
                        alert("Veuillez changer votre username ou votre email, Merci !");
                        return
                    }else{

                        axios.post('http://localhost:8001/addNbnotif', {username})
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => console.log(err));
                        
                        axios.post('http://localhost:8081/addUser', {username, email, password, admin, notification})
                        .then(res => {
                            console.log(res);
                            alert("Informations enregistrées avec succès !");
                            navigate('/signin');
                        })
                        .catch(err => console.log(err));

                        return
                    }
                }
            
      };

    return (
        <div className='signupBlock'>
           
            <div className='formDiv'>
                <div className='formDiv1'>
                 <img src={siteLogo} alt='siteLogo' onClick={() => {
                window.location.href = "http://localhost:3000/home";
              }}/>
                  <span>Vous êtes déjà Inscrit ?</span>
                  <span><Link to="/signin">Se connecter</Link></span>
                </div>
                <div className='formDiv2'>
                   <h3>Inscription</h3>
                   <form onSubmit={saveUser}>
                        <label>Username:</label>
                        <input type='text' onChange={e => setUsername(e.target.value)} required/>
                        <label>Email:</label>
                        <input type='email' onChange={e => setEmail(e.target.value)} required/>
                        <label>Password:</label>
                        <input type='password' onChange={e => setPassword(e.target.value)} required/>
                        <span style={{display: 'flex', alignItems: 'center', fontSize: 12, borderWidth: 2, borderColor: 'red', marginTop: '3%', marginLeft: '-50%', gap: 5}}>
                        <input type='checkbox' checked={coche} onChange={cocheBox} placeholder="admin"/>Administrateur</span>
                        <input type='submit' value="S'enregistrer" id='submitButton'/>
                   </form>
                   
                </div>
            </div>
        </div>
    );
};

export default Signup;