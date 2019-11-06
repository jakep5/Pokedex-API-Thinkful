const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

function handleGetTypes(req, res) {


}

app.get('/types', handleGetTypes) //the get request to /types endpoint gets routed to the handleGetTypes function

app.use((req, res) => {
    res.send('Hello, world! What is up?')
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})
