
var arrShot = new Array();
function addShot(id) {
    var pane = document.createElement("CANVAS");
    arrShot.push(new Array(pane, null));

//  arrShot[arrShot.length][0] = pane;

    pane.setAttribute("id", id);
    pane.setAttribute("class", "canvas");
	pane.setAttribute("width", 620);
	pane.setAttribute("height", 270);
	$E('graph').appendChild(pane);
    callShot(pane);
//     drawCanvas();

}

function removeShot(intShot) {
	if (arrShot[intShot][0].nodeName == 'CANVAS') {
		$E('graph').removeChild(arrShot[intShot][3]); // parentNode
		// arrShot[intShot][0].removeChild(arrShot[intShot][3]); // pane
		clearInterval(arrShot[intShot][2]);
		// alert(arrShot[intShot][0].nodeName);
		arrShot[intShot][1].destroy();
	}
    $E('graph').removeChild(arrShot[intShot][0]);
    arrShot.splice(intShot,1);
    drawCanvas();
}

var scroll = true;
function drawCanvas() {
    $E('graph').style.width = parseInt(0.9*window.innerWidth);
    $E('graph').style.height = parseInt(0.9*window.innerHeight);
    var totWidth = $E('graph').clientWidth;
    var totHeight = $E('graph').clientHeight;
    var canvasLeft = $E('graph').clientLeft;
    var canvasTop = $E('graph').clientTop;

    var paneHeight;
    var paneWidth;
	
	var len=arrShot.length;
	
	var part = $E('part').value;
	if (!scroll) {
		// in one screen
		paneHeight = parseInt(totHeight / ((len>part)?part:len));
		paneWidth = parseInt(totWidth / (parseInt((len-1)/part) + 1));
	}else{
		// in scroll
		paneHeight = parseInt(totHeight / ((len>part)?part:len));
		paneWidth = parseInt(totWidth / ((len>(part*part))?part:(parseInt(parseInt((len-1)/part)%part) + 1)));
	}
	// paneHeight-=20;
	// paneWidth-=20;
	paneHeight = 270;
	paneWidth = 620;
// console.log("height : " + paneHeight + ", width : "+paneWidth);
    for(i=0;i<len;i++) {
        arrShot[i][0].style.width = parseInt(paneWidth-20) + 'px';
        arrShot[i][0].style.height = parseInt(paneHeight-20) + 'px';
		// paneHeight = arrShot[i][0].style.height;
		// paneWidth = arrShot[i][0].style.width;
	if (!scroll) {
		// in one screen
        arrShot[i][0].style.left = canvasLeft + paneWidth * parseInt(i/part) + 0;
        arrShot[i][0].style.top = canvasTop + paneHeight * parseInt(i%part) + 20;
	}else{
		// in scroll
        arrShot[i][0].style.left = canvasLeft + paneWidth * parseInt(parseInt(i/part)%part) + 0;
        arrShot[i][0].style.top = canvasTop + paneHeight * (parseInt(i%part) + part*parseInt(i/(part*part))) + 20;
	}
// console.log("i : " + i + ", canvasTop : " + canvasTop + ", paneHeight : " + paneHeight + ", real : " + arrShot[i][0].style.top);
		// arrShot[i][0].style.zIndex = 1;
       // arrShot[i][1].setSize(paneWidth, paneHeight);
       // arrShot[i][1].width = paneWidth;
       // arrShot[i][1].height =  paneHeight;
	   // alert(arrShot[i][0].nodeName);
	    var ratio = paneWidth/totWidth;
        if (arrShot[i][0].nodeName == 'CANVAS') {
			// arrShot[i][1].width = paneWidth;
			// arrShot[i][1].height =  paneHeight;
       // arrShot[i][1].setSize(paneWidth, paneHeight);
			// arrShot[i][1].draw(); //instead of resize()
			// arrShot[i][1].resize();
			arrShot[i][3].style.fontSize = parseInt(10*ratio)+'pt';
			arrShot[i][3].style.position = "absolute";
			arrShot[i][3].style.left = parseInt(arrShot[i][0].style.left) + parseInt(60*ratio);
			arrShot[i][3].style.top = arrShot[i][0].style.top;
			// arrShot[i][3].style.zIndex = 100;
			// console.log("left: " + arrShot[i][3].style.left);
		}
		else {
			if (arrShot[i][1]) 
			arrShot[i][1].style("padding-left", "60px");
			// arrShot[i][1].style("padding-right", "10px");
			// arrShot[i][1].draw();
						
			// arrShot[i][1].attr("width", parent.clientWidth).attr("height", parent.clientHeight);
			// arrShot[i][1].attr("transform", "translate(20,0)");
			
		}
    }
    var strList='';
    for (i=0; i<arrShot.length; i++)
        strList += "<a href='javascript:removeShot(" + i +");'>X</a>&nbsp;" + arrShot[i][0].id + "<br>";
    $E('chartList').innerHTML = strList;
}

