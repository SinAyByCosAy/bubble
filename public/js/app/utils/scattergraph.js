define(["d3", "twemoji", "jquery"], function(d3, emoji) {


    function scatterGraph() {

        // Data Model
        var data = {};
        var updateData;

        //Axis
        var x;
        var y = d3.scaleLinear();
        var yAxis = d3.axisRight(y);

        // Dimensions
        var width;
        var height;
        var updateWidth;
        var yRelativeTo;
        var yPos;


        //Initial Zoom Level
        var zoom;


        var tweetshow = d3.select("body")
            .append("div")
            .attr("class", "tweet")
            .style("opacity", 0);

        var positiveEmotions = {
            2: '1F60A',
            1: '1F601',
            0: '1F606'
        };

        var negetiveEmotions = {
            2: '1F612',
            1: '1F61E',
            0: '1F620'
        };

        function chart(selection) {
            selection.each(function() {

                //Bounding rectangle of the Bar Chart
                yPos = yRelativeTo.top + yRelativeTo.height;

                var dom = d3.select(this);

                // Axis
                y.domain([0, 100]).range([height, 0]);

                var scatter = dom.append("g")
                    .attr("class", "scatter-chart")
                    .attr("id", "scatter-g")
                    .attr("transform", "translate(0," + (yPos - 2) + ")");

                var scatterdots = scatter.selectAll(".series")
                    .data(data)
                    .enter().append("g")
                    .attr("class", "series")
                    .selectAll(".point")
                    .data(function(d) { return d; })
                    .enter().append("g")
                    .attr("class", "point");

                var setCircleSize;

                if (window.location.pathname == "/get-video-overlay") {
                    setCircleSize = 40;

                } else {
                    setCircleSize = 20;
                }

                //Clip Circles
                var clipCircles = scatterdots.append("svg:clipPath")
                    .attr("id", function(d, i) {
                        return "clip-circle-" + d.x + d.y.sentiment_index;
                    })
                    .append("circle")
                    .attr("r", setCircleSize)
                    .attr("cx", function(d) { return x(d.x); })
                    .attr("cy", function(d) { return y(d.y.sentiment_index); })
                    .attr("transform", "translate(10,10)");

                //Image
                // set up filter
                scatterdots.append('filter')
                  .attr('id','desaturate')
                  .append('feColorMatrix')
                  .attr('type','matrix')
                  .attr('values',"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");

                var image = scatterdots.append("image")
                    .attr("class", "point-image")
                    .attr("x", function(d) { return x(d.x); })
                    .attr("y", function(d) { return y(d.y.sentiment_index); })
                    .attr("width", (setCircleSize * 2) + "px")
                    .attr("height", (setCircleSize * 2) + "px")
                    .attr("xlink:href", function(d, i) {
                        return "https://randomuser.me/api/portraits/thumb/men/" + Math.floor(Math.random() * 50) + ".jpg";
                    })
                    .attr("clip-path", function(d, i) {
                        return 'url(#clip-circle-' + d.x + d.y.sentiment_index + ")";
                    })
                    .on("click", click);

                var strokeCircles = scatterdots.append("circle")
                    .attr("class", "point-image-circle")
                    .attr("r", setCircleSize)
                    .attr("cx", function(d) { return x(d.x); })
                    .attr("cy", function(d) { return y(d.y.sentiment_index); })
                    .attr("transform", "translate(10,10)")
                    .style("fill", "none")
                    .style("stroke", function(d) {
                        if (d.y.type == "-") {
                            return "red";
                        } else {
                            return "green";
                        }
                    })
                    .style('stroke-width', '2px');

                var coords = [];

                scatter.append("g")
                    .attr("class", "axis axis--y")
                    .call(yAxis.tickValues(d3.range(0, 9, 3)));

                scatter.selectAll(".tick").each(function(data) {
                    var tick = d3.select(this);
                    var transform = tick.attr("transform");
                    var c = transform.substring(transform.indexOf("(") + 1, transform.indexOf(")")).split(",")[1];
                    coords.push(parseInt(c));
                });

                coords.push(0);
                coords = coords.sort();
                coords.splice(coords.length - 1, 1);

                var heightGrid = coords[1] - coords[0];

                var emoji = scatter.append("text")
                    .attr("class", "emoji");
                var timeText = scatter.append("text")
                    .attr("class", "text-time");

                updateScatterData = function() {

                    var t = d3.transition().duration(750);

                    var update = scatter.selectAll(".series")
                        .data(data);

                    console.log(update);

                    update.exit().remove();

                };

                zoomScatter = function() {
                    resizeScatter();
                };

                resizeScatter = function() {

                    clipCircles
                        .attr("r", function() {
                            var width = setScatterAttr();
                            return width / 2;
                        })
                        .attr("cx", function(d) { return x(d.x); })
                        .attr("transform", function() {
                            var translate = setScatterAttr();
                            return "translate(" + (translate / 2) + "," + (translate / 2) + ")";
                        });


                    //Image
                    image
                        .attr("x", function(d) { return x(d.x); })
                        .attr("width", function() {
                            var width = setScatterAttr();
                            return width;
                        })
                        .attr("height", function() {
                            var height = setScatterAttr();
                            return height;

                        });

                    strokeCircles
                        .attr("r", function() {
                            var width = setScatterAttr();
                            return width / 2;
                        })
                        .attr("cx", function(d) { return x(d.x); })
                        .attr("transform", function() {
                            var translate = setScatterAttr();
                            return "translate(" + (translate / 2) + "," + (translate / 2) + ")";

                        });

                };

                updateWidthScatter = function() {

                };


                function click(d) {
                    // Fade out other bubbles and circles
                    d3.selectAll('.point-image')
                        .style("filter", function(d, i) {
                            return ("filter", "url(#desaturate)");
                        });
                    d3.selectAll('.point-image-circle').style('stroke', '#696969');

                    d3.select(this).style("filter", function(d, i) {
                            return ("filter", "none");
                        });

                    var circleCords = d3.select(this.parentNode).select(".point-image-circle");
                    circleCords
                        .style("stroke", function(d) {
                            if (d.y.type == "-") {
                                return "red";
                            } else {
                                return "green";
                            }
                        })
                        .style('stroke-width', '4px');

                    var yClick = d3.mouse(this)[1];
                    var coordsLocal = coords.slice();

                    tweetshow.transition()
                        .duration(200)
                        .style("opacity", 0.9);

                    // Get mouse position
                    var posX = parseInt(circleCords.attr("cx"));
                    var posY = parseInt(circleCords.attr("cy"));
                    tweetshow.html(d.y.text)
                        .style("left", (posX + setCircleSize * 2 + 10) + 'px')
                        .style("top", (posY + height * 0.50 - setCircleSize*4) + 'px');

                    emoji.transition()
                        .duration(200)
                        .style("opacity", 0.9);

                    var segmentClicked = d3.bisectRight(coordsLocal, yClick) - 1;

                    var text = d.y.type == "-" ? negetiveEmotions[segmentClicked] : positiveEmotions[segmentClicked];

                    // Show Emoji and Time
                    emoji.text(twemoji.convert.fromCodePoint(text))
                        .attr("x", 0)
                        .attr("y", (yClick + 10));

                    timeText.text(d.x)
                        .attr('x', posX)
                        .attr('y', height);

                    setTimeout(function() {

                        tweetshow.transition()
                            .duration(500)
                            .style("opacity", 0);

                        emoji.transition()
                            .duration(500)
                            .style("opacity", 0);

                        timeText.transition()
                            .duration(500)
                            .style("opacity", 0);

                        d3.selectAll('.point-image')
                            .style("filter", function(d, i) {
                                return ("filter", "none");
                            });

                        strokeCircles
                            .transition()
                            .duration(500)
                            .style("stroke", function(d) {
                                if (d.y.type == "-") {
                                    return "red";
                                } else {
                                    return "green";
                                }
                            })
                            .style('stroke-width', '2px');

                    }, 10000);


                }

                function setScatterAttr() {
                    return setCircleSize * zoom.k > 40 ? 40 : setCircleSize * zoom.k;
                }


            });
        }

        chart.data = function(value) {
            if (!arguments.length) return data;
            data = value;
            if (typeof updateScatterData === 'function') updateScatterData();
            return chart;
        };


        chart.zoom = function(value) {
            if (!arguments.length) return zoom;
            zoom = value;
            if (typeof zoomScatter === 'function') zoomScatter();
            return chart;
        };


        chart.width = function(value) {
            if (!arguments.length) return 960;
            width = value;
            if (typeof updateWidthScatter === 'function') updateWidthScatter();
            return chart;
        };

        chart.height = function(value) {
            if (!arguments.length) return 500;
            height = value;
            return chart;
        };

        chart.x = function(commonXAxis) {
            if (!arguments.length) return d3.scaleTime();
            x = commonXAxis;
            if (typeof resizeScatter === 'function') resizeScatter();
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
        init: scatterGraph
    };
});
