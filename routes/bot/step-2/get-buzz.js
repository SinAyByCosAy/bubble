const express = require('express');
const request = require('request');
const async = require('async');
const helper = require("../../../helper");
const path = require('path');
const webshot = require('webshot');
const router = express.Router();

/* GET Match Details 
When person clicks on Track this on a live match, following things happen:
    * both teams participating are displayed with the last data point from the API being used for calculating bar chart. 
        * Bar chart are rendering in screenshot.ejs view and then programtically screenshotted using webshot. 
    * These 2 teams with the bar-chart-screenshot are displayed to the user. 
    * The person can click on any team's view more (webview url) to explore the buzz. 
*/


router.get('/', function(req, res, next) {

    var match_id = req.query.match_id;

    request
        .get(helper.getParams('get-teams', req.query), function callBack(err, httpResponse, teams) {
            if (err) {
                res.send([{ "text": "Get Index Data Failed" }]);
            }


            var teamsObject = teams.map(function(team) {
                return {
                    match_id: match_id,
                    team_id: team.id,
                    name: team.name,
                    flag: team.image_url
                };
            });

            async.map([...teamsObject], fetch, function(err, results) {
                if (err) {

                } else {
                    console.log("Fetching Done");

                    async.map(results, clickPhotu, function(err, r) {
                        if (err) {
                            console.log("Error in clickPhoto", err);
                        } else {

                            console.log("Image URL's done");

                            var quick_replies = helper.quickReplies(match_id);
                            var elements = [];
                            var date = new Date().getDate();
                            for (var i in results) {
                                var team = Object.keys(results[i])[0];

                                var obj = {};
                                obj.title = team;
                                obj.image_url = helper.ip + "img/screenshot/" + team + '-screenshot-' + date + '.jpeg';
                                obj.buttons = [{
                                    "type": "web_url",
                                    "url": results[i][team].webview,
                                    "title": "Explore Buzz",
                                    "webview_height_ratio": "full",
                                }];

                                elements.push(obj);

                            }


                            var payload = {
                                "messages": [{
                                        "attachment": {
                                            "type": "template",
                                            "payload": {
                                                "template_type": "generic",
                                                "image_aspect_ratio": "square",
                                                "elements": elements
                                            }
                                        }
                                    },
                                    {
                                        "text": "You can also check what people have to say about the players:",
                                        "quick_replies": quick_replies
                                    }
                                ]
                            };

                            res.send(payload);
                        }
                    });
                }
            });
        });


});




var clickPhotu = function(teamObj, callBack) {

    var team = teamObj[Object.keys(teamObj)];

    webshot(
        team.screenshot,
        team.savepath,
        helper.optionsPhone,
        function(err) {
            callBack(err);
        });

};


var fetch = function(team, callBack) {

    team.start_timestamp = -1;
    request
        .get(helper.getParams('get-index-data', team), function(err, httpResponse, data) {
            if (err) {
                callBack(err);
            } else {

                var teamObj = data[0][team.name];
                var date = new Date().getDate();
                var nameOfImg = team.name + '-screenshot-' + date + '.jpeg';
                var obj = {};

                obj[team.name] = {

                    'screenshot': helper.screenshotURL(team.name, team.flag, teamObj.neg, teamObj.pos),
                    'savepath': path.join(path.resolve("."), 'public/img/screenshot', nameOfImg),
                    'image_url': path.join(helper.ip, 'img/screenshot', nameOfImg),
                    'webview': helper.webviewURL(team.match_id, team.team_id, "team", team.name)

                };

                callBack(null, obj);
            }
        });
};

module.exports = router;