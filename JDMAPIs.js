/* Imports */
const express = require('express');
const apicache = require('apicache');
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cache = apicache.middleware;
const Port = process.env.DB_PORT ?? 3000;

const url = process.env.DB_URL;
const key = process.env.DB_KEY;

const app = express();

const supabase = createClient(url, key);

app.disable('x-powered-by');
app.use(express.json());
app.use(cache('10 minutes'));

/* EndPoints */

app.get('/' , (req,res) => {
  fs.readFile('./endpoints.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON', err);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    res.json(JSON.parse(data));
  });
})

app.get('/v1/autos',  async(req,res) => {
  const { nombreAuto } = req.query;

  try {
    let query = supabase.from('coches').select('*,  motorid:motores(tipo,nombre,caballosdefuerza)');

    if(nombreAuto){
      query = query.like('modelo', `%${nombreAuto}%`);
    }

    const { data: autos, error } = await query;

    if (error) {
      console.error('Error al realizar la consulta:', error);
      throw error;
    }

    res.json(autos);
  } catch (error) {
    console.error('Error al realizar la consulta:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/v1/autos/:id', async (req,res) => {
    const  autoId  = req.params.id;
    try {
      const { data: autos, error } = await supabase
        .from('coches')
        .select('*')
        .eq('autoid', autoId)
  
      if (error) {
        console.error('Error al realizar la consulta:', error);
        throw error;
      }
  
      res.json(autos);
    } catch (error) {
      console.error('Error al realizar la consulta:', error.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/v1/marcas', async (req,res) => {
  try {
    const { data: marcas, error } = await supabase
      .from('marcas')
      .select('*')

    if (error) {
      console.error('Error al realizar la consulta:', error);
      throw error;
    }

    res.json(marcas);
  } catch (error) {
    console.error('Error al realizar la consulta:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/v1/motores', async (req,res) => {
  try {
    const { data: motores, error } = await supabase
      .from('motores')
      .select('*')

    if (error) {
      console.error('Error al realizar la consulta:', error);
      throw error;
    }

    res.json(motores);
  } catch (error) {
    console.error('Error al realizar la consulta:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

/* App Started */

app.listen(Port, () => console.log(`Servidor iniciado en el puerto ${Port}`));