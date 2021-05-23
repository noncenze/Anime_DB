// IMPORTS
const { default: axios } = require('axios');
const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();
const db = require('../models');
const passport = require('../config/ppConfig');


// ====================================================
//                       GET ROUTES
// ====================================================

// USER FAVORITES - displays all of the user's favorited anime
router.get('/favorites', isLoggedIn, (req, res) => {
    db.user.findOne({
        where: {id: req.user.id},
        include: [db.anime]
    }).then(response => {
        let data = response.dataValues.animes
        console.log(data);
        res.render('anime/favorites', {favorites: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});

// SEARCH RESULTS - by categories with a specified limit
router.get('/:id', (req, res) => {
    const search = req.query.userInput;
    const animeURL = `https://kitsu.io/api/edge/anime?page[limit]=5&filter[text]=${search}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data;
        // console.log(data);
        console.log("------------------ END ------------------");
        res.render('anime/results', {animeResults: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});

// DETAILS ROUTE - displays all the details associated with a specific anime
router.get('/details/:id', isLoggedIn, (req, res) => {
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


// ====================================================
//                       POST ROUTES
// ====================================================

// FAVORITES FUNCTIONALITY - saves items to a user's favorites list
router.post('/favorites', isLoggedIn, async (req, res) => {
    try {
        const favoriteAnime = await db.anime.findOrCreate({
            where: {
                title: req.body.animeTitle,
                uniqueId: req.body.uniqueId,
                image: req.body.animeImage
            }
        });
        const userAccount = await db.user.findOne({
            where: {id: req.user.id}
        });
        userAccount.addAnimes(favoriteAnime);
        console.log("USER INFORMATION -----------> ", userAccount);
        res.redirect('/anime/favorites');
    } catch (error) {
        console.log('----------------- ERROR -----------------');
        console.log(error);
        res.redirect('/anime/favorites');
    }
});


// DELETE FUNCTIONALITY - deletes from favorites list
router.delete('/favorites/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    db.anime.destroy({
        where: {id: id}
    }).then(response => {
        console.log(response);
        res.redirect('/anime/favorites');
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});


module.exports = router;