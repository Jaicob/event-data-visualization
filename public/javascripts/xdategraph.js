var streamgraph = function() {

    var datearray = [];
    var colorrange = [];

    function chart(csvpath, color) {

        var format = d3.time.format("%Y-%m-%d %H:%M");

        var nest = d3.nest()
            .key(function(d) {
                return d.key;
            });

        var graph = d3.json(csvpath, function(data) {

            data.forEach(function(d) {
                var date = d.date.substring(0, d.date.indexOf('T'));
                var time = d.date.substring(d.date.indexOf('T') + 1, d.date.length);
                var time = time.substring(0, 5);
                d.date = format.parse(date + ' ' + time);
                d.value = d.value;
            });

            function sortByDateAscending(a, b) {
                return a.date - b.date;
            }

            data = data.sort(sortByDateAscending);
            var nestedData = nest.entries(data);

            nestedData.forEach(function(category) {
                category.values.forEach(function(value) {
                    var index = category.values.indexOf(value);
                    category.values[index] = [+value.date, value.value];
                });
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