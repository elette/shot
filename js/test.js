function simulation(startTime, r, w, h){
	"use strict";

    startTime = startTime === undefined ? "12:20" : startTime;

    r = r === undefined ? 150 : r;
    w = w === undefined ? 1024 : w;
    h = h === undefined ? 600 : h;
    var tw = DynamicChart.TimeWheelChart(40, startTime, r, w, h, "30 100 10 100;", 2).setPosition(10, 5)
                         .setBarsFillColor("cornflowerblue", 0).setBarsFillColor("hotpink", 1)
                         .setOuterBackgroundColor("lavenderblush")
                         .setInnerBorder("#E50000", 2, "3 2 3 1")
                         .setOuterBorder("black", 1)
                         //.setWheelCenter(512, 300)
                         .setShifitingDataMode(10)
                         .setAbbreviatedLabel(0)
                         .setTitle("Aggregates per minute", 25, "#DD0000")
                         .addLegend(["Males", "Females"], 130, 45, 20, 20);
                         //.setLocalScaling();
    var sb = DynamicChart.SlidingBarChart(50, w, 200, "25 60 35 1;", 2)
                         .setPosition(10, h + 10)
                         .setBarsFillColor("cornflowerblue")
                         .setBarsFillColor("hotpink", 1)
                         .setInnerBackgroundColor("lightgrey")
                         .setInnerBackgroundHighlightColor("gold")
                         .setOuterBackgroundColor("antiquewhite")
                         .setOuterBorder("black", 1)
                         .setTicksBetweenHighlights(10)
                         .setTitle("Real time values updated every second", 18, "firebrick")
                         .setVerticalAxe(true, "Tweets/sec", 5, 2, "red")
                         .setHorizontalAxe(false, "Time (sec.)", 20, 2, "#5B48FF");


    var males = [], females = [], dt = 200, t = dt;

	var timer = setInterval(function(){
                            var x = parseInt(Math.floor(Math.random()*(101*Math.log(t))), 10);
                            var y = parseInt(Math.floor(Math.random()*(101*Math.log(t))), 10);
                            males.push(y);
                            females.push(x);
                            sb.appendData([[y, x]]);
                            if (t % 2000 === 0){
                                var y_s = males.sum();
                                var x_s = females.sum();
                                males.length = 0;
                                females.length = 0;
                                tw.appendData([[y_s, x_s]]);
                            }
                            t += dt;
                        }, dt);

    function stop(){
            clearInterval(timer);
        }
    return stop;
}

var simulation_stop = simulation();