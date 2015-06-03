
var arrShot = new Array();
function addShot(id) {
    var pane = document.createElement("DIV");
    arrShot.push(new Array(pane, null));

//  arrShot[arrShot.length][0] = pane;

    pane.setAttribute("id", id);
    pane.setAttribute("class", "canvas");
    $E('graph').appendChild(pane);
    callShot(pane);
//     drawCanvas();

}

function removeShot(intShot) {
    clearInterval(arrShot[intShot][2]);
    arrShot[intShot][1].destroy();
    $E('graph').removeChild(arrShot[intShot][0]);
    arrShot.splice(intShot,1);
    drawCanvas();
}

function drawCanvas() {
    var totWidth = $E('graph').clientWidth;
    var totHeight = $E('graph').clientHeight;
    var canvasLeft = $E('graph').clientLeft;
    var canvasTop = $E('graph').clientTop;

    var paneHeight;
    var paneWidth;

    paneHeight=parseInt(totHeight / ((arrShot.length>4)?4:arrShot.length));
    paneWidth=parseInt(totWidth / (parseInt((arrShot.length-1)/4) + 1));

    for(i=0;i<arrShot.length;i++) {
//         arrShot[i][0].style.height = paneHeight;
//         arrShot[i][0].style.width = paneWidth;
        arrShot[i][0].style.left = canvasLeft + paneWidth * parseInt(i/4);
        arrShot[i][0].style.top = canvasTop + paneHeight * parseInt(i%4);
        arrShot[i][1].setSize(paneWidth, paneHeight);
    }
    var strList='';
    for (i=0; i<arrShot.length; i++)
        strList += arrShot[i][0].id + "&nbsp;<a href='javascript:removeShot(" + i +");'>¡¿</a><br>";
    $E('chartList').innerHTML = strList;
}

function callShot(pane) {
	/*
	painid: attribute of pane to save result to file
	*/
	var paneid = pane.getAttribute("id");
    var url = "CommandAction?CID=Mon&CMD=getxml&SQL=" + urlfmt($E('SQL').value + "&SYSTEM=" + $E('NAME').value + "&PANEID=" + paneid + "&SYSOUT=Y&nocache=" + Math.random());
//     resultData = [];
//     resultData = eval("[" + CHR(url) + "]");

//     var cur = (new Date()).getTime();
//     for (var i = 10 - 1; i >= 0; i--) {
//         resultData.push([cur - i * 2000, 0.6 + Math.random()]);
//     }
//     Highcharts.setOptions({
//         global: {
//             useUTC: false
//         }
//     });

    var chart;
    $(document).ready(function() {
        var options = {
            chart: {
                renderTo: pane,
                defaultSeriesType: 'line',
                marginRight: 10,
                backgroundColor: "#202020",
//                 animation: Highcharts.svg,
                events: {
                    load: function() {
                            arrShot[arrShot.length-1][2] = setInterval(reqData, 2000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {second: '%H:%M:%S'},
//                 type: 'column', //
                categories: [],
//                 startOnTick: false,
//                 endOnTick: false,
                tickPixelInterval: 100,
                labels: {
                    step: 10
                }
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: []
//             series: [{
//                 name: 'Random data',
//                 data: []//resultData
//             }]


        };

        $.get(url, function(xml) {

            // Split the lines
            var $xml = $(xml);

//             // push categories
//             $xml.find('categories item').each(function(i, category) {
//                 options.xAxis.categories.push($(category).text());
//             });

            // push series
            $xml.find('series').each(function(i, series) {
                var seriesOptions = {
                    name: $(series).find('name').text(),
                    data: []
                };
                var time = (new Date()).getTime();
                // push data points
                $(series).find('data point').each(function(i, point) {
                    seriesOptions.data.push({
                        x: time,
                        y: parseInt($(point).text())
                    });
// alert($(point).text());
                });

                // add it to the options
                options.series.push(seriesOptions);
            });
            chart = new Highcharts.Chart(options);
    arrShot[arrShot.length-1][1] = chart;
    drawCanvas();
//     alert("zz");
    chart.xAxis[0].setExtremes(chart.series[0].data[0].x-100,series.data[0].x,true,false);

        });


//     function reqData() {
//         // set up the updating of the chart each second
//         var y2=[];
//         var series = chart.series[0];
//         y2 = eval("[" + CHR(url) + "]");
//         var len = series.data.length;
//         shift = len > 100-1;
// //         series.addPoint([(new Date()).getTime(), Math.random()], false, shift);
//         series.addPoint([(new Date()).getTime(), y2[1]], false,shift);
//
//         // series.addPoint([(new Date()).getTime(),Math.random()], true, shift);
//         chart.xAxis[0].setExtremes(series.data[0].x,series.data[len-1].x,false,false);
//         chart.redraw();
//     }

    function reqData() {

//         // Load the data from the XML file
//         var xmlDoc = CHR(url);
//
// //         var x = xmlDoc.evaluate("/Chart/series", xmlDoc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE , null);
// //         var item = x.iterateNext();
//         var x = xmlDoc.getElementsByTagName('series');
// // alert(x[0].textContent);
// //         while (item) {
//         for (i=0; i<x.length; i++) {
// //             alert('[' + item.childNodes['name'].textContent + ']');
// //             alert('[' + x[i].childNodes[1].childNodes[0].textContent + ']');
// //             alert('[' + x[i].childNodes[3].childNodes[0].textContent + ']');
// //             alert(x[i].childNodes[3].childNodes.length);
//                 var seriesOptions = {
//                     name: x[i].childNodes[1].childNodes[0].textContent,
//                     data: []
//                 };
//                 var time = (new Date()).getTime();
//                 // push data points
//
//                 for(j=0; j<x[i].childNodes[3].childNodes.length; j++) {
//                     seriesOptions.data.push({
//                         x: time,
//                         y: x[i].childNodes[3].childNodes[j].textContent
//                     });
//                 };
// //
// // //                 list += "<li title=\"" + item.parentNode.childNodes[5].textContent + "\" onClick='selectRow(this);'>" + item.textContent + "</li>"
//
// //                 item = x.iterateNext();
//                 options.series.push(seriesOptions);
//             }
//
// //             chart.setOptions(options);
//             chart.redraw();
//         }

        var series = chart.series[0];
        var len = series.data.length;
        shift = len > 10-1;
//         chart.xAxis[0].setExtremes(series.data[0].x,series.data[len-1].x,true,true);
        $.get(url, function(xml) {

// alert('aaa');
            // Split the lines
            var $xml = $(xml);

//             // push categories
//             $xml.find('categories item').each(function(i, category) {
//                 options.xAxis.categories.push($(category).text());
//             });

            var i=0;
            // push series
            $xml.find('series').each(function(i, series) {
//                 var seriesOptions = {
//                     name: $(series).find('name').text(),
//                     data: []
//                 };
                var time = (new Date()).getTime();
//                 alert(time);
                // push data points
                $(series).find('data point').each(function(i, point) {
//                     seriesOptions.data.push({
//                         x: time,
//                         y: parseInt($(point).text())
//                     });
// alert('[' + chart.series[i].name + ', ' + $(point).text() +']');
// chart.series[i].addPoint(60, false, true);
                    chart.series[i].addPoint([time, parseInt($(point).text())], true, shift);
                });

                // add it to the options
//                 options.series.push(seriesOptions);
                i++;
            });

//             Highcharts.setOptions(options);
//             chart.redraw();
        });
    }
//     arrShot[arrShot.length-1][1] = chart;
    });


}

var run;
function callChart() {
    myChart.draw();
    if (run) clearTimeout(run);
}

