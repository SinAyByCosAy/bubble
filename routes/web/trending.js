const express = require('express');
const router = express.Router();
const helper = require("../../helper");
const request = require("request");


router.get('/', function(req, res, next) {


    request
        .get(helper.getParamsTrending('trending', req.query), function callBack(err, httpResponse, data) {
            if (err) {
                return console.error('upload failed:', err);
            }


            var channels = Object.keys(data.trending_channels);
            var channelsData = data.trending_channels;
            var instance_id = data.instance_id;

            res.render('trending', {
                title: 'Trending',
                instance_id: instance_id,
                channels: channels,
                channelsData: channelsData
            });

        });

});

module.exports = router;