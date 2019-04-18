const express = require('express');
const router = express.Router();
const helper = require("../../../helper");
const d3 = require('d3');
const jsdom = require('jsdom');



router.get('/', function(req, res, next) {

    var w = 110;
    var h = 50;
    var barPadding = 5;

    var dataset = [parseFloat(req.query.neg), parseFloat(req.query.pos)];
    var sum = dataset.reduce((a, b) => a + b, 0);

    if (sum === 0) {
        dataset = [1, 1];
        sum = 2;
    }

    jsdom.env({
        html: '',
        features: { QuerySelector: true }, //you need query selector for D3 to work
        done: function(errors, window) {
            window.d3 = d3.select(window.document); //get d3 into the dom

            //do yr normal d3 stuff
            var svg = window.d3.select('body')
                .append('div').attr('class', 'container') //make a container div to ease the saving process
                .append('svg')
                .attr({
                    width: w,
                    height: h
                });


            svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("height", function(d) {
                    return h;
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
                });

            res.render('screenshot', {
                title: req.query.title,
                name: req.query.channel,
                flag: req.query.flag,
                barChart: window.d3.select('.container').html(),
            });
        }
    });



});

module.exports = router;




// /screenshot?title=india&pos=12&neg=20&channel=India