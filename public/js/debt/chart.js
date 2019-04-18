var $ = jQuery;
var lineData = {};
var barData = {};
var gEvents = [];
var maxKey;

//Graph Global Objects
var graph;
var hoverDetail;

$.when(
        $.ajax(customSettings(urlGenerator('get-index-data'), instance_id, channels[0])),
        $.ajax(customSettings(urlGenerator('get-index-data'), instance_id, channels[1])),
        $.ajax(customSettings(urlGenerator('events'), instance_id, "empty")),
        $.ajax(customSettings(urlGenerator('get-trending-players'), instance_id, "empty"))

    )
    .done(function(team1, team2, events, playerData) {

        generatePlayerUI(playerData[0]);

        pushData(team1[0], "team");
        pushData(team2[0], "team");

        // pushEventData(events);
        // pushPlayersBarGraphData(trendingData);
        lineGraph();
        bargraph();

        //Showing Trending by Default
        $('.up-arrow, #herozero-players').hide();
        $('#player-container-heading').text('Trending Players');
        $('.player-btn').text("Show Hero/Zero Players").show();

        attachClickHandler();
        // updateData();
    });


function generatePlayerUI(playerData) {

    var heros = playerData.heros;
    var zeros = playerData.zeros;
    var trending = playerData.trending;
    var trendingUI = "";
    var trendingArrowUI = "";

    var herozeroUI = "";
    var herozeroArrowUI = "";

    $.each(trending, function(index, element) {

        var channel = Object.keys(trending[index]);
        var channelData = trending[index][channel];

        barData[channel] = [
            channelData.neg_sum,
            channelData.pos_sum
        ];

        trendingUI +=
            '<div class="col-md-3 col-lg-3 ui-data-element" id="player-' + channel + '-trending">' +
            '<div class="player-img-container">' +
            '<img src="' + channelData.img_url + '" class="player-img" alt="">' +
            '</div>' +
            '<div class="intro-text">' +
            '<h1 class="player-name">' + channelData.name + '</h1>' +
            '<hr class="star-light">' +
            '<span class="bar" id="bar-' + channel + '-trending"></span>' +
            '</div></div>';

        trendingArrowUI +=
            '<div class="col-sm-3">' +
            '<div class="up-arrow" id="player-' + channel + '-trending-arrow"></div>' +
            '</div>';


        // console.log(Object.keys(element));
    });

    $('#trending-players').html(trendingUI);
    $('#trending-player-arrows').html(trendingArrowUI);

    $.each(heros, function(index, element) {
        var channel = Object.keys(heros[index]);
        var channelData = heros[index][channel];

        barData[channel] = [
            channelData.neg_sum,
            channelData.pos_sum
        ];

        herozeroUI += '<div class="col-md-3 col-lg-3 ui-data-element" id="player-' + channel + '-herozero">' +
            '<div class="player-img-container">' +
            '<img src="' + channelData.img_url + '" class="player-img" alt="">' +
            '</div>' +
            '<div class="intro-text">' +
            '<h1 class="player-name">' + channelData.name + '</h1>' +
            '<hr class="star-light">' +
            '<span class="bar" id="bar-' + channel + '-herozero"></span>' +
            '</div></div>';

        herozeroArrowUI +=
            '<div class="col-sm-3">' +
            '<div class="up-arrow" id="player-' + channel + '-herozero-arrow"></div>' +
            '</div>';
    });

    $.each(zeros, function(index, element) {



        var channel = Object.keys(zeros[index]);
        var channelData = zeros[index][channel];

        barData[channel] = [
            channelData.neg_sum,
            channelData.pos_sum
        ];

        herozeroUI += '<div class="col-md-3 col-lg-3 ui-data-element" id="player-' + channel + '-herozero">' +
            '<div class="player-img-container">' +
            '<img src="' + channelData.img_url + '" class="player-img" alt="">' +
            '</div>' +
            '<div class="intro-text">' +
            '<h1 class="player-name">' + channelData.name + '</h1>' +
            '<hr class="star-light">' +
            '<span class="bar" id="bar-' + channel + '-herozero"></span>' +
            '</div></div>';


        herozeroArrowUI +=
            '<div class="col-sm-3">' +
            '<div class="up-arrow" id="player-' + channel + '-herozero-arrow"></div>' +
            '</div>';
    });

    $('#herozero-players').html(herozeroUI);
    $('#herozero-player-arrows').html(herozeroArrowUI);



}

