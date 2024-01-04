const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
//app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' })); // Limite la taille du JSON à 10 MB
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Limite la taille des URL encodées
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "alertes"
})

// API pour la récupértion des alertes dans la BD
app.get('/alertes', (re, res) => {
    const sql = "SELECT * FROM alertes";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
} )

// API pour ajouter (POST Method) des alertes dans la BD
app.post('/addAlert', (req, res) => {
    const sql = "INSERT INTO alertes (`nom`, `description`, `categorie`, `image`, `user`) VALUES (?)";
    const values = [
        req.body.nom,
        req.body.description,
        req.body.categorie,
        req.body.imgUrl,
        req.body.user
    ]

    db.query(sql, [values], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour mettre à jour (PUT Method) des alertes dans la BD
app.put('/updatealerte/:id', (req, res) => {
    const { nomnot, descriptionnot, categorienot, imagenot } = req.body;
    const id = req.params.id;
    const sql = "UPDATE alertes SET `nom` = ?, `description` = ?, `categorie` = ?, `image` = ? WHERE `id` = ?";
    db.query(sql, [nomnot, descriptionnot, categorienot, imagenot, id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour la suppression d'une alerte particulière dans la BD
app.delete('/deleteAlerte/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM alertes WHERE `id` = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

app.listen(8000, () => {
    console.log("Service pour la gestion des alertes mis en marche au port 8000 ...");
})