const express = require('express');
const router = express.Router();
const helper = require("../../helper");
const request = require("request");


router.get('/', function(req, res, next) {


    request
        .get(helper.getParams('get-match-details', req.query), function callBack(err, httpResponse, data) {
            if (err) {
                return console.error('upload failed:', err);
            }

            // console.log(data);

            var nameOfMatch = data.name;
            var instance_id = data.instance_id;
            var channels = Object.keys(data.channels);
            var teams = [];

            for (var i in channels) {

                if (data.channels[channels[i]].type == "team") {

                    teams.push(channels[i]);

                }

            }


            res.render('match-view', {

                title: nameOfMatch,
                instance_id: instance_id,
                teams: teams,
                teamProps: data.channels
            });

        });


    // Object.assign(response, req.query);
    // response.last_timestamp = 0;
    // delete response.both;
    // delete response.name;




});

module.exports = router;