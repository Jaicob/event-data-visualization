var streamgraph = function() {
    var stack,
        width,
        height,
        x,
        y,
        color,
        area,
        layers,
        xAxis,
        svg;

    function initGraph(data) {
        n = 5, // number of layers
        m = 4; // number of samples per layer

        stack = d3.layout.stack()
            .offset("wiggle").values(function(d) {
                console.log("DDDDDDDD", d.values);
                if (d.values.length < 1) {
                    return [{
                        x: 0,
                        y: 0,
                        y0: 0
                    }];
                }
                return d.values;
            });
        layers = stack(data.data);
        console.log("Layer", layers);

        //Defines the dimensions of the chart
        width = 960,
        height = 500;


        // function getDate(d) {
        //     return new Date(d.jsonDate);
        // }

        // // get max and min dates - this assumes data is sorted
        // var minDate = getDate(data.data[0]),
        //     maxDate = getDate(data.data[data.data.length - 1]);

        // var x = d3.time.scale().domain([minDate, maxDate]).range([0, width]);

        // x = d3.time.scale.utc()
        //     .range([0, width]);

        // scale.ticks(d3.time.minute, 15);

        // xAxis = d3.svg.axis()
        //     .scale(x)
        //     .orient("bottom")
        //     .ticks(d3.time.minute);

        // x.domain(d3.extent(data, function(d) {
        //     return d.date;
        // }));


        // Defines the x-axis
        x = d3.scale.linear()
            .domain([0, m - 1])
            .range([0, width]);

        //Defines the y-axis
        y = d3.scale.linear()
            .domain([0, d3.max(layers, function(layer) {
                var max = d3.max(layer.values, function(d) {
                    return d.y0 + d.y;
                });
                console.log("DEBUG: Max",max);
                return max;
            })])
            .range([height, 0]);

        //Color range for sections of chart
        color = d3.scale.linear()
            .range(["#00a8f2", "#3E3E3E"]);

        //Area of svg
        area = d3.svg.area()
            .x(function(d) {
                console.log("X", x(d.x));
                return x(d.x);
            })
            .y0(function(d) {
                console.log("Y0", y(d.y0));
                return y(d.y0);
            })
            .y1(function(d) {
                console.log("Y1", y(d.y0 + d.y));
                return y(d.y0 + d.y);
            });

        //SVG itself
        svg = d3.select("paper-material").append("svg")
            .attr("width", width)
            .attr("height", height)

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis)

        svg.selectAll("path")
            .data(layers)
            .enter().append("path")

        // .attr("d", area)
        .attr("d", function(d) {
            console.log("______________________", area(d.values));
            if (d.values.length < 1) {
                return area([{
                    x: 0,
                    y: 0,
                    y0: 0
                }]);
            }
            return area(d.values);
        })
        // .attr("d", area)
        .style("fill", function() {
            return color(Math.random());
        });
    }

    function transition(socket) {
        socket.emit('event req', {
            data: 'Request for data from client',
            client_id: socket.id
        });
    }

    //updateData
    function updateData(data) {
        console.log("UPDATING PATH WE WEJJJJJJJJJJJJJJJJJJJ");
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