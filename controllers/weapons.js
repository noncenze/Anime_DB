const { default: axios } = require('axios');
let express = require('express');
let app = express();
let router = express.Router();


// GET /:weaponID - displays monsters information
router.get('/:id', (req, res) => {
    let id = req.params.id;
    let monsterHunterURL = `https://mhw-db.com/weapons/${id}`;
    axios.get(monsterHunterURL).then(response => {
        let data = response.data;
        console.log(data);
        res.render('weapon/index', {data: data});
    })
})


module.exports = router;