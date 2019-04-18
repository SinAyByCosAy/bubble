module.exports = {
    getParams: function(url, params) {
        return { url: module.exports.customUrlGenerator(url), qs: params, json: true };
    },

    customUrlGenerator: function(url) {
        return "https://api.bubble.social/" + url;
    },

    getParamsTrending: function(url, params) {
        return { url: module.exports.customUrlGeneratorTrending(url), qs: params, json: true };
    },

    customUrlGeneratorTrending: function(url) {
        return "https://trendingapi.bubble.social/" + url;

    },

    capitalizeFirstLetter: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    ip: "https://bubble.social/",

    optionsPhone: {
        screenSize: {
            width: 320,
            height: 480
        },
        shotSize: {
            width: 320,
            height: 'all'
        },
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)' +
            ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
    },

    screenshotURL: function(channel, flag, neg, pos) {

        return "" + module.exports.ip + "screenshot?&channel=" + channel + "&flag=" + flag + "&neg=" + neg + "&pos=" + pos;

    },

    webviewURL: function(match_id, channel_id, playerOrTeam, name) {

        playerOrTeam = playerOrTeam == "player" ? "&player_id=" : "&team_id=";

        return "" + module.exports.ip + "get-webview?match_id=" + match_id + playerOrTeam + channel_id + "&name=" + name;


    },

    quick_replies_options: {
        "trending": "Trending Players",
        "hero": "Hero",
        "zero": "Zero",
        "buzz": "Team Buzz"
    },

    quickReplies: function(match_id, type) {

        type = type || "general";
        var options = module.exports.quick_replies_options;
        var ip = module.exports.ip;
        var quick_replies = [];

        for (var key in options) {
            if (options.hasOwnProperty(key)) {

                if (key != type) {

                    if (key != "buzz") {
                        quick_replies.push({
                            "url": ip + "quick-replies?type=" + key + "&match_id=" + match_id,
                            "type": "json_plugin_url",
                            "title": options[key]
                        });
                    } else {

                        if (type != "general") {
                            quick_replies.push({

                                "url": ip + "get-buzz" + "?match_id=" + match_id,
                                "type": "json_plugin_url",
                                "title": options[key]
                            });
                        }

                    }
                }



            }
        }

        return quick_replies;

    }

};