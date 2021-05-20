const { default: axios } = require('axios');
let express = require('express');
let router = express.Router();


// ====================================================
//                       GET ROUTES
// ====================================================
router.get('/:id', (req, res) => {
    const search = req.query.userInput;
    const animeURL = `https://kitsu.io/api/edge/anime?filter[text]=${search}`;
    axios.get(animeURL).then(response => {
        let data = response.data.data[0].attributes;
        console.log(data);
        res.render('anime/details', {anime: data})
    })
})


// ====================================================
//                       POST ROUTES
// ====================================================
// Working on it

module.exports = router;