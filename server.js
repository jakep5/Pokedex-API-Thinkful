const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

console.log(process.env.API_TOKEN)

app.use(morgan('dev'))

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

app.use(function validateBearerToken(req, res, next) {
    console.log('validate bearer token middleware')
    //move to next middleware/callback function
    next(); //if this is not included, request would just hang here and not continue on - IMPORTANT*****
})

function handleGetTypes(req, res) {
    res.json(validTypes)
}

app.get('/types', handleGetTypes) //the get request to /types endpoint gets routed to the handleGetTypes function

app.get('/pokemon', handleGetPokemon)

function handleGetPokemon(req, res) {
    res.send('Hello, Pokemon!');
}

app.use((req, res) => {
    res.send('Hello, world! What is up?')
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})
