const db = require('./models');

async function fetchAnimeFromUser() {
    const anime = await db.anime.findOne({
        where: {title: 'Cowboy Bebop'}
    });
    const user = await anime.getUsers();
    console.log(user);
};
// fetchAnimeFromUser();


async function fetchUsersFromAnime() {
    const user = await db.user.findOne({
        where: {name: 'Test'}
    });
    const anime = await user.getAnimes();
    console.log(anime);
};
fetchUsersFromAnime();


async function addAnimeToUser() {
    const user = await db.user.findOne({
        where: {name: 'Test'}
    });
    const anime = await db.anime.findOne({
        where: {title: 'Cowboy Bebop'}
    });
    const info = await user.addAnime(anime);
    console.log(info);
}
// addAnimeToUser();