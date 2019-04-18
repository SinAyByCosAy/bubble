const express = require('express');
const request = require('request');
const router = express.Router();
const helper = require("../../../helper");
const path = require('path');
const webshot = require('webshot');



router.get('/', function(req, res, next) {

    var teamResponse = req.query;
    var channel = teamResponse.channel;
    var instance_id = teamResponse.instance_id;
    var singleOrBoth = channel == "both" ? 2 : 1;

    teamResponse.last_timestamp = 0;

    if (singleOrBoth == 1) {
        var flag = teamResponse.img_url;
        delete teamResponse.img_url;

        request
            .get(helper.getParams('get-index-data', teamResponse), function callBack(err, httpResponse, data) {
                if (err) {
                    res.send([{ "text": "Get Index Data Failed" }]);
                }

                var neg = data[data.length - 1][channel].neg;
                var pos = data[data.length - 1][channel].pos;

                var screenshotUrl = helper.screenshotURL(channel, flag, neg, pos);

                console.log(screenshotUrl);

                var date = new Date().getDate();

                var savePath = path.join('/root/bot/public', 'img', 'screenshot', channel + '-screenshot-' + date + '.jpeg');
                var image_url = String(path.join(helper.ip, 'img', 'screenshot', channel + '-screenshot-' + date + '.jpeg'));
                var title = String(helper.capitalizeFirstLetter(channel));

                var webview_url = helper.webviewURL(channel, channel, instance_id);

                var quick_replies = helper.quickReplies(instance_id);

                var payload = {
                    "messages": [{
                        "attachment": {
                            "type": "template",
                            "payload": {
                                "template_type": "generic",
                                "image_aspect_ratio": "square",
                                "elements": [{
                                    "title": title,
                                    "image_url": helper.ip + "img/screenshot/" + channel + '-screenshot-' + date + '.jpeg',
                                    "buttons": [{
                                        "type": "web_url",
                                        "url": webview_url,
                                        "title": "View More!",
                                        "webview_height_ratio": "full",

                                    }]
                                }]
                            }
                        }
                    }, {
                        "text": "In addition you can do the following as well:",
                        "quick_replies": quick_replies
                    }]
                };


                webshot(screenshotUrl, savePath, helper.optionsPhone, function(err) {
                    console.log(err);
                    res.send(payload);
                });




            });

    }
});

module.exports = router;