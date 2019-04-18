var express = require('express');
var router = express.Router();
const helper = require("../helper.js");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("Hey I am a Bubble Social Chatbot");
});

module.exports = router;