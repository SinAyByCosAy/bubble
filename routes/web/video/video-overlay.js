const express = require('express');
const router = express.Router();
const helper = require("../../../helper");


router.get('/', function(req, res, next) {


    res.render('video-overlay', {
        name: req.query.name,
        params: JSON.stringify(req.query),
    });


});

module.exports = router;