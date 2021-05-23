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
        res.render('anime/favorites', {favorites: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});

// SEARCH RESULTS - by categories with a specified limit
router.get('/:id', (req, res) => {
    const search = req.query.userInput;
    const animeURL = `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${search}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data;
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
        res.render('anime/details', {anime: data})
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});


// ====================================================
//                       POST ROUTES
// ====================================================

// FAVORITES FUNCTIONALITY - adds animes to users favorites list
router.post('/favorites', isLoggedIn, (req, res) => {
    db.user.findOne({where: {id: req.user.id}})
    .then(foundUser => {
        db.anime.findOne({where: {uniqueId: req.body.uniqueId}})
        .then(foundAnime => {
            if (foundAnime) {
                foundUser.addAnime(foundAnime)
                .then(() => {
                    res.redirect('/anime/favorites');
                }).catch(error => {
                    console.log(error);
                })
            } else {
                db.anime.create({
                    uniqueId: req.body.uniqueId,
                    title: req.body.animeTitle,
                    image: req.body.animeImage
                }).then(createdAnime => {
                    foundUser.addAnime(createdAnime)
                    .then(() => {
                        res.redirect('/anime/favorites');
                    }).catch(error => {
                        console.log('----------------- ERROR -----------------');
                        console.log(error);
                    })
                }).catch(error => {
                    console.log('----------------- ERROR -----------------');
                    console.log(error);
                })
            }
        }).catch(error => {
            console.log('----------------- ERROR -----------------');
            console.log(error);
        })
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});


// DELETE FUNCTIONALITY - deletes anime from users favorites list
router.delete('/favorites/:id', isLoggedIn, (req, res) => {
    const id = req.params.id;
    db.anime.destroy({
        where: {id: id}
    }).then(() => {
        res.redirect('/anime/favorites');
    }).catch(error => {
        console.log('----------------- ERROR -----------------');
        console.log(error);
    })
});

module.exports = router;