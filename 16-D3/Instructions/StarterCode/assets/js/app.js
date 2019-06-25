// @TODO: YOUR CODE HERE!
//Set up SVG

function makeResponsive() {

  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
  var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }


var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// svg
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chart = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var yData = []
var xData = []
var stateData = []

// fetch data.csv
d3.csv("data.csv", function(error, theData) {
    if (error) throw error;
// Format the data
theData.forEach(function(data) {
    //data.date = parseTime(data.date);
    //data['abbr'] = +data['abbr']
    //data.age = +data.age;
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    //console.log(data['abbr']);
    //console.log(data.age);
    //console.log(data.poverty);
    //console.log(data.healthcare);
    yData.push(data.healthcare);
    xData.push(data.poverty);
    stateData.push(data.abbr);
    
    //console.log(data);
  });

  var xMax = d3.max(theData, function(d) { return +d.poverty; });
  var yMax = d3.max(theData, function(d) { return +d.healthcare; });
  console.log(xMax);
  console.log(yMax);
  console.log(yData);
  console.log(xData);
  console.log(stateData);
    //scale for chart
  var x = d3.scaleLinear()
        .domain([0, xMax + 5])
        .range([ 0, width ]); 

  var y = d3.scaleLinear()
        .domain([0, yMax])
        .range([height, 0]);

        var main = chart.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'main')   

  var xAxis = d3.axisBottom().scale(x);
        
  main.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .attr('class', 'main axis date')
        .call(xAxis);
 
  var yAxis = d3.axisLeft().scale(y);

  main.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('class', 'main axis date')
        .call(yAxis);
        
  var g = main.append("svg:g"); 

  g.selectAll("scatter-dots")
        .data(yData)  // using the values in the ydata array
        .enter().append("svg:circle")  // create a new circle for each value
            .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
            .attr("cx", function (d,i) { return x(xData[i]); } ) // translate x value
            .attr("r", 10) // radius of circle
            .style("opacity", 0.6);
            //.text(function (d,i) { return xData[i]; } );

  var circlesGroup = g.selectAll("circle")
            .data(yData)
            .enter()
            .append("circle")
            .attr("cx", (d, i) => x(i))
            .attr("cy", d => y(d))
            .attr("r", "5")
            .attr("fill", "red");
        
            
  
  //g.selectAll("scatter-dots")
           // .data(yData)  
            //.enter().append("svg:text")  // create a new circle for each value
               // .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
                //.attr("cx", function (d,i) { return x(xData[i]); } ) // translate x value
                //.text(function (d,i) { return stateData[i]; } );
   
  var toolTip = d3.tip()
                .attr("class", "tooltip")
                .offset([80, -60])
                .html(function(d, i) {
                  return (`<strong>${stageData[i] }<strong>`);
                });
          
  circlesGroup.call(toolTip); 

  circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this);
      })
      // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(d) {
          toolTip.hide(d);
        });
          
  
  svg.append("text")             
            .attr("x", 500 )
            .attr("y",  495 )
            .style("text-anchor", "middle")
            .text("Poverty Rate");
      
  svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Lack of Healthcare"); 
            

  });
}

makeResponsive();
