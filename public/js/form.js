if (window.location.pathname == "/form") {
    var $ = jQuery;


    var data = {
        "name": "",
        "pretty_name": "",
        "start": "",
        "index": {},
        "channels": {},
        "event_type": "cricket-match",
        "events": { "balls": [] },

    };


    $('.form-details').hide();

    $('#event-btn').click(function(event) {

        event.preventDefault();

        $('#event').hide();
        var nameOfTour = $('#nameOfTour').val();
        var nameOfMatch = $("#nameOfMatch").val();
        var start = toUnix($("#start").val());
        data.name = nameOfTour;
        data.pretty_name = nameOfMatch;

        data.start = start;

        $("#preview").val(prettyPrint(data));
        $('#event-btn').hide();
        $('.form-details').show();
    });





    if ($('#type').val() == "team") {

        $('#team-container').hide();
    }


    $('#type').on('change', function() {

        if (this.value == "team") {
            $('#team-container').hide();

        } else {
            $('#team-container').show();
        }
    });

    $('#submit').click(function(event) {
        var type = $('#type').val(),
            name = $('#name').val().trim(),
            key = name.toLowerCase().split(' ').filter(Boolean).join('_'),
            keywords = $('#keywords').val().split(",").map(function(keyword) { return keyword.replace(/\s+/g, ''); }),
            url = $('#url').val();


        if ($('#type').val() == "team") {
            data.channels[key] = getObject(name, type, url, keywords, null);
        } else {


            team = $('#team').val().toLowerCase().replace(" ", "_");
            data.channels[key] = getObject(name, type, url, keywords, team);

        }

        var channels = Object.keys(data.channels);
        var teams = [];

        if (channels.length == 2) {

            $("#team")
                .append('<option value=' + channels[0] + '>' + channels[0] + '</option>')
                .append('<option value=' + channels[1] + '>' + channels[1] + '</option>');

            $('#team-container').show();
            $('#type').val('player');

        }


        $("#details-submit").html(name + " details stored");

        $.each($('.data'), function(index, element) {
            $(element).val('');
        });

        $('#nameOfEvent').hide();

        $("#preview").val(prettyPrint(data));

    });


    $('#add-to-db').click(function(event) {

        event.preventDefault();

        var postObj = JSON.parse($("#preview").val());

        $.ajax(customSettings(urlGenerator('add-match-details'), postObj))
            .done(function() {
                console.log("POSTED");
            })
            .fail(function(jqXHR, textStatus, errorThrown) {

                console.log("ERROR");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
    });





} else if (window.location.pathname == "/form-events") {

    $("#form").hide();

    var postData = {
        "match_id": "",
        "name": "",
        "comment": "",
        "players": "",
        "time": "",

    };

    $.getJSON(urlGenerator('get-live-matches')).then(function(data) {

        console.log(data);

        for (var i in data) {

            $("#select-match").append('<option value=' + data[i].id + '>' + data[i].name + '</option>');

        }
        $("#event-details").hide();
        $("#form").show();


        $('#select-match').change(function() {
            $("#event-details").hide();

            if (this.value != "no") {

                var match_id = this.value;

                postData.match_id = match_id;

                $("#preview").val(prettyPrint(postData));

                $("#select-player").empty();

                $.getJSON(urlGenerator('get-players'), { match_id: match_id }).then(function(players) {

                    console.log(players);

                    for (var p in players) {
                        $("#select-player")
                            .append('<option value=' + players[p].id + '>' + players[p].name + '</option>');
                    }

                    $("#event-details").show();

                    $('#submit').click(function(event) {

                        event.preventDefault();

                        var selectedPlayers = $("#select-player").val();

                        postData.name = $("#name").val();
                        postData.comment = $("#description").val();
                        postData.time = toUnix($("#time").val());
                        postData.players = selectedPlayers;

                        $("#preview").val(prettyPrint(postData));

                    });


                    $('#add-to-db').click(function(event) {

                        event.preventDefault();

                        var postObj = JSON.parse($("#preview").val());

                        $.ajax(customSettings(urlGenerator('add-event'), postObj))
                            .done(function() {
                                console.log("POSTED");
                            })
                            .fail(function(jqXHR, textStatus, errorThrown) {

                                console.log("ERROR");
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            });
                    });



                });
            }


        });


    });




}

function formeventsUrlGenerator(url) {
    return "http://localhost:5000/" + url;
}

function urlGenerator(url) {
    return "https://api.bubble.social/" + url;
}


function getObject(name, type, url, keywords, team) {

    team = team || null;

    return {
        "name": name,
        "team": team,
        "type": type,
        "img_url": url,
        "keywords": keywords
    };

}


function prettyPrint(object) {

    var pretty = JSON.stringify(object, undefined, 4);
    return pretty;
}


function customSettings(url, object) {

    return {
        "async": true,
        "crossDomain": true,
        "url": url,
        "type": "POST",
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify(object)
    };
}

function toUnix(date) {

    var stringDate = new Date(date);
    var epoch = stringDate.getTime() / 1000.0;
    return epoch;

}