function attachClickHandler() {

    $(".ui-data-element").click(function(event) {

        $('#close-specific-view').show();
        var clicked = $(this).attr('id');
        var element = clicked.split('-')[0];
        var channel = clicked.split('-')[1];
        var notClicked;

        $("#pointing-" + element).css({
            "padding-bottom": "0"
        });

        $(".up-arrow").hide();

        $.each($('.ui-data-element'), function() {
            $(this).fadeTo(0, 1);
            if (element == "team" && $(this).attr('id').split('-')[0] == "team" && $(this).attr('id') != clicked) {

                notClicked = $(this).attr('id');
                $("#" + clicked).fadeTo(0, 1);
                $("#" + notClicked).fadeTo("slow", 0.5);
                $("#" + clicked + "-arrow").show();

            } else if (element == "player" && $(this).attr('id').split('-')[0] == "player") {

                if ($(this).attr('id').split('-')[2] == "trending") {

                    if ($(this).attr('id') != clicked) {
                        $(this).fadeTo("slow", 0.5);
                    } else {
                        $("#" + clicked + "-arrow").show();
                    }

                } else if ($(this).attr('id').split('-')[2] == "herozero") {

                    if ($(this).attr('id') != clicked) {
                        $(this).fadeTo("slow", 0.5);
                    } else {
                        $("#" + clicked + "-arrow").show();
                    }
                }
            }

        });


        var playerOrTeam = element == "player" ? "player" : "team";

        if (element == "player") {
            playerLineGraph(channel);

        } else {
            generateGraphs(channel);

            function generateGraphs(channel) {
                clearGraph();
                clearIntervals();
                // scatterGraph(start, end);
                lineGraph(channel);

            }

        }


        var timelineTop = $("#timeline-container").offset().top;
        $('html, body').animate({
            scrollTop: timelineTop
        }, 500);

    });

    $(".player-btn").click(function() {


        var value = $(this).val();

        if (value == "herozero") {
            $(this).attr('value', "trending");
            $('.up-arrow, #trending-players').hide();
            $('#herozero-players').fadeIn("slow");
            $('.player-btn').text("Show Trending Players");
            $('#player-container-heading').text('Heros & Zeros');


        } else {
            $(this).attr('value', "herozero");
            $('.up-arrow, #herozero-players').hide();
            $('#trending-players').fadeIn("slow");
            $('.player-btn').text("Show Hero/Zero Players");
            $('#player-container-heading').text('Trending Players');

        }

    });

    $('#close-specific-view').click(function() {
        clearGraph();
        lineGraph();
        $('#close-specific-view').hide();
    });

}


function playerLineGraph(channel) {

    $.ajax(customSettings(urlGenerator('get-index-data'), instance_id, channel)).done(function(data) {
        clearGraph();
        pushData(data, "both");
        lineGraph(channel);

    });

}



function updateData() {

    var callTime = maxKey - 10;
    console.log(callTime);


    setInterval(
        function() {


            // lineGraph();

            var totalChannels = Object.keys(lineData);
            console.log(totalChannels);

            $.when(
                $.ajax(customSettings(urlGenerator('get-index-data'), instance_id, channels[0], callTime)),
                $.ajax(customSettings(urlGenerator('get-index-data'), instance_id, channels[1], callTime))

            ).done(function(team1, team2) {

                pushData(team1[0], "both", "live");
                pushData(team2[0], "both", "live");



                callTime = maxKey;
                console.log(callTime);


            });


            // For Show Purpose;

            // barData['bulls'] = [Math.random(), Math.random()]
            // bargraph("update");
        },
        1000);

}


function bargraph(update) {

    update = update == "update" ? true : false;
    //Width and height
    var w = 110;
    var h = 50;
    var barPadding = 5;
    var tip;


    $.each($('.bar'), function(index, element) {
        var dataset = barData[$(element).attr('id').split('-')[1]];
        if (dataset) {
            var sum = dataset.reduce((a, b) => a + b, 0);

            if (!update) {
                tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d, i) {
                        if (i == 0) {
                            return "<span style='color:red'>" + Math.round((d / sum) * 100) + "%</span>";
                        } else {
                            return "<span style='color:green'>" + Math.round((d / sum) * 100) + "%</span>";
                        }

                    });



                var svg = d3.select("#" + $(element).attr("id"))
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

                svg.call(tip);

                svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("height", function(d) {
                        return 50;
                    })
                    .attr("x", function(d, i) {
                        return (i * dataset[0] / sum) * 100 + i * barPadding;
                    })
                    .attr("y", 0)
                    .attr("width", function(d) {
                        return (d / sum) * 100;
                    })
                    .attr("fill", function(d, i) {
                        if (i == 0) {
                            return "red";
                        } else {
                            return "green";
                        }
                    })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);

            } else {

                $('.d3-tip:lt(1)').remove();

                tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-10, 0])
                    .html(function(d, i) {
                        if (i == 0) {
                            return "<span style='color:red'>" + Math.round((d / sum) * 100) + "%</span>";
                        } else {
                            return "<span style='color:green'>" + Math.round((d / sum) * 100) + "%</span>";
                        }

                    });

                var updateSVGDiv = d3.select("#" + $(element).attr("id"));
                var updateSVG = d3.select("#" + $(element).attr("id") + "> svg");
                updateSVG.call(tip);

                updateSVG.selectAll("rect")
                    .data(dataset)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .transition()
                    .attr("x", function(d, i) {
                        return (i * dataset[0] / sum) * 100 + i * barPadding;
                    })
                    .attr("y", 0)
                    .attr("width", function(d) {
                        return (d / sum) * 100;
                    });

            }
        }


    });


}


