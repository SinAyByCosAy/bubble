var barData = {};
var $ = jQuery;

var margin = {
    top: 20,
    right: 100,
    bottom: 30,
    left: 100
};


var height = 500 - margin.top - margin.bottom;


$(".ui-data-element").css("cursor", "default");

$(function() {
    var batchRequests = initBarData();
    // attachClickHandler();

    $.when.apply(null, batchRequests).done(function() {
        bargraph();
        attachClickHandler();

        // setInterval(function() {
        //     live();
        // }, 4000);
    });
});


function live() {

    var batchRequests = initBarData();

    $.when.apply(null, batchRequests).done(function() {
        bargraph("update");
        console.log("hello");
    });


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


function attachClickHandler() {

    $(".ui-data-element").css("cursor", "pointer");

    $(".ui-data-element").click(function(event) {

        $('#scatter-plot').empty();

        var channel = $(this).attr('id');
        var notchannel;


        $('.modal-body > #title').text(channelsData[channel].name);
        $("#trending-modal").modal('show');

        $.ajax(customSettings(urlGenerator('get-scatter-data'), instance_id, channel))
            .done(function(object) {



                var channel = Object.keys(object)[1 - Object.keys(object).indexOf('instance_id')];
                console.log(channel);
                scatterGraph(channel, object[channel]);

            });

    });

}

function scatterGraph(channel, scatter) {

    var width = $('#scatter-plot').width() - margin.top - margin.bottom;
    var series = [];
    console.log(scatter);

    for (var timestamp in scatter) {
        var object = {};
        var array = [];
        var tweets = scatter[timestamp];


        var d = new Date(0);
        d.setUTCSeconds(timestamp);
        object['x'] = timestamp;


        for (var tweet in tweets) {
            if (tweets[tweet].sentiment_index > 0) {
                array.push(tweets[tweet].sentiment_index);
            } else {
                array.push(tweets[tweet].sentiment_index);
            }
        }

        object['y'] = array;

        series.push(object);
    }
    console.log(series);
    for (var i in series) {
        series[i].y = series[i].y.filter(function(value, index, self) { return self.indexOf(value) == index; });
    }
    console.log(series);
    // console.log("series", series);
    var scatterSeries = [];
    var max = 0;

    for (var i = 0; i < series.length; i++) {

        len = series[i].y.length;
        max = Math.max(max, len);
    }

    for (var i = 0; i < max; i++) {
        scatterSeries.push([]);
    }

    for (var i = 0; i < series.length; i++) {
        len = series[i].y.length;
        x = series[i].x;

        for (var j = 0; j < len; j++) {
            y = series[i].y[j]
            scatterSeries[j].push({
                x: x,
                y: y
            });

        }
    }

    console.log(scatterSeries);

    var x = d3.scale.linear()
        .range([0, width]);


    var y = d3.scale.linear()
        .range([height, 0]);

    var z = d3.scale.category10();

    var svg = d3.select("#scatter-plot").append("svg")
        .attr("width", width + margin.top + margin.bottom)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain(d3.extent(d3.merge(scatterSeries), function(d) {
        return d.x;
    })).nice();

    y.domain([-100, 100]).nice();

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).orient("left"));

    // Add the x-axis.
    var xAxis = d3.svg.axis()
        .scale(x)
        .tickFormat(function(d) {
            var time = new Date(0);
            time.setUTCSeconds(d);
            return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(xAxis);

    svg.selectAll('.axis > path')
        .style("fill", "none")
        .style("shape-rendering", "crispEdges")
        .style("stroke", "#000")
        .style("stroke-width", "1px");

    svg.selectAll('.axis > .tick > line')
        .style("fill", "none")
        .style("shape-rendering", "crispEdges")
        .style("stroke", "#000")
        .style("stroke-width", "1px");


    // Add the points!
    svg.selectAll(".series")
        .data(scatterSeries)
        .enter().append("g")
        .attr("class", "series")
        .style("fill", function(d, i) {
            return z(i);
        })
        .style("stroke", function(d, i) {
            return z(i);
        })
        .selectAll(".point")
        .data(function(d) {
            return d;
        })
        .enter().append("circle")
        .attr("class", "point")
        .attr("r", 5)
        .attr("cx", function(d) {
            return x(d.x);
        })
        .attr("cy", function(d) {
            return y(d.y);
        });

}



function initBarData() {
    var batchRequests = [];

    for (var i in channels) {

        batchRequests.push(

            $.ajax(customSettings(urlGenerator('get-index-data'), instance_id, channels[i]))
            .done(function(object) {

                var channel = Object.keys(object)[1 - Object.keys(object).indexOf('instance_id')];
                var keysSorted = Object.keys(object[channel]).map(Number).sort();
                maxKey = keysSorted[keysSorted.length - 1];

                if (parseInt(object[channel][maxKey].neg) === 0 && parseInt(object[channel][maxKey].pos) === 0) {
                    barData[channel] = [1, 1];

                } else {
                    barData[channel] = [
                        object[channel][maxKey].neg,
                        object[channel][maxKey].pos
                    ];
                }
            })
        );

    }

    return batchRequests;

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
    return "https://trendingapi.bubble.social/" + url;
}

function toTitleCase(str) {


    if (str.indexOf('_') != -1) {

        str = str.replace('_', " ");
    }

    str = str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    return str;
}