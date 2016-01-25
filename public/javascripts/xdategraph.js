var streamgraph = function() {

    var datearray = [];
    var colorrange = [];

    function chart(jsonpath, color, _) {

        var format = d3.time.format("%Y-%m-%d");

        var nest = d3.nest()
            .key(function(d) {
                return d.category_id;
            });

        var graph = d3.json(jsonpath, function(data) {
            var datearray = [];

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

                        if (j - i >= 1) category.values.splice(i, j - i, [+category.values[i].date, sum]);
                    } else {
                        category.values[i] = [+category.values[i].date, sum];
                    }
                }
                //Fill in missing
                category.values = fillInMissingDates(category.values);

            });

            var options = {
                width: {
                    default: 960,
                },
                height: {
                    default: 500,
                }
            };

            var colors = d3.scale.category20();
            var chart;
            nv.addGraph(function() {
                chart = nv.models.stackedAreaChart(options)
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
                chart.legend.vers('furious');
                d3.select('#chart1')
                    .datum(nestedData)
                    .transition().duration(1000)
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
                return chart;
            });
        });
    }

    return {
        initGraph: chart,
    }
}();