function callShot(pane) {
	/*
	paneid: attribute of pane to save result to file
	*/
	var mEvent = (window.event)? window.event:event;
	var strBtn="N";
    if (mEvent.srcElement) {
        strBtn = mEvent.srcElement.innerHTML;
    }
    else if (mEvent.target) {
        strBtn = mEvent.target.innerHTML;
    }
	strBtn=(strBtn=='+')?'Y':(strBtn=='-')?'N':'B';

	var paneid = pane.getAttribute("id");
    var url = "CommandAction?CID=Mon&CMD=getxml&SQL=" + urlfmt($E('SQL').value) + "&SYSTEM=" + $E('NAME').value + "&PANEID=" + paneid + "&SAVE=" + strBtn + "&SYSOUT=Y&nocache=" + Math.random();

	var period = $E('period').value;
	if (isNaN(period)) {alert("input secs."); return;}
    var chart;
    var labels = [];
    var data = [];

	var xAxisWidth=40;
    for (var i = 0; i< xAxisWidth; i++) {
        labels.push('');
        data.push(null);
    }
    var lineChartData = {
            labels : labels,
            datasets : [
                // {
                //     label: "",
                //     data: data
                // },
                // {
                //     label: "",
                //     data: data
                // }
            ]
    };
    $(document).ready(function() {

        $.get(url, function(xml) {

            // Split the lines
            var $xml = $(xml);

// alert($xml.find("column").find("name").text());
if ($xml.find("column").find("name").text().length == 0) return;
            // initial set
            var col = new Array();
            $xml.find('column').each(function(i, column) {
//                lineChartData.datasets.push({
//                    label : $(column).find('name').text()
                    col.push(new Array($(column).find('name').text(), '#'+Math.random().toString(16).substr(-6)));
//                    data: 
            });
//            alert(lineChartData.datasets.toString());
            // push series
            $xml.find('series').each(function(i, series) {
                // var data = [];

                // push data points
                $(series).find('value').each(function(i, value) {
                    lineChartData.datasets.push({
                        fillColor: col[i][1],
                        strokeColor: col[i][1],
                        pointColor: col[i][1],
                        pointStrokeColor : "#fff",
                        pointHighlightFill : "#fff",
                        pointHighlightStroke : col[i][1],
                        label: col[i][0],
                        data: data
                    // data.push(parseInt($(value).text()));
//                    alert(data);
                    });
                });
                // lineChartData.labels.push($(series).find('name').text());
                // lineChartData.datasets.push({
                //     label: col[i],
                //     data: data
                // });

                // add it to the options
            });
			
			// alert(arrShot[arrShot.length-1][0]);
			var options = {
                legendTemplate : paneid + "<ul class=\"legend\"><% for (var i=0; i<datasets.length; i++){%><li style=\"color:<%=datasets[i].strokeColor%> !important \"><span ><%=datasets[i].value%>  <%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",
                animation: false,
                responsive: false,
				maintainAspectRatio: false,
                bezierCurve : false,
				scaleOverride: false,
				scaleFontSize: 10,
				tooltipFontSize: 10,
				tooltipTitleFontSize: 10,
				tooltipCaretSize: 6,
                datasetFill : false
            };
            var ctx = pane.getContext("2d");
            chart = new Chart(ctx).Line(lineChartData, options);

			arrShot[arrShot.length-1][1] = chart;
			// drawCanvas();
			// window.addResizeListener(pane, _.debounce(resizeChart(chart), 16));
	//     alert("zz");
			var spanLegend = document.createElement("SPAN");
			spanLegend.setAttribute("class", "legend-var");
			spanLegend.innerHTML = chart.generateLegend();
			// spanLegend.style.zIndex = 0; // pane
			pane.parentNode.appendChild(spanLegend);

			arrShot[arrShot.length-1][2] = setInterval(reqData, period*1000);
			arrShot[arrShot.length-1][3] = spanLegend; // pane
			drawCanvas();

        });
	// function resizeChart(element) {
		// element.resize(element.render, true);
	// }

    function reqData() {

        $.get(url, function(xml) {

            var $xml = $(xml);
            var i=0;
            // push series
            $xml.find('series').each(function(i, series) {
                var label = $(series).find('name').text();
                var data = [];
                // push data points
                $(series).find('value').each(function(i, value) {
                    data.push(parseInt($(value).text()));
                });
                // $(series).find('value').each(function(i, value) {
                    chart.addData(data, label);
                // });
                chart.removeData();
                i++;
            });
        });
    }
//     arrShot[arrShot.length-1][1] = chart;
    }); //end of $(dodument).ready()


}

