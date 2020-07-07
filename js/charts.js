// Chart canvas
const waveform = document.getElementById('waveform').getContext('2d');
const rmPlot = document.getElementById('r-mPlot').getContext('2d');

export const generateWaveform = (alt, mean) => {
    const PI = Math.PI;
    let arr_x = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2].map(x => x * PI);
    let arr_y = arr_x.map(x => Math.sin(x));
    // arr_y.forEach(x => x * alt + mean);
    let data = [];

    for (let i = 0; i < arr_y.length; i++) {
        let point = {
            x: arr_x[i],
            y: alt * arr_y[i] + mean
        };
        data.push(point);
    }
    return data;

};

let data = generateWaveform(450, 50);


Chart.defaults.global.defaultFontColor = 'white';
Chart.defaults.global.defaultFontSize = 12;

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
                bottom: 25
            }
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
                    content: `Maximum: ${Math.round(data[5].y)}`,
                    xAdjust: -30,
                    enabled: true
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
                    xAdjust: 30,
                    enabled: true
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
                    content: `Minimum: ${Math.round(data[15].y)}`,
                    xAdjust: -10,
                    enabled: true
                },
            }, {
                id: "altLine",
                type: "line",
                mode: "vertical",
                scaleID: "x-axis-0",
                value: data[5].x,
                borderColor: "rgba(130, 130, 130, 0)",
                borderWidth: 1,
                label: {
                    backgroundColor: "rgba(130, 130, 130, 0.7)",
                    content: `Alternating: ${Math.round(data[5].y - data[10].y)}`,
                    yAdjust: -40,
                    enabled: true
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
                    content: `R Ratio = Min / Max = ${Math.round(((data[15].y / data[5].y) + Number.EPSILON) * 1000) / 1000}`,
                    yAdjust: -60,
                    enabled: true
                }
            }]
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    // min: data[15].y - 100,
                    // max: data[5].y + 100
                },
                scaleLabel: {
                    display: true,
                    labelString: "Stress"
                },
                offset: false
            }],
            xAxes: [{
                type: 'linear',
                display: false,
                max: 2 * Math.PI
            }]
        },
        tooltips: {
            enabled: false
        }
    }
});

console.log(waveformChart);

export function updateWaveform(alt, mean) {
    let newData = generateWaveform(alt, mean);
    waveformChart.data.datasets[0].data = newData;
    waveformChart.annotation.elements.maxLine.options.value = newData[5].y;
    waveformChart.annotation.elements.maxLine.options.label.content = `Maximum: ${Math.round(newData[5].y)}`;
    waveformChart.annotation.elements.meanLine.options.value = newData[10].y;
    waveformChart.annotation.elements.meanLine.options.label.content = `Mean: ${Math.round(newData[10].y)}`;
    waveformChart.annotation.elements.minLine.options.value = newData[15].y;
    waveformChart.annotation.elements.minLine.options.label.content = `Minimum: ${Math.round(newData[15].y)}`;
    waveformChart.annotation.elements.altLine.options.label.content = `Alternating: ${Math.round(newData[5].y - newData[10].y)}`;
    waveformChart.annotation.elements.rLine.options.label.content = `R Ratio = Min / Max = ${Math.round(((newData[15].y / newData[5].y) + Number.EPSILON) * 1000) / 1000}`;

    // waveformChart.scales['y-axis-0'].options.ticks.max = newData[5].y + ((newData[5].y - newData[15].y) * 0.2 / 2)
    // waveformChart.scales['y-axis-0'].options.ticks.min = newData[15].y - ((newData[5].y - newData[15].y) * 0.2 / 2)

    waveformChart.update();
}

// waveformPlot(300, 0);
// updateWaveform(40, 150)