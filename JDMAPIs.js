/* Imports */
const express = require('express');
const apicache = require('apicache');
require('dotenv').config();
const cache = apicache.middleware;

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
}
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection(dbConfig)

connection.connect();

app.use(express.json());
app.use(cache('10 minutes'));

/* EndPoints */

app.get('/v1/autos', (req,res) => {
    const query = `
    SELECT Autos.AutoID, Autos.Modelo, Autos.AnioLanzamiento,
           Motores.NombreMotor,Marcas.NombreMarca
    FROM Autos
    JOIN Motores ON Autos.MotorID = Motores.MotorID
    JOIN Marcas ON Autos.MarcaID = Marcas.MarcaID`;
  
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error en la consulta:', error);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(results);
  });
});

app.get('/v1/autos/:id', (req,res) => {
    const  autoId  = req.params.id;
    const query = `
       SELECT Autos.AutoID, Autos.Modelo, Autos.AnioLanzamiento,
       Motores.NombreMotor,Marcas.NombreMarca
       FROM Autos
       JOIN Motores ON Autos.MotorID = Motores.MotorID
       JOIN Marcas ON Autos.MarcaID = Marcas.MarcaID WHERE AutoID = ${autoId}`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            res.status(500).send('Error en el servidor');
            return;
          }
          res.json(results);
    })
});

app.get('/v1/marcas', (req,res) => {

});

app.get('/v1/motores', (req,res) => {

});

/* App Started */

app.listen(3000, () => console.log('server started'));


