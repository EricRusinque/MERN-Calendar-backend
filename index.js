const express = require('express');
require('dotenv').config();


// create express server

const app = express();

// Public directory

app.use( express.static('public') )

// reading and parsing the body
app.use( express.json() )


// routes

app.use('/api/auth', require('./routes/auth'));
// TODO: CRUD: Events


// listen to requests

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}` )
})