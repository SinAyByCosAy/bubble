define(["d3", "twemoji"], function(d3) {



    function eventGraph() {

        // Data Model
        var data = {};
        var updateData;

        //Axis
        var x;
        var y = d3.scaleLinear();

        // Dimensions
        var width;
        var overallheight;
        var updateWidth;
        var yRelativeTo;
        var yPos;

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
            "Germany": "🇩🇪",
            "EVENT": "261D",

        };


        function chart(selection) {

            //Bounding rectangle of the scatterChart
            yPos = yRelativeTo.top + yRelativeTo.height;

            selection.each(function() {
                var dom = d3.select(this);

                var eventsChart = dom.append("g")
                    .attr("class", "events-chart");

                var backgroundRect = eventsChart.append("rect")
                    .attr("class", "events-rect")
                    .attr("height", 50)
                    .attr("width", width)
                    .attr("transform", "translate(0," + (yPos - 2) + ")");

                //Events
                var events = eventsChart.append("g")
                    .attr("class", "events")
                    .attr("transform", "translate(0," + (yPos) + ")");

                var event = events.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "event");

                var emoji = event.append("text")
                    .attr("class", "event-points")
                    .attr("x", function(d, i) {
                        return x(d.time);
                    })
                    .attr("dy", 20)
                    .text(function(d) {

                        if (d.type in emojiDict) {
                            return twemoji.convert.fromCodePoint(emojiDict[d.type]);
                        } else {
                            return twemoji.convert.fromCodePoint(emojiDict["EVENT"]);

                        }
                    })
                    .on("mouseover", eventMouseOver)
                    .on("mouseout", eventMouseOut)
                    .on("click", eventMouseOver);

                var displaytime = event.append("text")
                    .attr("class", "event-time")
                    .attr("x", function(d, i) {
                        return x(d.time);
                    })
                    .attr("dy", 40)
                    .text(function(d) {
                        return d.timedisplay + "'";
                    });

                // Tooltip
                var eventTooltip = eventsChart.append("g")
                    .attr("class", "event-tooltip");

                var tooltipText = d3.select("body")
                    .append("div")
                    .attr("class", "event-tooltip-text")
                    .style("opacity", 0);

                var tooltipLine = eventTooltip.append("line")
                    .attr("class", "x-hover-line hover-line")
                    .attr("y1", 0)
                    .attr("y2", yPos - 10)
                    .style("opacity", 0);

                updateEvents = function() {
                    var event = events.selectAll("g")
                        .data(data)
                        .enter().append("g")
                        .attr("class", "event");

                    event.append("text")
                        .attr("class", "event-points")
                        .attr("x", function(d, i) {
                            return x(d.time);
                        })
                        .attr("dy", 20)
                        .text(function(d) {
                            return twemoji.convert.fromCodePoint(emojiDict[d.type]);
                        })
                        .on("mouseover", function() {
                            tooltipLine.transition().style("opacity", 1);
                            tooltipText.transition().style("opacity", 1);
                        })
                        .on("mouseout", function() {
                            tooltipLine.style("opacity", 0);
                            tooltipText.style("opacity", 0);
                        })
                        .on("mousemove", mousemove)
                        .on("click", mousemove);

                    event.append("text")
                        .attr("class", "event-time")
                        .attr("x", function(d, i) {
                            return x(d.time);
                        })
                        .attr("dy", 40)
                        .text(function(d) {
                            return d.timeDisplay.time + "'";
                        });


                    var allEmoji = d3
                        .selectAll(".event-points")
                        .transition()
                        .attr("x", function(d, i) {
                            return x(d.time);
                        });

                    var allDisplayText = d3
                        .selectAll(".event-time")
                        .transition()
                        .attr("x", function(d, i) {
                            return x(d.time);

                        });




                };

                zoomEvents = function() {

                    resizeEvents();

                };

                resizeEvents = function() {
                    backgroundRect
                        .attr("height", function() {

                            var height = 50 * zoom.k > 55 ? 55 : 50 * zoom.k;
                            return height;
                        })
                        .attr("width", width);

                    d3.selectAll(".event-points")
                        .attr("x", function(d) {
                            if (zoom.k > 1) {
                                return x(d.time) - 8;
                            } else {
                                return x(d.time);
                            }
                        })
                        .style("font-size", function() {

                            if (zoom.k > 1) {

                                var size = 30 * zoom.k > 35 ? 35 : 30 * zoom.k;
                                return (size) + "px";

                            } else {
                                return "25px";
                            }
                        });

                    d3.selectAll(".event-time")
                        .attr("x", function(d, i) {
                            return x(d.time);

                        });


                };

                function eventMouseOver(d, i) {

                    tooltipLine.transition().style("opacity", 1);
                    tooltipText.transition().style("opacity", 1);

                    var x0 = x.invert(d3.mouse(this)[0]);
                    var position = eventBisect(data, x0) - 1;


                    var item = data[i % (data.length)];

                    if (item) {
                        var xTooltip = parseInt(d3.select(this).attr("x"));
                        var eventText = item.comment;


                        if (window.location.pathname !== "/get-video-overlay") {


                            tooltipText.html(
                                    // '<span style="font-size:20px">' + emojiDict[item.country] + '</span><br>' +
                                    '<span style="font-size:10px">' +
                                    eventText + '<br>' +
                                    '</span>')
                                .style("left", (xTooltip - 50 - 50) + "px")
                                .style("top", (overallheight * 0.8) + "px")
                                .style("line-height", 1)
                                .style("background", "rgba(54, 61, 82, 0.9)");


                        } else {

                            tooltipText.html('<span style="font-size:10px">' +
                                    eventText + '<br>' +
                                    '</span>')
                                .style("left", (xTooltip - 50 - 50) + "px")
                                .style("top", (overallheight * 0.4) + "px");


                        }

                        eventTooltip.attr("transform", "translate(" + (xTooltip + 10) + ",0)");

                    }
                }

                function eventMouseOut() {

                    tooltipLine.transition().style("opacity", 0);
                    tooltipText.transition().style("opacity", 0);
                }


            });
        }

        chart.data = function(value) {
            if (!arguments.length) return data;
            data = value;
            if (typeof updateEvents === 'function') updateEvents();
            return chart;
        };

        chart.zoom = function(value) {
            if (!arguments.length) return zoom;
            zoom = value;
            if (typeof zoomEvents === 'function') zoomEvents();
            return chart;
        };

        chart.x = function(commonXAxis) {
            if (!arguments.length) return d3.scaleTime();
            x = commonXAxis;
            if (typeof resizeEvents === 'function') resizeEvents();
            return chart;

        };

        chart.width = function(value) {
            if (!arguments.length) return 960;
            width = value;
            return chart;
        };

        chart.height = function(value) {
            if (!arguments.length) return 500;
            overallheight = value;
            return chart;
        };

        chart.yRelativeTo = function(value) {
            if (!arguments.length) return 10;
            yRelativeTo = value;
            return chart;

        };

        return chart;
    }

    return {
        init: eventGraph
    };
});