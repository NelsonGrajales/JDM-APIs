/* Imports */
const express = require('express');

const app = express();

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