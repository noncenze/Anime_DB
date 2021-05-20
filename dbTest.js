const { default: axios } = require('axios');
const express = require('express');
const app = express();
const db = require('./models');

app.get('/', (req, res) => {
    const animeURL = `https://kitsu.io/api/edge/anime?filter[categories]=adventure`;
    axios.get(animeURL).then(response => {
        let data = response.data;
        console.log(data);
        res.send('Kitsu API Working');
    })
})



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;