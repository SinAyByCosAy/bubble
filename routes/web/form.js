var express = require('express');
var router = express.Router();
const helper = require("../../helper");

router.get('/', function(req, res, next) {
    res.render('form');
});

module.exports = router;