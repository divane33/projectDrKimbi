import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../pagescss/notifications.css'

import Drawer from './components/Drawer';

const Notifications = () => {

     // Partie pour recupérer tous les alertes de la BD (ceci c'est pour eviter d'enregistrer des mêmes infos)
    const [allalertes, setAllalertes] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8000/alertes')
        .then(res => setAllalertes(res.data))
        .catch(err => console.log(err));

    }, []);

    // constante qui recupere le nb de notifications non lues de l'utilisateur
    //const [nbNotif, setNbNotif] = useState(localStorage.getItem("nbnotifications"));

    // constante pour gérer le message aucune alerte pour le moment si nbnotifications = 0
    // const [message, setMessage] = useState(false);
    

    // Fonction pour afficher les alertes récentes
    function recentAlerts() {

        let i = localStorage.getItem("nbnotifications");
        let taille = allalertes.length;
        let message = true; let displaymessage = true;
        //alert(taille)

        return allalertes.map((elt, index) => {
            if(i && i > 0){
                elt = allalertes[taille-1];
                message = false;

                    i--;
                    taille--;
                    //alert(i)

                    return (
                        <div className='section' key={index}>
                        <img src={elt.image} alt={elt.nom}/>
                        <div className='section2'>
                            <h3>{elt.nom}</h3>
                            <p>{elt.description}</p>
                        </div>
                        </div>
                    )
            }else{
                if (message === true && displaymessage === true) {
                    displaymessage = false;
                    return (<h3 id="aucune">Aucune alerte à afficher pour vous <br/> pour le moment...</h3>)
                } return null
            }  
        })
    }

    return (
        <div className='notificationsBlock'>
            <Drawer /> 
            <h3 id="aucune">Voici les dernières alertes récentes<br/> ci-dessous:</h3>
            {recentAlerts()}
        </div>
    );
};

export default Notifications;