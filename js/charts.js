// Chart canvas
const waveform = document.getElementById('waveform').getContext('2d');
// const rmPlot = document.getElementById('r-mPlot').getContext('2d');

// generates a sine wave waveform with amplitude of alt and and offset of mean
export const generateWaveform = (alt, mean) => {
    const PI = Math.PI;
    let data = [];

    // 2 PI split into 0.1 PI increments
    for (let i = 0 ; i <= 20 ; i++) {
            let xval = i / 10 * PI;
            let yval = alt * Math.sin(xval) + mean;
            let point = {
                x: xval,
                y: yval
            };
            data.push(point);
        }
    return data;
};

// intial value on page loading
let data = generateWaveform(450, 50);

// global Chart values
Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.plugins.deferred.options = { "deferred": { "xOffset": "50%", "delay": 250 } };

let waveformChart = new Chart(waveform, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Fatigue Cycle',
            data: data,
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2
        }],
    },
    options: {
        elements: {
            line: {
                fill: false,
            },
            point: {
                radius: 0,
                hoverRadius: 0,
                hoverBorderWidth: 0
            }
        },
        layout: {
            padding: {
                left: 5,
                right: 15,
                top: 5,
                bottom: 5
            }
        },
        legend: {
            display: false
        },
        annotation: {
            drawTime: 'afterDraw', // (default)
            annotations: [{
                id: "maxLine",
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: data[5].y,
                borderColor: "lightgrey",
                borderWidth: 1,
                label: {
                    backgroundColor: "rgba(130, 130, 130, 0.7)",
                    content: `Max: ${Math.round(data[5].y)}`,
                    position: 'center',
                    // xAdjust: -30,
                    enabled: true,
                    fontSize: 10
                }
            }, {
                id: "meanLine",
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: data[10].y,
                borderColor: "lightgrey",
                borderWidth: 1,
                label: {
                    backgroundColor: "rgba(130, 130, 130, 0.7)",
                    content: `Mean: ${Math.round(data[10].y)}`,
                    // xAdjust: 30,
                    position: 'center',
                    enabled: true,
                    fontSize: 10
                }
            }, {
                id: "minLine",
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: data[15].y,
                borderColor: "lightgrey",
                borderWidth: 1,
                label: {
                    backgroundColor: "rgba(130, 130, 130, 0.7)",
                    content: `Min: ${Math.round(data[15].y)}`,
                    position: 'center',
                    // xAdjust: -10,
                    enabled: true,
                    fontSize: 10
                },
            }, {
                id: "altLabel",
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: data[8].y,
                borderColor: "rgba(130, 130, 130, 0)",
                borderWidth: 1,
                label: {
                    backgroundColor: "rgba(130, 130, 130, 0.7)",
                    content: `Alt: ${Math.round(data[5].y - data[10].y)}`,
                    position: 'left',
                    xAdjust: 15,
                    enabled: true,
                    fontSize: 10
                }
            }, {
                id: "rLine",
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: data[18].x,
                borderColor: "rgba(130, 130, 130, 0)",
                borderWidth: 1,
                label: {
                    backgroundColor: "rgba(130, 130, 130, 0.7)",
                    content: `R = ${Math.round(((data[15].y / data[5].y) + Number.EPSILON) * 1000) / 1000}`,
                    // yAdjust: -60,
                    position: 'top',
                    enabled: true,
                    fontSize: 10
                }
            }, {
                type: 'box',
                drawTime: 'beforeDatasetsDraw',
                id: 'altLine',
                xScaleID: 'x-axis-0',
                yScaleID: 'y-axis-0',
                xMin: data[5].x,
                xMax: data[5].x,
                yMax: data[5].y,
                yMin:  data[10].y,
                borderColor: "lightgrey",
                borderWidth: 1,
            }]
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    min: data[15].y - 100,
                    max: data[5].y + 100
                },
                scaleLabel: {
                    display: true,
                    labelString: "Stress"
                },
                offset: true
            }],
            xAxes: [{
                ticks: {
                    min: 0,
                    max: 6.3
                },
                type: 'linear',
                display: false,
                // max: 1 * Math.PI
            }]
        },
        tooltips: {
            enabled: false
        }
    }
});

// console.log(waveformChart);

// update the chart
export function updateWaveform(alt, mean) {
    let newData = generateWaveform(alt, mean);
    // pass new data
    waveformChart.data.datasets[0].data = newData;
    
    //update all the annotations with new data
    
    // maximum line
    waveformChart.annotation.elements.maxLine.options.value = newData[5].y;
    waveformChart.annotation.elements.maxLine.options.label.content = `Max: ${Math.round(newData[5].y)}`;
    
    // mean line
    waveformChart.annotation.elements.meanLine.options.value = newData[10].y;
    waveformChart.annotation.elements.meanLine.options.label.content = `Mean: ${Math.round(newData[10].y)}`;
    
    // min line
    waveformChart.annotation.elements.minLine.options.value = newData[15].y;
    waveformChart.annotation.elements.minLine.options.label.content = `Min: ${Math.round(newData[15].y)}`;
    
    // alt label (because boxes cant have labels)
    waveformChart.annotation.elements.altLabel.options.label.content = `Alt: ${Math.round(newData[5].y - newData[10].y)}`;
    waveformChart.annotation.elements.altLabel.options.value = newData[8].y;
    
    // alt line (which is actually a box)
    waveformChart.annotation.elements.altLine.options.xMin = newData[5].x;
    waveformChart.annotation.elements.altLine.options.xMax = newData[5].x;
    waveformChart.annotation.elements.altLine.options.yMin = newData[5].y;
    waveformChart.annotation.elements.altLine.options.yMax = newData[10].y;
    
    // R ratio annotation
    waveformChart.annotation.elements.rLine.options.label.content = `R = ${Math.round(((newData[15].y / newData[5].y) + Number.EPSILON) * 1000) / 1000}`;

    // axis resize
    waveformChart.scales['y-axis-0'].options.ticks.max = Math.ceil(newData[5].y/100)*100;
    
    // do want to see zero if whole waveform is positive - the chart.js beginAtZero parameter is buggy
    if (newData[15].y < 0) {
        waveformChart.scales['y-axis-0'].options.ticks.min =  Math.floor(newData[15].y/100)*100;
    } else {
        waveformChart.scales['y-axis-0'].options.ticks.min = 0;
    }
    waveformChart.update();
}

// waveformPlot(300, 0);
// updateWaveform(40, 150)