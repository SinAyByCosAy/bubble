define(["d3", "twemoji"], function(d3) {



    function playerGraph() {

        // Data Model
        var data = {};
        var updateData;

        //Axis
        var x;
        var y = d3.scaleLinear();

        // Dimensions
        var width;
        var height;
        var updateWidth;
        var xPos;

        //Event Bisector
        var eventBisect = d3.bisector(function(d) {
            return d.time;
        }).left;

        var emojiDict = {
            "OFFSIDE": "261D",
            "CHANCE": "1F631",
            "GOAL": "26BD",
            "FOUL": "1F915",
            "CORNER": "261D",
            "Chile": "🇨🇱",
            "Germany": "🇩🇪"

        };


        function chart(selection) {

            selection.each(function() {

                var dataPlayers = [{
                    'image': 'hello.jpg',
                    'pos': 4,
                    'neg': 4,
                    'sum': 8
                }, {
                    'image': 'hello.jpg',
                    'pos': 3,
                    'neg': 5,
                    'sum': 8
                }];

                var dom = d3.select(this);

                var players = dom.append("g")
                    .attr("class", "players-chart")
                    .attr("transform", "translate(" + xPos + ",0)");

                var backgroundRect = players.append("rect")
                    .attr("class", "events-rect")
                    .attr("height", height)
                    .attr("width", width);

                var playerGroup = players.selectAll(".player")
                    .data(dataPlayers)
                    .enter().append("g")
                    .attr("class", "player");

                var setCircleSize = 25;

                var playerClip = playerGroup.append("svg:clipPath")
                    .attr("id", function(d, i) {
                        return "clip-player-" + i;
                    })
                    .append("circle")
                    .attr("r", setCircleSize)
                    .attr("cx", (xPos + 50))
                    .attr("cy", function(d, i) {
                        return i * 60 + 20;
                    })
                    .attr("transform", "translate(25,25)");

                var playerImage = playerGroup
                    .append("image")
                    .attr("class", "player-image")
                    .attr("x", (xPos + 50))
                    .attr("y", function(d, i) {
                        return i * 60 + 20;
                    })
                    .attr("width", (setCircleSize * 2) + "px")
                    .attr("height", (setCircleSize * 2) + "px")
                    .attr("xlink:href", function(d, i) {
                        return "https://randomuser.me/api/portraits/thumb/men/" + Math.floor(Math.random() * 50) + ".jpg";
                    })
                    .attr("clip-path", function(d, i) {
                        return 'url(#clip-player-' + i + ")";

                    });

                var sum;

                var barChartGroup = playerGroup
                    .append("g")
                    .attr("class", "bar-chart-group")
                    .attr("transform", function(d, i) {
                        var pos = i * 60 + 30;
                        return "translate(0," + pos + ")";
                    });

                barChartGroup.selectAll("rect")
                    .data(function(d) {
                        return [d.neg, d.pos];

                    })
                    .enter().append("rect")
                    .attr("height", function(d) {
                        return 30;
                    })
                    .attr("x", function(d, i) {
                        return (xPos + 110 + (i * d / 8) * 100 + i * 5);
                    })
                    .attr("y", 0)
                    .attr("width", function(d) {
                        return (d / 8) * 100;
                    })
                    .attr("fill", function(d, i) {
                        if (i == 0) {
                            return "red";
                        } else {
                            return "green";
                        }
                    });






                updatePlayers = function() {


                };

                zoomPlayers = function() {

                    resizePlayers();

                };

                resizePlayers = function() {



                };

                xPosPlayers = function() {
                    backgroundRect
                        .attr("width", width * 0.40)
                        .attr("transform", "translate(" + xPos + ",0)");

                    playerClip
                        .attr("cx", (xPos + 50))
                        .attr("transform", "translate(25,25)");

                    playerImage
                        .attr("x", (xPos + 50));

                    barChartGroup.selectAll("rect")
                        .attr("x", function(d, i) {
                            return (xPos + 110 + i * d / 8 * 100 + i * 5);
                        })
                };


            });
        }

        chart.data = function(value) {
            if (!arguments.length) return data;
            data = value;
            if (typeof updatePlayers === 'function') updatePlayers();
            return chart;
        };

        chart.zoom = function(value) {
            if (!arguments.length) return zoom;
            zoom = value;
            if (typeof zoomPlayers === 'function') zoomPlayers();
            return chart;
        };

        chart.x = function(commonXAxis) {
            if (!arguments.length) return d3.scaleTime();
            x = commonXAxis;
            if (typeof resizePlayers === 'function') resizePlayers();
            return chart;

        };

        chart.width = function(value) {
            if (!arguments.length) return 960;
            width = value;
            return chart;
        };

        chart.height = function(value) {
            if (!arguments.length) return 500;
            height = value;
            return chart;
        };

        chart.xPos = function(value) {
            if (!arguments.length) return 300;
            xPos = value;
            if (typeof xPosPlayers === 'function') xPosPlayers();
            return chart;

        };

        return chart;
    }

    return {
        init: playerGraph
    };
});