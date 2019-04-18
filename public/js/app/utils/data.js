define(function() {


    var scatterDataSample = [

        {
            time: 1499019290,
            joshua_kimmich: [{
                sentiment_index: 2.3,
                text: "Hello World",
            }, {
                sentiment_index: 4.5,
                text: "Hello 2"
            }]
        },
        {
            time: 1499019291,
            joshua_kimmich: [{
                sentiment_index: 9.8,
                text: "Hello World",
            }, {
                sentiment_index: -5,
                text: "Hello 2"
            }]
        },

    ];

    var lineDataSample = [

        {
            time: 1499019288,
            joshua_kimmich: {
                neg: 1.2,
                pos: 5
            }
        }, {
            time: 1499019300,
            joshua_kimmich: {
                neg: 4,
                pos: 10.2
            }
        }, {
            time: 1499019340,
            joshua_kimmich: {
                neg: 2,
                pos: 2
            }
        }
    ];



    var eventsData = [{
        x: 1499019290 * 1000,
        event: "Goal!"

    }, {
        x: 1499019300 * 1000,
        event: "Offside"
    }, {
        x: 1499019338 * 1000,
        event: "Half Time"
    }];

    var fakeLinedata = [{
            "Time": "3'",
            "Event": "OFFSIDE<br>Chile<br><br>Vargas tries to play a one-two with Aranguiz, but the return ball finds him offside.",
            "Pos": 7,
            "Neg": 3
        },
        {
            "Time": "5'",
            "Event": "CHANCE<br>Chile<br><br>Aranguiz lays off a ball for Vidal but his snapshot is saved by the legs of Ter Stegen",
            "Pos": 8,
            "Neg": 4
        },
        {
            "Time": "7'",
            "Event": "CHANCE<br>Chile<br><br>Vidal opens up at distance, but his shot is dragged well wide.",
            "Pos": 5,
            "Neg": 6
        },
        {
            "Time": "11'",
            "Event": "CORNER<br>Chile<br><br>Sanchez jinks past Rudy on the edge of the box but is tackled just before he can get a shot off. The ball goes out for a corner, but Ginter clears well.",
            "Pos": 3,
            "Neg": 7
        },
        {
            "Time": "19'",
            "Event": "FOUL<br>Germany<br><br>Goretzka brings down Vidal 30 yards from goal and to the right. ",
            "Pos": 4,
            "Neg": 15
        },
        {
            "Time": "20'",
            "Event": "CHANCE: FREE KICK<br>Chile<br><br>Vidal stings Ter Stegen's gloves from distance and Alexis Sanchez of all people can't turn the rebound goalwards from a few yards out. Germany clear. What a chance.",
            "Pos": 7,
            "Neg": 11
        },
        {
            "Time": "21'",
            "Event": "GOAL<br>Germany<br><br>Marcelo Diaz runs straignt into Werner, who nips the ball off him and squares for Stindl to tap in.",
            "Pos": 11,
            "Neg": 8
        },
        {
            "Time": "22'",
            "Event": "",
            "Pos": 25,
            "Neg": 2
        },
        {
            "Time": "23'",
            "Event": "",
            "Pos": 23,
            "Neg": 1
        },
        {
            "Time": "24'",
            "Event": "",
            "Pos": 18,
            "Neg": 2
        }
    ];

    var liveFakeLineData = [{
            "Time": "05",
            "Event": "",
            "Pos": 17,
            "Neg": 2
        },
        {
            "Time": "10",
            "Event": "",
            "Pos": 19,
            "Neg": 3
        }, {
            "Time": "15",
            "Event": "",
            "Pos": 20,
            "Neg": 4
        }, {
            "Time": "20",
            "Event": "",
            "Pos": 17,
            "Neg": 3
        }, {
            "Time": "25",
            "Event": "",
            "Pos": 16,
            "Neg": 2
        }, {
            "Time": "30",
            "Event": "",
            "Pos": 18,
            "Neg": 1
        }, {
            "Time": "35",
            "Pos": 15,
            "Neg": 2
        }, {
            "Time": "40",
            "Event": "",
            "Pos": 14,
            "Neg": 2
        }, {
            "Time": "45",
            "Event": "",
            "Pos": 18,
            "Neg": 3
        }, {
            "Time": "50",
            "Event": "",
            "Pos": 11,
            "Neg": 5
        }, {
            "Time": "55",
            "Event": "",
            "Pos": 14,
            "Neg": 6
        }, {
            "Time": "60",
            "Event": "CHANCE<br>Chile<br><br>Another Chile chance goes begging as they try and find a way back into the game.",
            "Pos": 12,
            "Neg": 8
        }
    ];


    return {
        scatterDataSample: scatterDataSample,
        lineDataSample: lineDataSample,
        eventsData: eventsData,
        fakeLine: fakeLinedata,
        liveFakeLine: liveFakeLineData
    };

});