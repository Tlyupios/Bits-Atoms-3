
function preload() {
    table = loadTable('Data/future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(245);
    noStroke();

    // count the columns
    print(table.getRowCount() + ' total rows in table');
    print(table.getColumnCount() + ' total columns in table');
    print('All cities:', table.getColumn('current_city'));



    for (let i = 0; i < table.getRowCount(); i++) {
        const city = table.get(i, 'current_city');
        const meanTemp = round(table.get(i, 'Annual_Mean_Temperature'), 1);
        const futureMeanTemp = round(table.get(i, 'future_Annual_Mean_Temperature'),1);

        const futureYPosition = convertDegreesToPosition(futureMeanTemp);
        const futureXPosition = 80+i * 100;
        fill('red');
        rect(futureXPosition, 410, 40, futureYPosition, 0, 0, 10, 10);

        const YPosition = convertDegreesToPosition(meanTemp);
        const XPosition = 40+i * 100;
        fill('blue');
        rect(XPosition, 410, 40, YPosition, 0, 0, 10, 10);
        //cnv.mouseOver(temperaturelabel);

        const label = `${city}`;
        fill('black');
        textAlign(CENTER);
        text(label, 40+XPosition, 440);

        const meanTemplabel = `${meanTemp}°C`;
        fill('blue');
        text(meanTemplabel, 40+XPosition, 460);
        
        const futureTemplabel = `${futureMeanTemp}°C`;
        fill('red');
        text(futureTemplabel, 40+XPosition, 480);

        
    }
}

function convertDegreesToPosition(temp) {
    // we need to map the temperatures to a new scale
    // 0° = 600px, 25° = 300px, 20° = 30px
    // https://p5js.org/reference/#/p5/map
    const position = map(temp, 5, 20.366666, -30, -400);
    return position;
}