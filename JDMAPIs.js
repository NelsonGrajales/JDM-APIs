/* Imports */
const express = require('express');

const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: ' ',
    user: ' ',
    password: ' ',
    database: ' '
})

connection.connect();

app.use(express.json());

/* EndPoints */

app.get('/v1/autos', (req,res) => {

});

app.get('/v1/autos/:id', (req,res) => {

});

app.get('/v1/marcas', (req,res) => {

});

app.get('/v1/motores', (req,res) => {

});

/* App Started */

app.listen(3000, () => console.log('server started'));