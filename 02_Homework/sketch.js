let RectWidth = 50;
let DataRadius = 230;
let rotateData = 0;
let slider;
let OneStep;
let button;

let ColorCold;
let ColorHot;

function preload() {
    table = loadTable('Data/future_cities_data_truncated.csv', 'csv', 'header');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(245);
    noStroke();
    angleMode(DEGREES);
    NextCityButton()

    // count the columns
    print(table.getRowCount() + ' total rows in table');
    print(table.getColumnCount() + ' total columns in table');
    print('All cities:', table.getColumn('current_city'));


    ColorCold = color(0, 150, 255);
    ColorHot = color(255, 50, 30);

    OneStep = (360 / table.getRowCount());
}

function draw() {
    createCanvas(windowWidth, windowHeight);
    //NextCityButton()

    background(0);

    fill(ColorCold);
    rect(200, 22, 10, 10, 2);
    let today = 'Average temperature 2020';
    text(today, 220, 32);

    fill(ColorHot);
    rect(380, 22, 10, 10, 2);
    let future = 'Average temperature 2050';
    text(future, 400, 32);

    push();
    translate(width / 2, height / 1);
    rotate(rotateData);
    Data();

    fill('black');
    circle(0, 0, DataRadius * 2 + 10);
    noFill();
    strokeWeight(4);
    stroke(255);
    for (let i = 0; i <= 2; i = i + 0.5)
        circle(0, 0, DataRadius * i + 10);
    pop();
}

function Click() {

    rotateData = rotateData - OneStep;

}

function convertDegreesToPosition(temp) {
    const position = map(temp, 5, 20.366666, 10, 280);
    return position;
}

function NextCityButton() {
    button = createButton('Next City');
    button.position(30, 20);
    button.mouseClicked(Click);
    button.style('font-size', '25px');
    button.style('padding', '15px');
    button.style('background-color', 'white');
    button.style('color', 'black');
    button.style('border', 'none');
    button.style('border-radius', '10px');
    button.style('cursor', 'pointer');
}

function Data() {
    rotate(8);
    for (let i = 0; i < table.getRowCount(); i++) {
        const city = table.get(i, 'current_city');
        const meanTemp = round(table.get(i, 'Annual_Mean_Temperature'), 1);
        const futureMeanTemp = round(table.get(i, 'future_Annual_Mean_Temperature'), 1);
        const rotationData = i * (OneStep);

        push();
        rotate(rotationData);
        const futureYPosition = convertDegreesToPosition(futureMeanTemp);
        const futureXPosition = DataRadius;
        fill(ColorHot);
        rect(futureXPosition, 2, futureYPosition, RectWidth, 0, 10, 10, 0);

        const YPosition = convertDegreesToPosition(meanTemp);
        const XPosition = DataRadius;
        fill(ColorCold);
        rect(XPosition, -RectWidth - 2, YPosition, RectWidth, 0, 10, 10, 0);
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