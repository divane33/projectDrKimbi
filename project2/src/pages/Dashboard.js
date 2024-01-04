import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pagescss/dashboard.css';
// import inon from './images/innondations.png';

import Drawer from './components/Drawer';

const Dashboard = () => {

    // Partie pour recupérer tous les alertes de la BD (ceci c'est pour eviter d'enregistrer des mêmes infos)
    const [allalertes, setAllalertes] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8000/alertes')
        .then(res => setAllalertes(res.data))
        .catch(err => console.log(err));

    }, []);


    // Function pour ajouter chaque élément de allalertes dans disasterTab
    function updateDisasterTab() {
        // On ajoute chaque objet de allalertes dans la table disasterTab
        for(let elt of allalertes){
            disasterTab.unshift(elt);
        }
    }


    const disasterTab = [
        {
            id: 0,
            nom: 'Attention Danger à Douala !!!',
            description: `Route Bocom aéroport-Carrefour Saint-Michel la chaussée s'effondre sous la 
            pression des eaux depuis cette nuit. Encore une conséquence des pluies de ces jours. 
            Urgence de balise de sécurité!!!`,
            image: require('./images/alerte1.jpg'),
            date: '09/10/2023',
            categorie: 'géologiques'
        },
        {
            id: 0,
            nom: 'Des orages de plus en plus dévastateurs',
            description: `Depuis le 16 août, la France essuie une série de violents orages. Si leur 
            fréquence ne devrait pas augmenter avec le changement climatique, ils pourraient devenir 
            encore plus violents et les pluies encore plus intenses.`,
            image: require('./images/alerte2.jpg'),
            date: '09/10/2023',
            categorie: 'climatique'
        },
        {
            id: 0,
            nom: 'Cameroun: A Yaounde, les poubelles débordent et envahissent les trottoirs',
            description: `Des odeurs nauséabondes ont envahi l'air au carrefour marché Messassi dans 
            le premier arrondissement de Yaoundé, la capitale camerounaise.`,
            image: require('./images/alerte3.jpg'),
            date: '09/10/2023',
            categorie: 'biologique/écologique'
        }
        
    ]


    function displayDisaster() {

        // On ajoute chaque objet de allalertes dans la table disasterTab
        for(let elt of allalertes){
            disasterTab.unshift(elt);
        }

        return disasterTab.map((elt, index) => {
            return (
                <div className='section' key={index}>
                  <img src={elt.image} alt={elt.nom}/>
                  <div className='section2'>
                     <h3>{elt.nom}</h3>
                     <p>{elt.description}</p>
                  </div>
                </div>
            )
        })
    }

    function displayDisaster1() {

        return disasterTab.map((elt, index) => {
            if(elt.categorie === "géologiques"){
                return (
                    <div className='section' key={index}>
                    <img src={elt.image} alt={elt.nom}/>
                    <div className='section2'>
                        <h3>{elt.nom}</h3>
                        <p>{elt.description}</p>
                    </div>
                    </div>
                )
            }
            return null
        })
    }

    function displayDisaster2() {
        return disasterTab.map((elt, index) => {
            if(elt.categorie === "climatique"){
                return (
                    <div className='section' key={index}>
                    <img src={elt.image} alt={elt.nom}/>
                    <div className='section2'>
                        <h3>{elt.nom}</h3>
                        <p>{elt.description}</p>
                    </div>
                    </div>
                )
            }
            return null
        })
    }

    function displayDisaster3() {
        return disasterTab.map((elt, index) => {
            if(elt.categorie === "biologique/écologique"){
                return (
                    <div className='section' key={index}>
                    <img src={elt.image} alt={elt.nom}/>
                    <div className='section2'>
                        <h3>{elt.nom}</h3>
                        <p>{elt.description}</p>
                    </div>
                    </div>
                )
            }
            return null
        })
    }

    // Function qui fait des recherches par thème
    function rechercheOnly(termeResearch) {

        updateDisasterTab();

        if(termeResearch.length > 0){

            const disasters =  disasterTab.map((elt, index) => {
            if(elt.nom.toLocaleLowerCase().includes(termeResearch.toLocaleLowerCase()) || elt.description.toLocaleLowerCase().includes(termeResearch.toLocaleLowerCase()) || elt.categorie.toLocaleLowerCase().includes(termeResearch.toLocaleLowerCase())){
                
                return (
                            <div className='section' key={index}>
                            <img src={elt.image} alt={elt.nom}/>
                            <div className='section2'>
                                <h3>{elt.nom}</h3>
                                <p>{elt.description}</p>
                            </div>
                            </div>
                          )
                }
                return null
            })
  
            return disasters

        } 

             

    }
    

    // constante pour l'affichage des alertes par défaut
    const [displayDefault, setDisplayDefault] = useState(true);

     // constante pour l'affichage des alertes avec la barre de recherche
     const [displayResearch, setDisplayResearch] = useState(false);

     // terme recherché
     const [termeResearch, setTermeResearch] = useState('');

     // constante pour la disposition des recherches
     // const [dispose, setDispose] = useState(false);

    return (
        <>
        <div className='dashboardBlock'> 
            <Drawer /> 
            <div className='form'>
               <input type='search' id='terme' onChange={(e)=>{
                setTermeResearch(e.target.value);
                if (e.target.value.length > 0) {setDisplayResearch(true); setDisplayDefault(false)} else {setDisplayResearch(false); setDisplayDefault(true)};
                }} placeholder='Entrer une recherche' required/>
               <button id='bouton' onClick={() => {setDisplayResearch(true);}}>Rechercher</button>
            </div>

            {
                displayResearch && (<>
                        <h2 id='titreNouvelle'>Resultats trouvés</h2>
                        <div className='lastNews'>
                            {rechercheOnly(termeResearch)}
                        </div>
                    </>)
            }

            {
             displayDefault && (<>
                    <h2 id='titreNouvelle'>Dernières Alertes</h2>
                    <div className='lastNews'>
                        {displayDisaster()}
                    </div>

                    <h2 id='Categories-nouvelles'>Alertes classées par catégories</h2>
                    <h2 id='titreNouvelle'>Alertes géologiques</h2>
                    <div className='lastNews'>
                        {displayDisaster1()}
                    </div>
                    <h2 id='titreNouvelle'>Alertes climatique</h2>
                    <div className='lastNews'>
                        {displayDisaster2()}
                    </div>
                    <h2 id='titreNouvelle'>Alertes biologique/écologique</h2>
                    <div className='lastNews'>
                        {displayDisaster3()}
                    </div>
                </>)
            }

        </div>
        </>
    );
};

export default Dashboard;