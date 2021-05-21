const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');


// ====================================================
//                       GET ROUTES
// ====================================================

// SEARCH RESULTS - by categories with a specified limit
router.get('/:id', (req, res) => {
    const search = req.query.userInput;
    const animeURL = `https://kitsu.io/api/edge/anime?page[limit]=2&filter[categories]=${search}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data;
        console.log(data);
        console.log("----------------- END ------------------");
        res.render('anime/results', {animeResults: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});


// DETAILS PAGE - displays all the details associated with a specific anime
router.get('/anime/:anime_Id', (req, res) => {
    const animeId = req.params.anime_id;
    const animeURL = `https://kitsu.io/api/edge/anime/${animeId}`;
    axios.get(animeURL).then(response => {
        const data = response.data.data;
        console.log(data);
        res.render('anime/details', {anime: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
})


// ====================================================
//                       POST ROUTES
// ====================================================



module.exports = router;