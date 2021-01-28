// @TODO: YOUR CODE HERE!

// Step 1
// Define workspace area
  var svgArea = d3.select("body").select("svg");

  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;
  
  var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  
  var height = svgHeight - margin.top - margin.bottom;
  var width = svgWidth - margin.left - margin.right;

// append svg and group
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   Step 2 : Access Data
// Read in csv
d3.csv("D3_data_journalism/assets/data/data.csv").then(function(data) {
    console.log(data);
    // parse data
    data.forEach(d => {
        d.income = +d.income;
        console.log(d.income);
        d.obesity = +d.obesity;
        console.log(d.obesity)
    });
    // create scales
    var xIncomeScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.income))
        .range([0, width]);

    var yObesityScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.obesity)])
        .range([height, 0]);

    // create axes
    var xAxis = d3.axisBottom(xIncomeScale);
    var yAxis = d3.axisLeft(yObesityScale).ticks(6);

    // append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);
    
    // // create dots variable
    // var gdots = svg.selectAll("g.dot")
    //     .data(data)
    //     .enter()
    //     .append('g');

    // append circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xIncomeScale(d.income))
        .attr("cy", d => yObesityScale(d.obesity))
        .attr("r", "8")
        // .style("fill","stroke");
        .style("fill","#e3e3e3");
        // .attr("fill", "gold")
        // .attr("stroke-width", "1")
        // .attr("stroke", "black");

    
  });

// Step 3: Clean and filter data

// Step 4: Scale Axes

// Step 5: Draw actual chart

// Step 6: Add text/titles

// Step 7: Tooltip