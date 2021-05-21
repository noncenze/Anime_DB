const { default: axios } = require('axios');
const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();
const db = require('../models');


// ====================================================
//                       GET ROUTES
// ====================================================

// SEARCH RESULTS - by categories with a specified limit
router.get('/:id', (req, res) => {
    const search = req.query.userInput;
    const animeURL = `https://kitsu.io/api/edge/anime?page[limit]=3&filter[text]=${search}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data;
        console.log("------------------ END ------------------");
        res.render('anime/results', {animeResults: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});


// DETAILS ROUTE - displays all the details associated with a specific anime
router.get('/details/:id', (req, res) => {
    const animeId = req.params.id;
    const animeURL = `https://kitsu.io/api/edge/anime/${animeId}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data;
        console.log(data);
        res.render('anime/details', {anime: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});


// FAVORITES ROUTE - displays a list of all the anime that have been favorited


// ====================================================
//                       POST ROUTES
// ====================================================


module.exports = router;