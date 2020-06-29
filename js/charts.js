// Chart canvas
const waveform = document.getElementById('waveform').getContext('2d');
const rmPlot = document.getElementById('r-mPlot').getContext('2d');

export function generateWaveform(alt, mean) {
    const PI = Math.PI
    let arr_x = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2].map(x => x * PI);
    let arr_y = arr_x.map(x => Math.sin(x));
    // arr_y.forEach(x => x * alt + mean);
    console.log(arr_y)
    let data = [];

    for (let i = 0; i < arr_y.length; i++) {
        let point = {
            x: arr_x[i],
            y: alt * arr_y[i] + mean
        };
        console.log(point);
        data.push(point);
    }
    console.log(data)
    return data;

}

function waveformPlot(alt, mean) {
    return new Chart(waveform, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: generateWaveform(alt, mean)
            }, {
                data: [{
                    x: 0,
                    y: mean
                }, {
                    x: 0,
                    y: mean
                }]

            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    display: false
                }]
            },
            legend: {
                display: false
            },
            elements: {
                line: {
                    fill: false,
                    borderColor: 'rgba(255, 255, 255, 0.8)'
                },
                point: {
                    radius: 0
                }
            }
        },
    });
}

waveformPlot(200, 400)