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
    database: "users"
})

//// API pour la récupértion des utilisateurs dans la BD
// app.get('/', (re, res) => {
//     return res.json("from Backend");
// } )

// API pour la récupértion des utilisateurs dans la BD
app.get('/users', (re, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
} )

// API pour ajouter (POST Method) des utilisateurs dans la BD
app.post('/addUser', (req, res) => {
    const sql = "INSERT INTO users (`username`, `email`, `password`, `admin`, `notification`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.admin,
        req.body.notification,
    ]

    db.query(sql, [values], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour gérer la mise à jour notification dans la BD
app.put('/notif', (req, res) => {
    const noti = 'oui';
    const sql = "UPDATE users SET `notification` = ?";
    db.query(sql, [noti], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour remet à nul la notification d'un utilisateur particulier dans la BD
app.put('/notifUser/:id', (req, res) => {
    const noti = 'non';
    const id = req.params.id;
    const sql = "UPDATE users SET `notification` = ? WHERE `id` = ?";
    db.query(sql, [noti, id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

// API pour la suppression d'un utilisateur particulier dans la BD
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE `id` = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("error");
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Service pour la gestion des utilisateurs mis en marche au port 8081 ...");
})