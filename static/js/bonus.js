
function buildGauge(freq) {
    console.log("test buildGauge2");


    var traceG = {
        type: "pie",
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        values: [100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100 / 9, 100],
        text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
        direction: "clockwise",
        textinfo: "text",
        textposition: "inside",
        hoverinfo: freq,
        marker: {
            colors: ["rgba(0, 10, 0, 0.1)",
                "rgba(0, 50, 0, 0.2)",
                "rgba(0, 75, 0, 0.3)",
                "rgba(0, 100, 0, 0.4)",
                "rgba(0, 125, 0, 0.5)",
                "rgba(0, 175, 0, 0.6)",
                "rgba(0, 200, 0, 0.7)",
                "rgba(0, 225, 0, 0.8)",
                "rgba(0, 255, 0, 0.9)",
                "white"]
        },
    };

    //define coordinates of pointer end
    var x = 0;
    var y = 0;

    if (freq >= 0 && freq < 1) {
        x = .2;
        y = .6;
    }

    if (freq >= 1 && freq < 2) {
        x = .3;
        y = .7;
    }

    if (freq >= 2 && freq < 3) {
        x = .3;
        y = .8;
    }

    if (freq >= 3 && freq < 4) {
        x = .4;
        y = .8;
    }

    if (freq >= 4 && freq < 5) {
        x = .5;
        y = .8;
    }
    
    if (freq >= 5 && freq < 6) {
        x = .55;
        y = .75;
    }

    if (freq >= 6 && freq < 7) {
        x = .6;
        y = .7;
    }

    if (freq >= 7 && freq < 8) {
        x = .7;
        y = .7;
    }

    if (freq >= 8 && freq < 9) {
        x = .8;
        y = .6;
    }
    

    


    

    var layout = {
        autosize: false,
        width: 600,
        height: 600,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 150,
            pad: 4
        },
        shapes: [{
            type: 'line',
            x0: .5,
            y0: .5,
            x1: x,
            y1: y,
            line: {
                color: 'black',
                width: 2
            }
        }],
        title: 'Belly Button Washing Frequency \n Scrubs Per Week',
        xaxis: { visible: true, range: [-5, 5] },
        yaxis: { visible: true, range: [-5, 5] }
    };

    var dataG = [traceG];
    console.log('test gaugePlot before');
    Plotly.newPlot('gauge', dataG, layout);
    console.log('test gaugePlot after');


}