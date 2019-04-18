define(["d3", "twemoji"], function(d3) {

    function barGraph() {


        // Data Model
        var data = {};
        var updateData;

        //Axis
        var x;
        var y = d3.scaleLinear();

        // Dimensions
        var height;
        var yRelativeTo;
        var yPos;

        //Initial Zoom Level
        var zoom;


        function chart(selection) {

            selection.each(function() {

                //Bounding rectangle of the game title
                yPos = yRelativeTo.top + yRelativeTo.height;

                var dom = d3.select(this);

                var barGroup = dom.append("g")
                    .attr("id", "bar-g");

                var bars = barGroup.append("g")
                    .attr("class", "bars")
                    .attr("transform", "translate(" + (width / 2 - 50) + "," + yPos + ")");

                var bardata = data.barchart;
                if (bardata[0] === 0 && bardata[1] === 0) {
                    bardata = [1, 1];
                }

                var sum = bardata.reduce((a, b) => a + b, 0);

                bars.selectAll("rect")
                    .data(bardata)
                    .enter()
                    .append("rect")
                    .attr("class", function(d, i) {
                        return i === 0 ? "bar-neg" : "bar-pos";
                    })
                    .attr("height", function(d) {
                        return 50;
                    })
                    .attr("x", function(d, i) {
                        return (i * bardata[0] / sum) * 100 + i * 2;
                    })
                    .attr("y", 0)
                    .attr("width", function(d) {
                        return (d / sum) * 100;
                    })
                    .attr("fill", function(d, i) {
                        return i === 0 ? "red" : "green";
                    });

                //Bar Chart Emoji
                var barChartEmoji = barGroup.append("g")
                    .attr("class", "bar-emoji")
                    .attr("transform", "translate(0," + yPos + ")");

                var negText = barChartEmoji.append("text")
                    .attr("class", "bar-neg")
                    .style("fill", "white")
                    .attr("x", 0)
                    .attr("dy", 30)
                    .text(function(d) {

                        return twemoji.convert.fromCodePoint('1F620') + Math.round(bardata[0] / sum * 100) + "%";
                    })
                    .attr("transform", "translate(" + (width / 2 - 50 - 50) + ",0)");

                var posText = barChartEmoji.append("text")
                    .attr("class", "bar-pos")
                    .style("fill", "white")
                    .attr("x", 0)
                    .attr("dy", 30)
                    .text(function(d) {

                        return twemoji.convert.fromCodePoint('1F606') + Math.round(bardata[1] / sum * 100) + "%";
                    })
                    .attr("transform", "translate(" + (width / 2 + 50 + 10) + ",0)");

                //Tweet Count
                var barTweetCount = barGroup.append("g")
                    .attr("class", "bar-tweet")
                    .attr("transform", "translate(" + (width / 2 - 40) + "," + (yPos + 55) + ")");

                var tweetCount = barTweetCount.append("text")
                    .attr("class", "tweet-count")
                    .style("fill", "white")
                    .attr("x", 0)
                    .attr("y", 0)
                    .text(data.tweetcount)
                    .attr("transform", "translate(" + 30 + ",20)");


                var twebirdy = barTweetCount.append("image")
                    .attr("class", "twitter-bird")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", "20px")
                    .attr("height", "20px")
                    .attr("xlink:href", function(d, i) {
                        return "https://pbs.twimg.com/profile_images/875169334573678592/I7zte5WY_bigger.jpg";
                    })
                    .attr("transform", "translate(" + (0) + ",5)");

                updateBar = function() {
                    // resizeBar("yes");

                };


                // resizeBar = function(transition) {
                //     transition = transition == "yes" ? 750 : 0;
                //     var t = d3.transition().duration(transition);

                //     pos.transition(t)
                //         .attr("d", sentimentsLine(data.pos));

                //     neg.transition(t)
                //         .attr("d", sentimentsLine(data.neg));

                // };

            });
        }

        chart.data = function(value) {
            if (!arguments.length) return data;
            data = value;
            if (typeof updateBar === 'function') updateBar();
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

        chart.yRelativeTo = function(value) {
            if (!arguments.length) return 10;
            yRelativeTo = value;
            return chart;

        };


        return chart;
    }

    return {
        init: barGraph
    };
});