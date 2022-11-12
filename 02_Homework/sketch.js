let RectWidth = 50;
let DataRadius = 300;
let slider;


function preload() {
    table = loadTable('Data/future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(245);
    noStroke();

    angleMode(DEGREES);

    // count the columns
    print(table.getRowCount() + ' total rows in table');
    print(table.getColumnCount() + ' total columns in table');
    print('All cities:', table.getColumn('current_city'));


    slider = createSlider(0, 360, 100);
    slider.position(10, 10);
}

function draw() {

    let val = slider.value();

    background(255);
    push();
    translate(width / 2, height / 1);
    rotate(val);
    Data();
    fill('grey');
    circle(0, 0, DataRadius*2+10);
    pop();

    push();
    textAlign(CENTER);
    translate(200,200);
    rotate(90);
    fill('black');
    textSize(100)
    text('black', 0, 0,);
    pop();
}

function convertDegreesToPosition(temp) {
    // we need to map the temperatures to a new scale
    // 0° = 600px, 25° = 300px, 20° = 30px
    // https://p5js.org/reference/#/p5/map
    const position = map(temp, 5, 20.366666, 10, 300);
    return position;
}

function Data() {
    for (let i = 0; i < table.getRowCount(); i++) {
        const city = table.get(i, 'current_city');
        const meanTemp = round(table.get(i, 'Annual_Mean_Temperature'), 1);
        const futureMeanTemp = round(table.get(i, 'future_Annual_Mean_Temperature'), 1);

        push();
        const futureYPosition = convertDegreesToPosition(futureMeanTemp);
        const futureXPosition = DataRadius;
        fill('red');
        rotate(i * (360/table.getRowCount()));
        rect(futureXPosition, -RectWidth, futureYPosition, RectWidth, 0, 10, 10, 0);

        const YPosition = convertDegreesToPosition(meanTemp);
        const XPosition = DataRadius;
        fill('blue');
        rect(XPosition, 0, YPosition, RectWidth, 0, 10, 10, 0);
        pop();

        const label = `${city}`;
        fill('black');
        push();
        rotate(i * (360/table.getRowCount()));
        translate(600,0);
        rotate(90);
        text(label, 0, 0);
        pop();

        const meanTemplabel = `${meanTemp}°C`;
        fill('blue');
        text(meanTemplabel, 40 + XPosition, 460);

        const futureTemplabel = `${futureMeanTemp}°C`;
        fill('red');
        text(futureTemplabel, 40 + XPosition, 480);
    }
}