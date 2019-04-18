const express = require('express');
const router = express.Router();
const helper = require("../../../helper");


router.get('/', function(req, res, next) {

    var response = {};
    Object.assign(response, req.query);

    res.render('bot-web-view', {
        name: req.query.name,
        params: JSON.stringify(req.query),
    });


});

module.exports = router;