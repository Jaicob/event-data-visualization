var streamgraph = function() {
    var stack,
        width,
        height,
        x,
        y,
        color,
        area,
        svg;

    function initGraph(data) {
        n = 5, // number of layers
        m = 10; // number of samples per layer
        stack = d3.layout.stack().offset("wiggle"),
        layers0 = stack(data.data);

        //Defines the dimensions of the chart
        width = 960,
        height = 500;

        //Defines the x-axis
        x = d3.scale.linear()
            .domain([0, m - 1])
            .range([0, width]);

        //Defines the y-axis
        y = d3.scale.linear()
            .domain([0, d3.max(layers0, function(layer) {
                return d3.max(layer, function(d) {
                    return d.y0 + d.y;
                });
            })])
            .range([height, 0]);

        //Color range for sections of chart
        color = d3.scale.linear()
            .range(["#00a8f2", "#3E3E3E"]);

        //Area of svg
        area = d3.svg.area()
            .x(function(d) {
                return x(d.x);
            })
            .y0(function(d) {
                return y(d.y0);
            })
            .y1(function(d) {
                return y(d.y0 + d.y);
            });

        //SVG itself
        svg = d3.select("paper-material").append("svg")
            .attr("width", width)
            .attr("height", height)
        svg.selectAll("path")
            .data(layers0)
            .enter().append("path")
            .attr("d", area)
            .style("fill", function() {
                return color(Math.random());
            });
    }

    function transition(socket) {
        socket.emit('event req', {
            data: 'Request for data from client'
        });
    }

    //updateData
    function updateData(data) {
        d3.selectAll("path")
            .data(function() {
                var d = data.data;
                return stack(d);
            })
            .transition()
            .duration(2500)
            .attr("d", area);
    }

    return {
        initGraph: initGraph,
        transition: transition,
        updateData: updateData
    }

}();