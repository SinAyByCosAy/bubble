define(["d3", "twemoji"], function(d3) {
    function lineGraph() {

        // Data Model
        var data = {};
        var updateData;

        //Axis
        var x;
        var y = d3.scaleLinear();

        //Circles on line graph
        var circle;

        // Dimensions
        var height;
        var yRelativeTo;
        var yPos;

        //Initial Zoom Level
        var zoom;

        var sentimentsLine = d3.line()
            .x(function(d) {
                return x(d.time);
            })
            .y(function(d) {
                return y(d.sentiment);
            });

        var bisectLine = d3.bisector(function(d) { return d.time; }).left;

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
                console.log(yPos);

                var dom = d3.select(this);
                y.domain([0, data.max]).nice().range([height, 0]);

                var line = dom.append("g")
                    .attr("class", "line-chart")
                    .attr("transform", "translate(0," + (yPos - 2) + ")");
                // .on("mouseover", mouseover)
                // .on("mouseout", mouseout);


                var neg = line.append("path")
                    .datum(data.neg)
                    .attr("class", "sentiment--line sentiment--neg")
                    .attr("d", sentimentsLine)

                var pos = line.append("path")
                    .datum(data.pos)
                    .attr("class", "sentiment--line sentiment--pos")
                    .attr("d", sentimentsLine);

                // Create circles on the line chart
                circle = line.append('g');
                circle.selectAll('circle')
                    .data((data.neg).concat(data.pos))
                    .enter()
                    .append('circle')
                    .attr('r', 5)
                    .attr('cx', function(d) {
                        return x(d.time);
                    })
                    .attr('cy', function(d) {
                        return y(d.sentiment);
                    })
                    .attr('fill', 'white')
                    .on('mouseover', mouseover)
                    .on('mouseout', mouseout);

                var lineChartToolTipLine = line.append("line")
                    .attr("class", "x-hover-line line-hover-line")
                    .style("opacity", "0");

                var lineChartToolTipText = d3.select("body")
                    .append("div")
                    .attr("class", "line-tooltip-text")
                    .style("opacity", 1);

                var posText = lineChartToolTipText.append("div").attr("class", "line-tooltip-text-pos");
                var negText = lineChartToolTipText.append("div").attr("class", "line-tooltip-text-neg");
                var timeText = lineChartToolTipText.append("div").attr("class", "text-time");

                updateDataLine = function() {
                    resizeLine("yes");
                };

                zoomLine = function() {
                    mouseout();
                    resizeLine();
                };

                resizeLine = function(transition) {
                    transition = transition == "yes" ? 750 : 0;
                    var t = d3.transition().duration(transition);

                    pos.transition(t)
                        .attr("d", sentimentsLine(data.pos));

                    neg.transition(t)
                        .attr("d", sentimentsLine(data.neg));

                    // Transition of circles
                    circle.selectAll('circle').transition(t)
                        .attr('cx', function(d) {
                            return x(d.time);
                        })
                        .attr('cy', function(d) {
                            return y(d.sentiment);
                        });

                };

                function mouseover(d, i) {
                    var posX = x.invert(d3.mouse(this)[0]);
                    var top_offset = $('.line-chart').offset().top;

                    var obj = {};
                    obj.neg = data.neg[i % (data.neg.length)].sentiment;
                    obj.pos = data.pos[i % (data.pos.length)].sentiment;
                    obj.time = data.pos[i % (data.pos.length)].time;
                    var time = x(posX);

                    var sum = [obj.neg, obj.pos].reduce((a, b) => a + b, 0);
                    var percentage = [obj.neg, obj.pos].map(function(i) { return Math.round(i / sum * 100); });
                    var yCoords = [obj.neg, obj.pos].map(function(i) { return y(i); });

                    lineChartToolTipText.transition().style("opacity", "1");

                    negText.html('<span style="font-size:20px">' + twemoji.convert.fromCodePoint(negetiveEmotions[1]) + '</span> ' + percentage[0] + "%")
                        .style("left", (time) + "px")
                        .style("top", (yCoords[0] + top_offset - 60) + "px") //subtracting 55px for height of div
                        .style('opacity', 1);

                    posText.html(percentage[1] + "%" + '<span style="font-size:20px">' + twemoji.convert.fromCodePoint(positiveEmotions[1]) + '</span> ')
                        .style("left", (time - 50) + "px")
                        .style("top", (yCoords[1] + top_offset - 60) + "px")
                        .style('opacity', 1);

                    timeText.html(time)
                        .style("left", (time) + "px")
                        .style('top', (height + top_offset) + "px")
                        .attr('opacity', 1)

                    lineChartToolTipLine.transition()
                        .style("opacity", "1")
                        .attr("transform", "translate(" + time + ",0)")
                        .attr("y1", height)
                        .attr("y2", yCoords[1]);
                }

                function mouseout() {
                    lineChartToolTipText.transition().style("opacity", "0");
                    lineChartToolTipLine.transition().style("opacity", "0");
                }


            });
        }

        chart.data = function(value) {
            if (!arguments.length) return data;
            data = value;
            if (typeof updateDataLine === 'function') updateDataLine();
            return chart;
        };

        chart.x = function(commonXAxis) {
            if (!arguments.length) return d3.scaleTime();
            x = commonXAxis;
            if (typeof resizeLine === 'function') resizeLine();
            return chart;
        };

        chart.height = function(value) {
            if (!arguments.length) return 500;
            height = value;
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
        init: lineGraph
    };
});