var run;
function callChart() {
    myChart.draw();
    if (run) clearTimeout(run);
}

// STMM delta shot
function stmmShot(pane, stmm) {

		var options = {
			legendTemplate : stmm,
			animation: false,
			responsive: false,
			maintainAspectRatio: false,
			bezierCurve : false,
			scaleOverride: false,
			scaleFontSize: 10,
			showXLabels: 10,
			tooltipFontSize: 10,
			tooltipTitleFontSize: 10,
			tooltipCaretSize: 6,
			datasetFill : false
		};
		var ctx = pane.getContext("2d");
		new Chart(ctx).Line(lineChartData[stmm], options);
}

function backShot(id) {
	var url = "CommandAction?CID=Mon&CMD=getxml&SQL=" + urlfmt($E('SQL').value) + "&SYSTEM=" + $E('NAME').value + "&PANEID=" + id + "&SAVE=" + "B" + "&DELAY=" + $E('period').value + "&COUNT=" + $E('count').value + "&SYSOUT=Y&nocache=" + Math.random();
	var XHttp =  new initXHttp();
	XHttp.onreadystatechange = function() {};
		// if (XHttp.readyState == 4 && XHttp.status == 200) {
			// var pane = document.createElement("CANVAS");
			// arrShot.push(new Array(pane, null));

		// //  arrShot[arrShot.length][0] = pane;

			// pane.setAttribute("id", "[_]"+id);
		// }
	// };

	XHttp.open("GET", url, true);
	XHttp.send(null);

	var pane = document.createElement("DIV");
	arrShot.push(new Array(pane, null));
	pane.setAttribute("id", "[_]"+id);
	pane.innerHTML = id + " : background processing...";
    pane.setAttribute("class", "canvas");
	pane.setAttribute("width", 620);
	pane.setAttribute("height", 20);
	$E('graph').appendChild(pane);
	// arrShot[arrShot.length-1][1] = document.createElement("CANVAS");
	drawCanvas();
}

