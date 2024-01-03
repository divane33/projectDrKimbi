const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors())

// API pour la récupértion des utilisateurs dans la BD
app.get('/', (re, res) => {
    return res.json("from Backend");
} )

app.listen(8081, () => {
    console.log("Service pour la gestion des utilisateurs mis en marche...");
})