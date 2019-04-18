const express = require('express');
const router = express.Router();
const request = require('request');
const async = require('async');
const helper = require("../../../helper");


router.get('/', function(req, res, next) {

    console.log(req.query);

    var type = req.query.type;
    var match_id = req.query.match_id;

    request
        .get(helper.getParams('get-trendings', req.query), function callBack(err, httpResponse, data) {


            var payload,
                elements = [],
                quick_replies = helper.quickReplies(match_id, type),
                requestedPlayers,
                i;


            if (type == "trending") {
                requestedPlayers = data.trending;
            } else if (type == "hero") {
                requestedPlayers = data.heros;
            } else if (type == "zero") {
                requestedPlayers = data.zeros;
            }

            async.map([...requestedPlayers], fetchplayerDetails, function(err, results) {
                if (err) {

                } else {

                    for (i in results) {

                        var player = results[i];

                        console.log(player);

                        elements.push({
                            "title": player.pretty_name,
                            "image_url": player.image_url,
                            "subtitle": "Tweet Count: " + player.tweets_count,
                            "buttons": [{
                                "type": "web_url",
                                "url": player.webview,
                                "title": "View More",
                                "webview_height_ratio": "full",
                            }]
                        });

                    }

                    payload = {
                        "messages": [{
                            "attachment": {
                                "type": "template",
                                "payload": {
                                    "template_type": "generic",
                                    "elements": elements
                                }
                            }
                        }, {
                            "text": "In addition you can do the following as well:",
                            "quick_replies": quick_replies
                        }]
                    };

                    res.send(payload);
                }
            });
        });


    var fetchplayerDetails = function(playerObj, callBack) {

        request
            .get(helper.getParams('get-player-details', { "player_id": playerObj.id }), function(err, httpResponse, data) {
                if (err) {
                    callBack(err);
                } else {

                    var obj = {

                        'player_id': data.id,
                        'name': data.name,
                        'pretty_name': data.pretty_name,
                        'image_url': data.image_url,
                        'team_id': data.team,
                        'webview': helper.webviewURL(match_id, data.id, "player", data.name),
                        'tweets_count': playerObj.tweets_count

                    };

                    callBack(null, obj);
                }
            });
    };

});

module.exports = router;