const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();



// create express server

const app = express();

// Data base

dbConnection();

// CORS

app.use(cors());

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