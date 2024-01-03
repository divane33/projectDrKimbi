import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pagescss/ajoutercat.css';
import noimage from '../pages/images/no-image.jpg'

import Drawer from './components/Drawer';

const AjouterCat = () => {

    // Constantes du formulaire
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [categorie, setCategorie] = useState('géologiques');
    const [imgUrl, setImgUrl] = useState('');
    const user = localStorage.getItem("username");

    // Partie pour recupérer tous les alertes de la BD (ceci c'est pour eviter d'enregistrer des mêmes infos)
    const [allalertes, setAllalertes] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8000/alertes')
        .then(res => setAllalertes(res.data))
        .catch(err => console.log(err))

    }, []);


    // Fonction pour charger une image dans le formulaire
    function uploadImg(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const imageUrl = reader.result;
              setImgUrl(imageUrl);
              //document.getElementById('imgupload').src = imageUrl;
            };
            reader.readAsDataURL(file);
          }
    }

    // Fonction permettant d'activer la notification lorsqu'un utilisateur publie une alerte
    function updateNotif() {
        axios.put('http://localhost:8081/notif', {})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    // Fonction permettant d'incrémenter le nombre de notifications d'un utilisateur dans la BD
    function addNotif() {
        axios.put('http://localhost:8001/updatenotif', {})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }

    // Fonction pour soumettre le formulaire et enregistrer les informations d'une alerte
     const saveAlerte = (event) => {

        event.preventDefault();

        for(let elt of allalertes){
            if(elt && elt.nom === nom && allalertes.length > 0) {
                alert("Il existe déjà une alerte avec ce nom. Veuillez s'il vous plaît changer de nom pour votre alerte. Merci !");
                return
            }
        }
                
                axios.post('http://localhost:8000/addAlert', {nom, description, categorie, imgUrl, user})
                .then(res => {
                    console.log(res);
                    alert("Informations enregistrées avec succès ! Vous pouvez ajouter de nouveau une nouvelle alerte si vous le voulez !");
                    updateNotif();
                    addNotif();
                    window.location.reload();
                })
                .catch(err => console.log(err));

                return
            
        
    
     };

    return (
        <div className='ajoutCatBlock'>
            <Drawer /> 
            <h1>Remplissez le formulaire ci-desous pour ajouter une alerte</h1>
            <form onSubmit={saveAlerte}>
               <label>Nom:</label>
               <input type='text' onChange={e => setNom(e.target.value)} placeholder='entrer le titre de votre alerte (40 caractères au plus)' maxLength="40" required/>
               <label>Description:</label>
               <input type='text' onChange={e => setDescription(e.target.value)} placeholder='entrer la description de votre alerte (200 caractères au plus)' maxLength="200" required/>
               <label>Sélectionner une catégorie:</label>
               <select id='selections' onChange={e => setCategorie(e.target.value)} required>
                  <option>géologiques</option>
                  <option>climatique</option>
                  <option>biologique/écologique</option>
               </select>
               <label>Ajouter une image:</label>
               <input type='file' id='fileImg' onChange={uploadImg} required/>
               <img src={imgUrl ? imgUrl : noimage} alt="noimage" id='imgupload'/>
               <input type='submit' id='envoie' placeholder='entrer le titre de votre alerte'/>
            </form>
        </div>
    );
};

export default AjouterCat;