function lineGraph(entity) {
    entity = entity || false;

    var series = [];

    var palette = new Rickshaw.Color.Palette({
        scheme: 'classic9'
    });


    var graphData = function() {
        series = [];
        var sentiments = ["neg", "pos"];
        var s;

        if (entity) {
            for (s in sentiments) {

                if (sentiments[s] == "neg") {
                    series.push({
                        color: "red",
                        data: lineData[entity].neg,
                        name: toTitleCase(entity) + "'s NEG"
                    });
                } else {
                    series.push({
                        color: "green",
                        data: lineData[entity].pos,
                        name: toTitleCase(entity) + "'s POS"
                    });
                }

            }

        } else {


            var teams = Object.keys(lineData);
            for (var i in teams) {

                for (s in sentiments) {

                    if (sentiments[s] == "neg") {
                        series.push({
                            color: "red",
                            data: lineData[teams[i]].neg,
                            name: toTitleCase(teams[i]) + "'s NEG"
                        });
                    } else {
                        series.push({
                            color: "green",
                            data: lineData[teams[i]].pos,
                            name: toTitleCase(teams[i]) + "'s POS"
                        });

                    }
                }
            }
        }
    };

    graphData();

    graph = new Rickshaw.Graph({
        element: document.getElementById("line"),
        width: 1100,
        height: 400,
        renderer: 'line',
        stroke: true,
        preserve: true,
        interpolation: 'bundle',
        series: series
    });


    graph.render();


    var preview = new Rickshaw.Graph.RangeSlider({
        graph: graph,
        element: document.getElementById('line_slider'),
    });

    hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph,
        xFormatter: function(x) {
            var d = new Date(0);
            d.setUTCSeconds(x);
            return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        }
    });

    var annotator = new Rickshaw.Graph.Annotate({
        graph: graph,
        element: document.getElementById('timeline')
    });

    var legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: document.getElementById('line_legend')

    });

    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
        graph: graph,
        legend: legend
    });

    var order = new Rickshaw.Graph.Behavior.Series.Order({
        graph: graph,
        legend: legend
    });

    var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
        graph: graph,
        legend: legend
    });



    var ticksTreatment = 'glow';

    var xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph,
        tickFormat: function(x) {
            var d = new Date(0);
            d.setUTCSeconds(x);
            return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        }

    });

    xAxis.render();

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph
    });

    yAxis.render();

    // setInterval(function() {
    //     // hoverDetail._removeListeners();
    //     // hoverDetail._addListeners();
    //     pushData();
    //     graph.update();
    // }, 10000);


    $.each(gEvents, function(index, element) {


        annotator.add(element.x, element.y);
        annotator.update();

    });

}

