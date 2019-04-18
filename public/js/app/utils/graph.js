define(["d3", "./linegraph"], function(d3, lineChart) {

    function toplevelChart() {

        // All options that should be accessible to caller
        var margin = { top: 20, right: 80, bottom: 30, left: 50 };
        var width = 960;
        var height = 550;

        var updateWidth;
        var updateHeight;


        function chart(selection) {
            selection.each(function() {

                var dom = d3.select(this);
                var svg = dom.append('svg')
                    .attr('class', 'chart')
                    .attr('height', height)
                    .attr('width', width);


                updateWidth = function() {
                    svg.attr('width', width);
                };

                updateHeight = function() {
                    svg.attr('height', height);

                };
            });
        }

        chart.width = function(value) {
            if (!arguments.length) return width;
            width = value;
            if (typeof updateWidth === 'function') updateWidth();
            return chart;
        };

        chart.height = function(value) {
            if (!arguments.length) return width;
            height = value;
            if (typeof updateWidth === 'function') updateHeight();
            return chart;
        };

        return chart;
    }




    return {
        chart: toplevelChart
    };
});