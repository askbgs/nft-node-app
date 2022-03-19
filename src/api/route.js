const express = require('express');
const actions = require('./controllers/action_controller')
const jwttoken = require('jsonwebtoken');
const fs = require('fs');
const { route } = require('./emojis');

const router = express.Router();
const app = express();

router.get('/', (req, res) => {
    res.send('Welcome to node-nft-with-mongodb')
});


router.post('/adduser', actions.addNewuser);
router.post('/login', actions.authentcate);

module.exports = router