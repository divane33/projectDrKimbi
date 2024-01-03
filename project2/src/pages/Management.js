import React, {useState, useEffect} from 'react';
import '../pagescss/management.css';
import axios from 'axios';
import profil from './images/profil.png'

import Drawer from './components/Drawer';

const Management = () => {

    // const pour rafraîchir les utilisateurs non supprimés
    // const [refresh, setRefresh] = useState("flex");

     // Partie pour recupérer tous les utilisateurs de la BD
     const [users, setUsers] = useState([]);
     useEffect(() => {
 
         axios.get('http://localhost:8081/users')
         .then(res => setUsers(res.data))
         .catch(err => console.log(err))
 
     }, []);

     // Fonction pour afficher tous les utilisateurs
     function displayUsers() {
         return users.map((elt, index) => {
             return (
                        <div className='sectionUser' key={index}>
                            <img src={profil} alt='profil'/>
                            <div className='infos'>
                                <h2>{elt.username}</h2>
                                <h4>{elt.email}</h4>
                            </div>
                            <button onClick={() => {deleteUser(elt.id); window.location.reload();}}>Supprimer</button>
                        </div>
             )
         })
     }

     // Fonction qui enclenche et valide la suppression d'un utilisateur
     function deleteUser(id) {
        axios.delete('http://localhost:8081/deleteUser/'+id, {})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
     }

    return (
        <div className='manageBlock'>
            <Drawer /> 
            <h1>Gerer les utilisateurs <br/> (Vous ne pouvez que supprimer)</h1>
            {displayUsers()}

        </div>
    );
};

export default Management;