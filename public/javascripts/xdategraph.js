var streamgraph = function() {
    var _this = this;
    var datearray = [];
    var colorrange = [];
    var format = d3.time.format("%Y-%m-%d");
    var nest = d3.nest()
        .key(function(d) {
            return d.category_id;
        });;
    var width = 900;
    var height = 560;
    var chart,
        chartData;


    function fillInMissingDates(values) {
        var existingDates = values.map(function(b) {
            return b[0];
        });
        var missingDates = _.difference(datearray, existingDates);
        missingDates.forEach(function(date) {
            var i = 0;
            for (i = 0; i < values.length; i++) {
                if (date < values[i][0]) {
                    values.splice(i, 0, [+date, 0]);
                    break;
                } else if (i === values.length - 1) {
                    values.push([+date, 0]);
                    break;
                }
            }
        });
        return values;
    }

    function formatData(data) {
        datearray = [];
        data.forEach(function(d) {
            d.date = format.parse(d.date);
            datearray.push(+d.date);
            d.value = +d.value;
        });

        datearray = _.uniq(datearray, function(a, b) {
            return +a;
        });

        function sortByDateAscending(a, b) {
            return a.date - b.date;
        }

        data = data.sort(sortByDateAscending);
        var nestedData = nest.entries(data);

        //Sum the values for each date
        //While the date is the same sum the value then slice everything but the original
        nestedData.forEach(function(category) {
            var i = 0;
            for (i = 0; i < category.values.length; i++) {
                var j = i + 1;
                var sum = category.values[i].capacity; // if undefined or null make this zero
                if (j < category.values.length && +category.values[j].date == +category.values[i].date) {

                    while (j < category.values.length && +category.values[j].date == +category.values[i].date) {
                        sum += category.values[j].capacity;
                        j++;
                    }

                    if (j - i >= 1) {
                        category.values.splice(i, j - i, [+category.values[i].date, sum]);
                    }
                } else {
                    category.values[i] = [+category.values[i].date, sum];
                }
            }
            //Fill in missing
            category.values = fillInMissingDates(category.values);
        });
        return nestedData;
    }

    function initGraph(jsondata, color, _) {

        var graph = d3.json(jsondata, function(data) {
            var nestedData = formatData(data);
            var colors = d3.scale.category20();
            
            _this.chart = nv.addGraph(function() {
                var chart = nv.models.stackedAreaChart()
                    .useInteractiveGuideline(true)
                    .x(function(d) {
                        return d[0]
                    })
                    .y(function(d) {
                        return d[1]
                    })
                    .controlLabels({
                        stacked: "Stacked"
                    })
                    .duration(300);
                chart.xAxis.tickFormat(function(d) {
                    return d3.time.format('%x')(new Date(d))
                });
                chart.yAxis.tickFormat(d3.format(',.4f'));
                // chart.width(900);
                // chart.height(560);
                chart.legend.vers('furious');
                chartData = d3.select('#chart1 svg').datum(nestedData);
                chartData.transition().duration(1000)
                    .call(chart)
                    .each('start', function() {
                        setTimeout(function() {
                            d3.selectAll('#chart1 *').each(function() {
                                if (this.__transition__)
                                    this.__transition__.duration = 1;
                            })
                        }, 0)
                    });
                nv.utils.windowResize(chart.update);
                _this.chart = chart;
                return chart;
            });
        });
    }

    function requestData(socket) {
        socket.emit('event req', {
            data: "Requesting data"
        });
    }

    function updateChartData(data) {
        // Update the SVG with the new data and call chart
        var formattedData = formatData(data);

        d3.select('#chart1 svg').datum([]).transition().duration(0).call(_this.chart);
        nv.utils.windowResize(_this.chart.update);

        _this.chart.xDomain([datearray[0], datearray[datearray.length - 1]]);
        d3.select('#chart1 svg').datum(formattedData).transition().duration(500).call(_this.chart);
        nv.utils.windowResize(_this.chart.update);
    }

    return {
        initGraph: initGraph,
        requestData: requestData,
        updateChartData,
        updateChartData
    }
}();