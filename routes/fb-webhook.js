const express = require('express');
const request = require('request');
const router = express.Router();


router.get('/', function(req, res, next) {

    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    }

    if (req.query['messaging_postbacks']) {
        console.log(req.query['messaging_postbacks']);

    }

    res.send('Error, wrong token')
});


module.exports = router;