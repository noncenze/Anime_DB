// IMPORTS
const axios = require('axios');
const express = require('express');
const app = express();
const db = require('./models');


// TEST HARD CODING
const cowboyBebop = [
  {
  title: 'Cowboy Bebop',
  type: 'tv',
  image: 'https://media.kitsu.io/anime/poster_image/1/small.jpg?1597604210',
  episodeCount: 26,
  averageRating: 82.22,
  popularityRank: 31
  }
];

function addAnime(anime) {
  db.anime.bulkCreate(anime)
  .then(newAnime => {
    console.log(newAnime);
  })
  .catch(error => {
    console.log(error);
  });
}
// addAnime(cowboyBebop);