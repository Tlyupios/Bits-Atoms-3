let RectWidth = 50;
let DataRadius = 250;
let rotateAnimation = 0;
let slider;
let OneStep;
let button;

let ColorCold;
let ColorHot;

function preload() {
    table = loadTable('Data/future_cities_data_truncated.csv', 'csv', 'header');
    imgCold = loadImage('example.png');
    imgHot = loadImage('examplehot.png');
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

    button = createButton('Next City');
    button.position(20, 20);
    button.mouseClicked(Click);
    button.style('font-size', '25px')
    button.style('padding', '15px')
    button.style('background-color', 'black')
    button.style('color', 'white')
    button.style('border', 'none')
    button.style('border-radius', '10px')

    OneStep = (360 / table.getRowCount());

    ColorCold = color(0,150,255);
    ColorHot = color(255, 70, 255);
}

function draw() {

    background(0);

    fill(ColorCold);
    rect(20, 140, 10, 10, 2);
    let today = 'Temperature from 2020';
    text(today, 35, 150);

    fill(ColorHot);
    rect(20, 160, 10, 10, 2);
    let future = 'Temperature from 2050';
    text(future, 35, 170);

    push();
    translate(width / 2, height / 1);
    rotate(rotateAnimation);
    //rotate(val);
    Data();

    fill('black');
    circle(0, 0, DataRadius * 2 + 10);
    noFill();
    strokeWeight(4);
    stroke(255);
    for (let i =0; i <= 2; i = i + 0.4)
    circle(0, 0, DataRadius * i + 10);
    pop();

}

function Click() {

    //rotateAnimation = rotateAnimation + OneStep;

    if (rotateAnimation <= 360 - OneStep) {
        rotateAnimation = rotateAnimation - OneStep;
    } else if (rotateAnimation >= 360 - OneStep) {
        rotateAnimation = 0;
    }

}

function convertDegreesToPosition(temp) {
    // we need to map the temperatures to a new scale
    // 0° = 600px, 25° = 300px, 20° = 30px
    // https://p5js.org/reference/#/p5/map
    const position = map(temp, 5, 20.366666, 10, 250);
    return position;
}

function Data() {
    rotate(8);
    for (let i = 0; i < table.getRowCount(); i++) {
        const city = table.get(i, 'current_city');
        const meanTemp = round(table.get(i, 'Annual_Mean_Temperature'), 1);
        const futureMeanTemp = round(table.get(i, 'future_Annual_Mean_Temperature'), 1);
        const rotationData = i * (OneStep);

        push();
        noFill();
        strokeWeight(4);
        rotate(rotationData);
        const futureYPosition = convertDegreesToPosition(futureMeanTemp);
        const futureXPosition = DataRadius;
        //fill(255, 70, 0);
        stroke(ColorHot);
        image(imgHot, futureXPosition, 0, futureYPosition, RectWidth)
        rect(futureXPosition, 2, futureYPosition, RectWidth, 0, 0, 0, 0);

        const YPosition = convertDegreesToPosition(meanTemp);
        const XPosition = DataRadius;
        stroke(ColorCold);
        image(imgCold, XPosition, -RectWidth, YPosition, RectWidth)
        rect(XPosition, -RectWidth-2, YPosition, RectWidth, 0, 0, 0, 0);
        pop();

        //////////////////////////////////////////////////////////////


        //TEMPERATURE TEXT;

        textAlign(CENTER);

        push();
        rotate(rotationData);
        translate(YPosition + 10, -RectWidth / 2);
        const meanTemplabel = `${meanTemp}°C`;
        const futureTemplabel = `${futureMeanTemp}°C`;
        fill(ColorCold);
        rotate(90);
        text(meanTemplabel, 0, -DataRadius);
        pop();

        push();
        rotate(rotationData);
        translate(futureYPosition + 10, -RectWidth / 2);
        fill(ColorHot);
        rotate(90);
        text(futureTemplabel, RectWidth, -DataRadius);
        pop();

        push();
        rotate(rotationData);
        translate(650, 0);
        const label = `${city}`;
        fill('white');
        rotate(90);
        textSize(80);
        text(label, 0, 100);
        pop();

    }
}