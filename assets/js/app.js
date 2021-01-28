
// Define workspace area

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

// append svg group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//   Step 2 : Access Data
// Read in csv
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);
    // parse data
    data.forEach(d => {
        d.poverty = +d.poverty;
        console.log(d.poverty);
        d.obesity = +d.obesity;
        console.log(d.obesity)
    });
    // create scales
    var xPoverty = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, width]);

    var yObesity = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.obesity)*1.2])
        .range([height, 0]);

    // create axes
    var xAxis = d3.axisBottom(xPoverty);
    var yAxis = d3.axisLeft(yObesity);

    // append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);
    
     // add x axis title
     svg.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
        .attr("text-anchor","middle")
        .attr("font-size","16px")
        .attr("fill","black")
        .attr("font-weight","bold")
        .text("In Poverty (%)");

     // add y axis title
     svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("text-anchor","middle")
        .attr("x",(height/2)*-1)
        .attr("dy","1em")
        .attr("fill","black")
        .attr("font-weight","bold")
        .text("Obese (%)");

    // append circles for scatter plot dots
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xPoverty(d.poverty))
        .attr("cy", d => yObesity(d.obesity))
        .attr("r", "15")
        .attr("class","stateCircle");


    // add state abbr to circles
    var circleTextGroup = chartGroup.selectAll("text.text")
        .data(data)
        .enter()
        .append("text")
        .attr("class","stateText")
        .text(d=>d.abbr)
        .attr("dx", d => xPoverty(d.poverty))
        .attr("dy", d => yObesity(d.obesity))

    // Tooltip
    var toolTip = d3.tip()
        .attr("class","d3-tip")
        .html( function(d){
            return(`<strong>${d.state}</strong><br>
            Poverty: ${d.poverty} %<br>
            Obesity: ${d.obesity} %`);
        })

        circlesGroup.call(toolTip)

    // Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(d) {
        toolTip.show(d,this);
    })
    // Step 3: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(d) {
        toolTip.hide(d);
    });

}
, function(error) {
console.log(error);
});