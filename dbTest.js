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

/*
<% if (anime.coverImage) { %>
  <img src="<%= anime.attributes.posterImage.small %>" alt="<%= anime.attributes.titles.en %>" >
<% } %>

<p><strong>Anime Name:</strong> <%= anime.attributes.titles.en %></p>
<p><strong>Description</strong><br/> <%= anime.attributes.description %></p>


<a href="/">&larr; Home</a>
</ul>
*/