// graph for log
function logShot(sUrl, name) {
	// console.info(sUrl);
	var pane = document.createElement("DIV");
    arrShot.push(new Array(pane, null));
    pane.setAttribute("id", name);
    pane.setAttribute("class", "canvas");
	$E('graph').appendChild(pane);

    // var margin = {top: 10, right: 40, bottom: 120, left: 60},
    var margin = {top: 10, right: 30, bottom: 40, left: 60},
        // width = $E('graph').clientWidth - margin.left - margin.right,
        // height = parseInt(($E('graph').clientHeight - margin.top - margin.bottom)/2);
        width = 620 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

	var dateformat = ($('input[name="dateformat"]:checked').val() == 'DATETIME')?"%Y-%m-%d %X": "%X";
    var parseDate = d3.time.format(dateformat).parse;	//%Y-%m-%d 

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("linear")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

// console.log("width : " + parseInt(width)+parseInt(margin.left)+parseInt(margin.right) + ", height : " + height+margin.top+margin.bottom);
	var iWidth = parseInt(width)+parseInt(margin.left)+parseInt(margin.right),
		iHeight = parseInt(height)+parseInt(margin.top)+parseInt(margin.bottom);

    var svg = d3.select(pane)
		.append("div")
		.classed("svg-container", true)
		.append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 " + iWidth + " " + iHeight)
		.classed("svg-content-responsive", true);
		
		// .attr("width", iWidth)
		// .attr("height", iHeight)
		// .append("g")
		// // // .attr("transform", "translate(0, 0)")
		// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv(sUrl, function(error, data) {
		if (error) {
			$E('graph').removeChild(pane);
			arrShot.splice(arrShot.length-1,1);
			alert("Not supported.");
			console.warn(error);			
			return;
		}
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "TIME"; }));

		data.forEach(function(d) {
			d.date = parseDate(String(d.TIME));
		});

		var series = color.domain().map(function(name) {
			return {
				name: name,
				values: data.map(function(d) {
					return {date: d.date, value: +d[name]};
				})
			};
		});

		x.domain(d3.extent(data, function(d) { return d.date; }));

		y.domain([
			d3.min(series, function(c) { return d3.min(c.values, function(v) { return v.value; }); }),
			d3.max(series, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
		]);
		// y.domain(d3.extent(data, function(d) { return d.value; }));

		var gAxis = svg.append("g")
		// svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);
		// .append("text")
		//   .attr("transform", "rotate(-90)")
		//   .attr("y", 6)
		//   .attr("dy", ".71em")
		//   .style("text-anchor", "end")
		//   .text("Temperature ()");

		var snap = svg.selectAll(".snap")
			.data(series)
			.enter().append("g")
			.attr("class", "snap");

		snap.append("path")
			.attr("class", "line")
			.attr("d", function(d) { return line(d.values); })
			.attr("data-legend", function(d) { return d.name })
			.style("stroke", function(d) { return color(d.name); });

		// var mouseS, mouseE;
		// var drag = d3.behavior.drag()
			// // .origin(function(d) { return d; })
			// .on("dragstart", mouseStart)
			// .on("dragend", mouseEnd);
			
		// svg.call(drag);

		arrShot[arrShot.length-1][1] = svg;
		// arrShot[arrShot.length-1][2] = snap;
		drawCanvas();

		var legend = svg.append("g")
			.attr("class","legend")
			.attr("transform","translate(10,10)")
			// .style("font-size","9px")
			.call(d3.legend);

		// svg.on("click", click);
		// svg.on("click", function() {if (d3.event.defaultPrevented) return;});
		
		function click() {
			// console.info("clicked");
			// console.log("width: " + width + ", mouse: " + d3.mouse(this));
			
			var n = data.length - 1,
				// i = parseInt(n*mouseS/width),
				i = parseInt(n*d3.mouse(this)[0]/width),
				// j = parseInt(n*mouseE/width);
				j = i + 100;
				
				j = (j<n)?j:n;
			
			x.domain([data[i].date, data[j].date]);
		// x.domain(d3.extent(data, function(d) { return d.date; }));
		// console.log("x axis coord: " + data[0].date + ", " + d3.max(d3.extent(data, function(d) { return d.date; })));
		// console.log("x axis coord: " + d3.min(x.domain()) + ", " + d3.max(x.domain()));
			// var t = svg.transition().duration(500);
			// t.select(".x.axis").call(xAxis);

			gAxis.call(xAxis);
			// snap.attr("d", function(d) { return line(d.values); });
			// t.select(".line").attr("d", function(d) { return line(d.values); });
			// snap.attr("transform", "translate(60,0)");
			snap.select("path")
				.attr("d", function(d) { return line(d.values); });
		}

		// function mouseStart() {
			// // d3.event.sourceEvent.stopPropagation(); // silence other listeners
			// mouseS = d3.mouse(this)[0];	//d3.event.x; 
			// console.log("started x: " + mouseS);
		// }
		// function mouseEnd() {
			// mouseE = d3.mouse(this)[0];	//d3.event.x; 
			// console.log("ended x: " + mouseE);
			// click();
		// }

    });
	

}

function viewType() {
	scroll = !scroll;
	$E('viewtype').innerHTML = ($E('viewtype').innerHTML == 'Scroll')? 'One' : 'Scroll';
	drawCanvas();
}
