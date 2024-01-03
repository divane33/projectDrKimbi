const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "fournisseuralertes"
})

// API pour la récupértion des utilisateurs dans la BD
app.get('/unread', (re, res) => {
    const sql = "SELECT * FROM alertesnonlues";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
} )

// API pour ajouter (POST Method) des utilisateurs dans la BD
app.post('/addNbnotif', (req, res) => {
    const sql = "INSERT INTO alertesnonlues (`user`, `nbnotifs`) VALUES (?)";
    const values = [
        req.body.username,
        0
    ]

    db.query(sql, [values], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour gérer la mise à jour notification dans la BD
app.put('/updatenotif', (req, res) => {
    const sql = "UPDATE alertesnonlues SET `nbnotifs` = `nbnotifs` + 1";
    db.query(sql, [], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour remet à nul la notification d'un utilisateur particulier dans la BD
app.put('/updateNbnotifs/:ID', (req, res) => {
    const noti = 0;
    const id = req.params.ID;
    const sql = "UPDATE alertesnonlues SET `nbnotifs` = ? WHERE `id` = ?";
    db.query(sql, [noti, id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

app.listen(8001, () => {
    console.log("Service pour la fournission d'alertes mis en marche au port 8001 ...");
})