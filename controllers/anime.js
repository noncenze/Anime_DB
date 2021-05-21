const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');


// ====================================================
//                       GET ROUTES
// ====================================================
router.get('/:id', (req, res) => {
    const search = req.query.userInput;
    const animeURL = `https://kitsu.io/api/edge/anime?filter[text]=${search}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data[0].attributes;
        let data2 = response.data.data;
        console.log(data2);
        res.render('anime/details', {anime: data})
    })
})


// router.get('/:id', (req, res) => {
//     const search = req.query.userInput;
//     const animeURL = `https://kitsu.io/api/edge/anime?page[limit]=3&filter[categories]=${search}`;
//     axios.get(animeURL).then(response => {
//         let data = response.data.data;
//         data.forEach(element => {
//             console.log(element)
//             res.render('anime/results', {anime: data});
//             })
//         })
// })






// ====================================================
//                       POST ROUTES
// ====================================================
// router.post('/favorites', (req, res) => {
//     db.anime.findOrCreate({
//         where: {title: req.body.}
//     })
// })


module.exports = router;


// Iterating through objects
// const newArray = [];
// .then (response => {
//     data = response.data
//     for (let i = 0; i < data.length; i++) {
//         const element = data[i];
//         if (element.coverImage) {
//             newArray.push(element);
//         } else {
//             continue
//         }
//     }
// })