import React, {useState, useEffect} from 'react';
import '../pagescss/gerercat.css';
import axios from 'axios';

import Drawer from './components/Drawer';

const GererCat = () => {

    // Constante pour afficher le message h1 si l'utilisateur n'a encore ajouté aucune alerte
    // const [aucune, setAucune] = useState(false);

    // Fonction pour charger une image dans le formulaire
    function uploadImg(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const imageUrl = reader.result;
            setImagenot(imageUrl);
            //document.getElementById('imgupload').src = imageUrl;
          };
          reader.readAsDataURL(file);
        }
  }

    // Partie pour recupérer tous les alertes de la BD (ceci c'est pour eviter d'enregistrer des mêmes infos)
    const [allalertes, setAllalertes] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8000/alertes')
        .then(res => {
          setAllalertes(res.data);
        })
        .catch(err => console.log(err));

    }, []);

    // Fonction pour mettre à jour l'alerte d'un utilisateur
    function updateAlert(id) {
      //const actifUser = localStorage.getItem("username");
      axios.put('http://localhost:8000/updatealerte/'+id, {nomnot, descriptionnot, categorienot, imagenot})
      .then(res => {
          console.log(res);
      })
      .catch(err => console.log(err));
    }

    // Fonction pour mettre à jour l'alerte d'un utilisateur
    function suppAlert(id) {
      //const actifUser = localStorage.getItem("username");
      axios.delete('http://localhost:8000/deleteAlerte/'+id, {})
      .then(res => {
          console.log(res);
      })
      .catch(err => console.log(err));
    }

    // Constante pour afficher la div de modification d'une alerte avec ses différentes constantes
    const [modifDiv, setModifDiv] = useState('none');
    const [idnotif, setIdnotif] = useState('');
    const [nomnot, setNomnot] = useState('');
    const [descriptionnot, setDescriptionnot] = useState('');
    const [categorienot, setCategorienot] = useState('');
    const [imagenot, setImagenot] = useState('');


    // Fonction pour afficher les alertes publiées de l'utilisateur
    function displayAlerts() {

           const user = localStorage.getItem("username");

              let inc = 0;

             //----------------------------
             let displaymessage = true;

      const alerts = allalertes.map((elt, index) => {

            inc++;

            if (elt.user === user) {

              let nom = elt.nom;
              let description = elt.description;
              let categorie = elt.categorie;
              let image = elt.image;
              
              displaymessage = false;

                   return (
                      <div className='alertDiv' key={index}>
                          <img src={image} alt='imageAlert'/>
                          <input type='text' onChange={(e) => {nom = e.target.value}} value={nom}/>
                          <input type='text' value={description}/>
                          <div className='updateDiv'>
                            <input type='file'/>
                            <select id='selections' value={categorie} required>
                              <option>géologiques</option>
                              <option>climatique</option>
                              <option>biologique/écologique</option>
                          </select>
                            <button onClick={() => {
                              setModifDiv('flex');
                              setIdnotif(elt.id);
                              setNomnot(nom);
                              setDescriptionnot(description);
                              setCategorienot(categorie);
                              setImagenot(image);
                              }}>Modifier</button>
                            <button onClick={() => {suppAlert(elt.id); alert("Alerte supprimée avec succès !"); window.location.reload()}}>Supprimer</button>
                          </div>
                      </div>
                   )

            } else if (inc === allalertes.length && displaymessage === true) {
                  displaymessage = false;
                  return (<h3 id="aucune">Vous n'avez publié aucune alerte <br/> pour le moment...</h3>)
             } return null
           })

          return alerts
               

    }

    return (
        <div className='gerercatBlock'>
            <Drawer /> 
            <h2>Alertes ajoutées :</h2>
            {displayAlerts()}

            <div className='divModification' style={{display: modifDiv}}>
                <form onSubmit={(event) => {event.preventDefault(); alert("Modification éffectuée avec succès !"); window.location.reload(); updateAlert(idnotif);}}>
                     <label>Nom:</label>
                       <input type='text' onChange={e => setNomnot(e.target.value)} value={nomnot} maxLength="40" />
                     <label>Description:</label>
                          <input type='text' onChange={e => setDescriptionnot(e.target.value)} value={descriptionnot} maxLength="200"/>
                     <label>Catégorie:</label>
                            <select id='selections' onChange={e => setCategorienot(e.target.value)} value={categorienot} required>
                              <option>géologiques</option>
                              <option>climatique</option>
                              <option>biologique/écologique</option>
                          </select>
                     <label id='labelfile'>Ajouter une image:</label>
                          <input id="file" onChange={uploadImg} type='file'/>
                          <img src={imagenot} alt='aucuneImage'/>
                            <input type='submit' value="Modifier" id='bouton1' />
                            <input type='cancel' value='Annuler' onClick={() => {setModifDiv('none')}} id='bouton2' />
                </form>
            </div>

        </div>
    );
};

export default GererCat;