function scatterGraph(start, end, specific) {
    start = start || 0;
    end = end || 4;
    specific = specific || false;

    var series = [];

    var palette = new Rickshaw.Color.Palette({
        scheme: 'classic9'
    });

    var pushData = function() {
        series = [];
        var color;
        var name;
        for (var i = start; i < end; i++) {

            if (i % 2 === 0) {
                color = "red";
                name = toTitleCase(lineData[i][0].channel) + "'s NEG";

            } else {
                color = "green";
                name = toTitleCase(lineData[i][0].channel) + "'s POS";
            }

            series.push({
                color: color,
                data: lineData[i],
                name: name
            });

        }
    };

    pushData();

    var graph = new Rickshaw.Graph({
        element: document.getElementById("scatter"),
        width: 1100,
        height: 500,
        renderer: 'scatterplot',
        stroke: true,
        preserve: true,
        series: series
    });



    graph.render();

    var preview = new Rickshaw.Graph.RangeSlider({
        graph: graph,
        element: document.getElementById('scatter_slider'),
    });

    var hoverDetail = new Rickshaw.Graph.HoverDetail({
        graph: graph,
        xFormatter: function(x) {
            var d = new Date(0);
            d.setUTCSeconds(x);
            return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        }
    });

    var annotator = new Rickshaw.Graph.Annotate({
        graph: graph,
        element: document.getElementById('timeline')
    });

    var legend = new Rickshaw.Graph.Legend({
        graph: graph,
        element: document.getElementById('scatter_legend')

    });

    var shelving = new Rickshaw.Graph.Behavior.Series.Toggle({
        graph: graph,
        legend: legend
    });

    var order = new Rickshaw.Graph.Behavior.Series.Order({
        graph: graph,
        legend: legend
    });

    var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
        graph: graph,
        legend: legend
    });



    var ticksTreatment = 'glow';

    var xAxis = new Rickshaw.Graph.Axis.X({
        graph: graph,
        orientation: "bottom",
        tickFormat: function(x) {
            var d = new Date(0);
            d.setUTCSeconds(x);
            return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        }

    });

    xAxis.render();

    var yAxis = new Rickshaw.Graph.Axis.Y({
        graph: graph
    });

    yAxis.render();

    // var timer = setInterval(function() {
    //     $.when(
    //             $.ajax(customSettings(instance_id, lineData[0][0].team), -1),
    //             $.ajax(customSettings(instance_id, lineData[2][0].team), -1)
    //         )
    //         .done(function(team1, team2) {
    //             console.log("Chala");
    //             pushData(team1, 0);
    //             pushData(team2, 2);
    //             graph.update();
    //         });

    // }, 10000);
    // console.log(team1);

    // setInterval(function() {
    //     $.when($.ajax(customSettings(instance_id, teams[0])), $.ajax(customSettings(instance_id, teams[1])))
    //         .done(function(team1, team2) {
    //             pushData(team1, 0);
    //             pushData(team2, 2);
    //             lineGraph();
    //         });

    // }, 10000);



    // var controls = new RenderControls({
    //     element: document.querySelector('form'),
    //     graph: graph
    // });

    // add some data every so often

    // var messages = [
    //     "That's a Six",
    //     "Wicket!",
    // ];

    // function addAnnotation(force) {
    //     if (messages.length > 0 && (force || Math.random() >= 0.95)) {
    //         annotator.add(lineData[2][lineData[2].length - 1].x, messages.shift());
    //         annotator.update();
    //     }
    // }

    // addAnnotation(true);

}



function clearIntervals() {

    var killId = setTimeout(function() {
        for (var i = killId; i > 0; i--) clearInterval(i)
    }, 10000);

}

function clearGraph() {
    $('#line_legend, #scatter_legend').empty();
    $('#line, #timeline, #line_slider, #scatter, #scatter_slider').empty();
}

function pushData(response, entity, live) {
    live = live == "live" ? true : false;


    var object = response;
    var channel = Object.keys(object)[1 - Object.keys(object).indexOf('instance_id')];
    var keysSorted = Object.keys(object[channel]).map(Number).sort();

    // Check if there is any data
    if (keysSorted.length > 0) {
        maxKey = keysSorted[keysSorted.length - 1];

        if (live) {
            if (lineData[channel].neg.length > 150) {
                for (var j = 0; j < keysSorted.length; j++) {
                    lineData[channel].neg.shift();
                    lineData[channel].pos.shift();
                }
            }
        }

        if (!(channel in lineData)) {
            lineData[channel] = {};
            lineData[channel].neg = [];
            lineData[channel].pos = [];
            lineData[channel].type = entity;
        }

        // Line Chart Data
        $.each(keysSorted, function(index, timestamp) {
            lineData[channel].neg.push({
                x: timestamp,
                y: object[channel][timestamp].neg,
            });

            lineData[channel].pos.push({
                x: timestamp,
                y: object[channel][timestamp].pos,
            });
        });

        barData[channel] = [
            object[channel][maxKey].neg,
            object[channel][maxKey].pos
        ];
    }

}

function pushEventData(response) {

    var events = response[0];

    $.each(events, function(index, element) {
        gEvents.push({

            x: Math.round(element.timestamp),
            y: element.event
        });
    });

    playerData(events[events.length - 1]);
}


function customSettings(url, id, channel, second) {
    second = second || 0;
    return {
        "async": true,
        "crossDomain": true,
        "url": url,
        "type": "GET",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
        },
        "processData": false,
        "data": $.param({
            "instance_id": id,
            "channel": channel,
            "last_timestamp": second
        })
    };
}

function urlGenerator(url) {
    return "https://api.bubble.social/" + url;
}

function toTitleCase(str) {


    if (str.indexOf('_') != -1) {

        str = str.replace('_', " ");
    }

    str = str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    return str;
}