
'use strict';


const express = require('express');

const cors = require('cors');

const server = express();
const Data = require('./ Movie Data/data.json');


server.use(cors());

const PORT = 3000;


function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

//Routes

server.get('/', (req, res) => {

    const formattedMovies = new Movie(Data.title, Data.poster_path, Data.overview)
    res.status(200).json(formattedMovies);
})

server.get('/favorite', (req, res) => {
    res.send('Welcome to Favorite Page')
})

server.get('/error', (req, res) => {
    const temp = {
        status: 500,
        responseText: "Sorry, something went wrong"
    }

    res.status(500).json(temp)
})
server.get('*', (req, res) => {
    const temp = {
        status: 404,
        responseText: "page not found"
    }
    res.status(404).json(temp);
})
server.listen(PORT, () => {
    console.log('Server listening on port 3000');
})