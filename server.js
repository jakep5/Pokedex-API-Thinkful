const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const POKEDEX = require('./pokedex.json')

const app = express();

console.log(process.env.API_TOKEN)

app.use(morgan('dev'));
app.use(cors());

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN;
    const authToken = req.get('Authorization') //req.get('header-name') will access provided headers by the user
    console.log('validate bearer token middleware')
    //move to next middleware/callback function
    if(!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request'})
    }
    next(); //if this is not included, request would just hang here and not continue on - IMPORTANT*****
})

function handleGetTypes(req, res) {
    res.json(validTypes)
}

app.get('/types', handleGetTypes) //the get request to /types endpoint gets routed to the handleGetTypes function

app.get('/pokemon', handleGetPokemon)

function handleGetPokemon(req, res) {
    let response = POKEDEX.pokemon;

    if (req.query.name) {
        response = response.filter(pokemon => 
            pokemon.name.toLowerCase().includes(req.query.name.toLowerCase()));
    }

    if(req.query.type) {
        response = response.filter(pokemon => 
            pokemon.type.includes(req.query.type))
    }

    res.json(response);
}

app.use((req, res) => {
    res.send('Hello, world! What is up?')
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})
