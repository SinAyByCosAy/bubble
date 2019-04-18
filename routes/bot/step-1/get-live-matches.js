const express = require('express');
const request = require('request');
const router = express.Router();
const helper = require("../../../helper");

/* GET live matches. 
Usecases: 
1. Bot Step 1 - get live matches. 
*/


router.get('/', function(req, res, next) {

    request
        .get(helper.getParams('get-live-matches', { type: 'cricket-match' }), function callBack(err, httpResponse, data) {
            if (err) {
                return console.error('upload failed:', err);
            }

            var elements = [];

            for (var i in data) {

                // Add for subtitle: "subtitle": data[i].pretty_name

                elements.push({
                    "title": data[i].pretty_name,
                    "image_url": data[i].url,
                    "buttons": [{
                        "url": helper.ip + "get-buzz" + "?match_id=" + data[i].id,
                        "title": "Track this!",
                        "type": "json_plugin_url"
                    }]
                });
            }


            var liveData = {
                "messages": [{
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": elements
                        }
                    }
                }]
            };


            res.send(liveData);
        });


});


module.exports = router;