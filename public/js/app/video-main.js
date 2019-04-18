define(["jquery", "d3",
        "./utils/helper", "./utils/data",
        "./utils/graph",
        "./utils/bargraph", "./utils/linegraph", "./utils/scattergraph", "./utils/events", "./utils/players"
    ],
    function($, d3, helper, data, graph, barGraph, lineGraph, scatterGraph, eventsGraph, playersGraph) {

        //https://bubble.social/get-webview?match_id=01aa28ba-77ac-11e7-949c-0669e02bb0da&team_id=01aa28bb-77ac-11e7-949c-0669e02bb0da&name=liverpool_fc

        $(function() {

            var channel = params.name;
            params.user_type = "INFLUENCER";
            //Real Estate Setup
            var width = Math.round(parseInt(d3.select("#chart_container").style("width")));
            var height = 150;
            var transform = d3.zoomIdentity;

            //Data Model
            var lineData = {};
            var scatterData = {};
            var eventsData = {};

            //All Charts
            var modelChart;
            var lineChart;
            var scatterChart;
            var eventsChart;
            var playersChart;

            //Axis
            var commonXAxis;
            var commonXZoomAxis;

            //Interactions
            var overallZoom;
            var topOffset = 30;


            $.when(
                $.getJSON(helper.url('get-index-data'), params),
                $.getJSON(helper.url('get-scatter-data'), params),
                $.getJSON(helper.url('get-events'), params)

            ).done(function(index, scatter, events) {

                helper.pL(lineData, channel, index[0]);
                helper.pS(scatterData, channel, scatter[0]);
                helper.pE(eventsData, channel, events[0]);

                modelChart = graph.chart().width(width).height(height);
                d3.select('#chart_container').call(modelChart);

                var svg = d3.select(".chart");
                //Common X Axis Definitions
                commonXAxis = d3.scaleTime()
                    .domain(d3.extent(lineData[channel].timestamps))
                    .range([0, helper.widthDependingOnPage(width)]);

                commonXZoomAxis = d3.scaleTime()
                    .domain(commonXAxis.domain())
                    .range(commonXAxis.range());

                overallZoom = d3.zoom()
                    .scaleExtent([1, 10])
                    .translateExtent([
                        [0, 0],
                        [helper.widthDependingOnPage(width), height]
                    ])
                    .extent([
                        [0, 0],
                        [helper.widthDependingOnPage(width), height]
                    ])
                    .on('zoom', zoomHandler);

                //Charts Definition Chart
                //LineChart
                lineChart = lineGraph.init()
                    .x(commonXAxis)
                    .yRelativeTo(helper.getBR(0))
                    .height(height * 0.40)
                    .data(lineData[channel]);

                svg.call(lineChart);

                //ScatterChart
                scatterChart = scatterGraph.init()
                    .height(height * 0.40)
                    .width(helper.widthDependingOnPage(width))
                    .x(commonXAxis)
                    .yRelativeTo(helper.getBR(0))
                    .data(scatterData[channel])
                    .zoom(d3.zoomIdentity);

                svg.call(scatterChart);

                //EventsChart
                eventsChart = eventsGraph.init()
                    .height(height * 0.30)
                    .width(helper.widthDependingOnPage(width))
                    .x(commonXAxis)
                    .yRelativeTo(helper.getBR('scatter-g'))
                    .data(eventsData[channel])
                    .zoom(d3.zoomIdentity);

                svg.call(eventsChart);

                //PlayersChart
                playersChart = playersGraph.init()
                    .xPos(commonXAxis.range()[1])
                    .height(height)
                    .width(helper.widthDependingOnPage(width))
                    .x(commonXAxis)
                    .zoom(d3.zoomIdentity);

                svg.call(playersChart);

                //Calling Interactions
                d3.select(window).on('resize', resize);
                svg.call(overallZoom);

                overallZoom.scaleTo(svg, 1);

                // d3.select("#chart_container").style("opacity", "0");

                // d3.select(window)
                //     .on('mousemove', mousemoveIframe)
                //     .on("click", mousemoveIframe);

                // overallZoom.translateBy(svg, -100, -height);
            });




            function zoomHandler() {



                // live("stop");
                transform = d3.event.transform;

                console.log(transform);
                commonXAxis.domain(transform.rescaleX(commonXZoomAxis).domain());
                updateCharts();
            }





            //     // console.log(widthDependingOnPage(width));
            //     
            //     svg.call(playersChart);



            // //Going Live


            // var liveData = helper.fakeDataFormatter(data.liveFakeLine,
            //     lineData[channel].timestamps[lineData[channel].timestamps.length - 1] / 1000,
            //     "seconds");

            // console.log(liveData);

            // // // Update Common Axis
            // var xAxisLive;
            // var scatterLive;
            // var lineLive;

            // var minTime = 1499019468000;
            // var maxTime = 1499020728000;

            // function live(state) {


            //     if (!(xAxisLive || scatterLive || lineLive)) {

            //         xAxisLive = setInterval(function() {

            //             maxTime = maxTime + 1 * 1000;
            //             commonXAxis.domain([minTime, maxTime]);
            //             commonXZoomAxis.domain(commonXAxis.domain());
            //             commonXAxis.domain(transform.rescaleX(commonXZoomAxis).domain());
            //         }, 1000);




            //         scatterLive = setInterval(function() {

            //             console.log("Scatter UPDATE");

            //             // var liveScatter = [];

            //             // liveScatter.push({
            //             //     time: scatterTime,
            //             //     joshua_kimmich: [{
            //             //         sentiment_index: -Math.random() * 10,
            //             //         text: "Tweet 2",
            //             //     }, {
            //             //         sentiment_index: +Math.random() * 10,
            //             //         text: "Tweet 3"
            //             //     }]
            //             // });

            //             // scatterTime = scatterTime + 1;



            //             // helper.pS(scatterData, channel, liveScatter);
            //             scatterChart.x(commonXAxis).data(scatterData[channel]);

            //             // svg.call(overallZoom);


            //         }, 1000);

            //         // Update Line Chart Data

            //         lineLive = setInterval(function() {

            //             console.log("Line + Events");

            //             var x = liveData.shift();
            //             if (x) {
            //                 helper.pL(lineData, channel, [x]);
            //                 lineChart.x(commonXAxis).data(lineData[channel]);
            //                 eventsChart.x(commonXAxis).data(lineData[channel].events);
            //             } else {
            //                 console.log("STOPPED");
            //                 liveStop();
            //                 maxTime = maxTime + 100 * 1000;
            //                 commonXAxis.domain([minTime, maxTime]);
            //                 commonXZoomAxis.domain(commonXAxis.domain());
            //                 eventsChart.x(commonXAxis).data(lineData[channel].events);

            //             }

            //         }, 1000);

            //     }


            // }

            // function liveStop() {

            //     clearInterval(xAxisLive);
            //     clearInterval(scatterLive);
            //     clearInterval(lineLive);

            // }


            // // live();
            // // liveStop();


            function resize() {

                width = Math.round(parseInt(d3.select("#chart_container").style("width")));
                height = 150;
                console.log(width);

                //Container Update
                modelChart.width(width);
                modelChart.height(height);

                // Axis Update
                commonXAxis.range([0, helper.widthDependingOnPage(width)]);
                commonXZoomAxis.range(commonXAxis.range());

                console.log(commonXAxis.range())

                // Charts Update
                updateCharts();

            }

            function updateCharts() {

                lineChart.x(commonXAxis);
                scatterChart.width(helper.widthDependingOnPage(width)).x(commonXAxis).zoom(transform);
                eventsChart.width(helper.widthDependingOnPage(width)).x(commonXAxis).zoom(transform);
                playersChart.width(helper.widthDependingOnPage(width)).xPos(commonXAxis.range()[1]);

            }


            var iframetimer;

            function mousemoveIframe() {

                d3.select("body").style("background", "rgba(54, 61, 82, 0.2)");
                d3.select("#chart_container").style("opacity", "1");

                if (iframetimer) clearTimeout(iframetimer);
                iframetimer = setTimeout(function() {
                    d3.select("#chart_container").transition().style("opacity", "0");
                    d3.select("body").style("background", "none");
                }, 2000);

            }


        });
    });