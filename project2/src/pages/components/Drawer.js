import React, {useState, useEffect} from 'react';
import './drawer.css';
import axios from 'axios';
import logoSite from '../images/disasterLogo.png';
import profil from '../images/profil.png';
import bell from '../images/bell.png';
import logout from '../images/déconnexion.jpg';

import { Link, useNavigate } from 'react-router-dom';

const Drawer = () => {
    // const navigate pour la navigation
    const navigate = useNavigate(); 

    // Const id de l'utilisateur actif
    const [id, setId] = useState();

    // Constante qui permet d'afficher le point rouge de la cloche
    const [onBell, setOnBell] = useState('none');

    // Partie pour recupérer tous les utilisateurs de la BD (ceci c'est pour eviter d'enregistrer des mêmes infos)
    // const [users, setUsers] = useState([]);
    useEffect(() => {

        axios.get('http://localhost:8081/users')
        .then(res => {
           // setUsers(res.data)
           setInterval(()=>{
            for(let elt of res.data){
                 if(elt.username === localStorage.getItem('username')){
                    setId(elt.id);
                    if(elt.notification === 'oui'){
                         setOnBell('block');
                         // return
                    }
                        //  setOnBell('none');
                        //  return
                 }
            } //alert("ok !")
        }, 500);
        })
        .catch(err => console.log(err));

    }, []);

      // Fonction pour récupérer les utilisateurs et leurs nombres de notifications dans la BD
      const [ID, setID] = useState([]);
    //   const [etat, setEtat] = useState(true);
    //   const [taille, setTaille] = useState(true);

      useEffect(()=>{
        function allnotifs() {
            axios.get('http://localhost:8001/unread')
            .then(res => {
    
                let taille = 1;
                for(let elt of res.data){
                    
                    if(elt.user === localStorage.getItem('username')){
                        setID(elt.id);
                        localStorage.setItem("nbnotifications", elt.nbnotifs); 
                        //setEtat(false);
                        return
                    }else if(taille === res.data.length && !localStorage.getItem('username')){
                        navigate("/signin");
                    }
                    taille++;
               }
    
            })
            .catch(err => console.log(err));
        }
        allnotifs()
    }, [navigate])


    // Fonction qui enclenche et valide la suppression d'un utilisateur
    function deleteUser(id) {
        //alert(id)
        axios.delete('http://localhost:8081/deleteUser/'+id, {})
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
     }


    // Fonction permettant de retirer le marqueur rouge une fois qu'un utilisateur clique sur la cloche
    function removeMark() {
            //const actifUser = localStorage.getItem("username");
            axios.put('http://localhost:8081/notifUser/'+id, {})
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    // Fonction permettant d'activer le fournisseur d'alertes et de remettre nbnotis = 0 pour un utilisateur spécifique
    function provideAlerts() {
        //const actifUser = localStorage.getItem("username");
        //allnotifs();
        //alert(ID);
        setTimeout(() => {
            axios.put('http://localhost:8001/updateNbnotifs/'+ID, {})
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        }, 500);
}
    

    // constante permettant d'afficher le bouton Gérer utilisateur si l'utilisateur est un admin
    const [manage, setManage] = useState('none');

    useEffect(() => {
        if(localStorage.getItem("admin") === "oui"){
             setManage("block");
        }
    }, [])

    const [blockshowMenu, setBlockshowMenu] = useState('none');
    const [showMenu, setShowMenu] = useState('-100%');

    return (
        <div className='dashBlock' onClick={() => {
            if(showMenu === '0%'){
                setShowMenu('-100%');
                setTimeout(() => { setBlockshowMenu('none');}, 250)
            }
        }}>
            <div className='barre'>
              <span id='menu-item' onClick={() => {
                  setBlockshowMenu('block');
                  setTimeout(() => {setShowMenu('0%');}, 100)
              }}>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div className='sectionNotifs'>
                 <img src={logout} id='logout' alt='profil' onClick={()=>{
                    navigate("/signin");
                    localStorage.setItem("username", '');
                 }}/>
                 <div id='bellBlock'>
                    <span style={{
                        borderWidth: 2,
                        borderColor: 'red',
                        width: 20,
                        height: 20,
                        position: 'absolute',
                        display: onBell
                    }} id='marqueur'></span><img src={bell} id='bell' alt='profil' onClick={()=>{
                        removeMark();
                        provideAlerts();
                        navigate('/notifications');
                       // window.location.href = "http://localhost:3000/notifications";
                     }}/>
                 </div>
                 <img src={profil} id='profil' alt='profil'/>
                 <h4>{localStorage.getItem("username")}</h4>
              </div>
            </div>

            <div style={{
                width: '100%',
                height: '100vh',
                borderWidth: 2,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 0, 0, 0.381)',
                position: 'fixed',
                top: 0,
                left: 0,
                display: blockshowMenu
            }}>
                <div className='forMenu' style={{transform: 'translateX('+showMenu+')'}}>
                <img src={logoSite} alt='siteLogo' onClick={() => {
                    window.location.href = "http://localhost:3000/home";
                }}/>
                <button><Link to="/dashboard">Dashboard</Link></button>
                <button><Link to="/home">Acceuil</Link></button>
                <button><Link to="/ajouter">Nouvelle Alerte +</Link></button>
                <button><Link to="/gerer">Gérer les Alertes</Link></button>
                <button onClick={()=>{removeMark(); provideAlerts(); navigate('/notifications');}}>Alertes récentes</button>
                <button style={{display: manage}}><Link to="/management">Gérer Utilisateurs</Link></button>
                <button onClick={() => {deleteUser(id); localStorage.setItem("username", '')}}><Link to="/home">Supprimer Compte</Link></button>
                </div>
            </div>

        </div>
    );
};

export default Drawer;