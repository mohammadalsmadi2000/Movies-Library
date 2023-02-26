
'use strict';
// http://localhost:3000/search


const express = require('express');

const cors = require('cors');

const server = express();
const Data = require('./ Movie Data/data.json');
const { default: axios } = require('axios');
require('dotenv').config();


server.use(cors());
server.use(errorHandler)


const PORT = 3000;


function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

function MovieInfoFromApi(id, title, release_date, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}
//Routes

server.get('/', homeHandler)
server.get('/favorite', favoriteHandler)
server.get('/trending', trendingHandler);
server.get('/search', searchHandler);
server.get('/review', reviewHandler);
server.get('/TV', tvHandler);
server.get('*', defaultHandler)


function homeHandler(req, res) {
    const formattedMovies = new Movie(Data.title, Data.poster_path, Data.overview)
    res.status(200).json(formattedMovies);
}

function favoriteHandler(req, res) {
    res.send('Welcome to Favorite Page')
}

function trendingHandler(req, res) {
    const ApiKey = process.env.APIKey
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${ApiKey}&language=en-US`
    try {
        axios.get(url).then((result) => {

            let data = result.data.results;

            let sendInfo = data.map((val) => {
                return new MovieInfoFromApi(val.id, val.title || val.name, val.release_date || val.first_air_date, val.poster_path, val.overview)
            })

            res.json(sendInfo)
        }).catch((err) => {
            res.send(err);
        })
    } catch (error) {
        errorHandler(error, req, res,next);
    }

}
function searchHandler(req, res) {
    let ApiKey = process.env.APIKey
    // console.log(ApiKey)
    let searchWord = 'Harry%20Potter'
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&language=en-US&query=${searchWord}&page=2`
    try {
        axios.get(url).then((result) => {

            let data = result.data.results;

            let sendInfo = data.map((val) => {
                return new MovieInfoFromApi(val.id, val.title || val.name, val.release_date || val.first_air_date, val.poster_path, val.overview)
            })

            res.json(sendInfo)
        }).catch((err) => {
            res.send(err);
        })

    }
    catch (error) {
        errorHandler(error, req, res,next);
    }
}
function reviewHandler(req, res) {
    const idReview = process.env.idReview;
    const ApiKey = process.env.APIKey
    try {
        const url = `https:api.themoviedb.org/3/review/${idReview}?api_key=${ApiKey}`
        axios.get(url).then((result) => {
            res.json(result.data)
        }).catch((err) => {
            res.send(err);
        })
    } catch (error) {
        errorHandler(error, req, res,next);
    }


}
function tvHandler(req, res) {
    const id = '9813'
    const ApiKey = process.env.APIKey
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${ApiKey}`
    try {
        axios.get(url).then((val) => {
            res.json(val.data)
        }).catch((err) => {
            res.send(err);
        })
    } catch (error) {
        errorHandler(error, req, res,next);
    }

}

function defaultHandler(req, res) {
    const temp = {
        status: 404,
        responseText: "page not found"
    }
    res.status(404).send(temp)
}
function errorHandler(error, req, res, next) {
    const err = {
        status: 500,
        massage: error
    }

    res.status(500).send(err);
}

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})