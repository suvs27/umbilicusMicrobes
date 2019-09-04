function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url1 = "/metadata/";
  var url = url1.concat(sample);
  d3.json(url).then(function (response) {
    //console.log(response);
    var data = response;

    // Use d3 to select the panel with id of `#sample-metadata`
    var smp = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    smp.html("");


    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    // Get the entries for each object in the array
    Object.entries(data).forEach(([key, value]) => {
      // Log the key and value
      console.log(`Key: ${key} and Value ${value}`);
      smp.append("div").text(`${key} : ${value}`);
    });

    // BONUS: Build the Gauge Chart
    console.log("buildGauge1");
    buildGauge(data.WFREQ);

  });

 
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

  var url2 = "/samples/";
  var url3 = url2.concat(sample);
  d3.json(url3).then(function (response) {

  // @TODO: Build a Bubble Chart using the sample data
  var sd = response;
  console.log(sd);
  console.log(`otu_labels ${sd.otu_labels}`);

  var trace1 = {
    x: sd.otu_ids,
    y: sd.sample_values,
    text: sd.otu_labels,
    mode: 'markers',
    marker: { size: sd.sample_values, color: sd.otu_ids,  colorscale: [[0, 'rgb(200, 255, 200)'], [1, 'rgb(0, 100, 0)']]}
  };

  var bubbleData = [trace1];
  console.log("test bubble")
  Plotly.newPlot('bubble', bubbleData);



  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  var ultimateColors = ["rgba(0, 255, 0, 0.1)", 
                "rgba(0, 255, 0, 0.2)", 
                "rgba(0, 255, 0, 0.3)", 
                "rgba(0, 255, 0, 0.4)", 
                "rgba(0, 255, 0, 0.5)", 
                "rgba(0, 255, 0, 0.6)", 
                "rgba(0, 255, 0, 0.7)", 
                "rgba(0, 255, 0, 0.8)", 
                "rgba(0, 255, 0, 0.9)", 
                "white"];
  var top10values = sd.sample_values.slice(0,10);
  var top10labels = sd.otu_labels.slice(0,10);
  var top10ids = sd.otu_ids.slice(0,10);
  var trace2 = {
    labels: top10ids,
    values: top10values,
    hoverinfo: top10labels,
    marker: {color: ultimateColors},
    type: 'pie'
    };

  var pieData = [trace2];
  console.log("test pie")
  Plotly.newPlot('pie', pieData);


});

}

function init() {
  // Grab a reference to the dropdown select element
  console.log("print init")
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    console.log("buildCharts")
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
console.log("test)")
init();

