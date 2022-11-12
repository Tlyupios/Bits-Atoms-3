let RectWidth = 50;
let DataRadius = 300;
let rotateAnimation = 0;
let slider;
let OneStep;
let button;


function preload() {
    table = loadTable('Data/future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {

    OneStep = (360 / table.getRowCount());

    createCanvas(windowWidth, windowHeight);
    background(245);
    noStroke();

    angleMode(DEGREES);

    // count the columns
    print(table.getRowCount() + ' total rows in table');
    print(table.getColumnCount() + ' total columns in table');
    print('All cities:', table.getColumn('current_city'));

   /* slider = createSlider(0, 360, 360, OneStep);
    slider.position (10,10);
    slider.style('width', '200px');
    slider.style('margin', '0 auto');*/

    button = createButton('click me');
    button.position(40, 40);
    button.mouseClicked(Click);

}

function draw() {

    background(255);
    //let val = slider.value();

    push();
    translate(width / 2, height / 1);
    rotate(rotateAnimation);
    //rotate(val);
    Data();
    strokeWeight(8);
    stroke(0);
    circle(0, 0, DataRadius * 2 + 10);
    pop();

}

function Click() {
    if (rotateAnimation <= 360-OneStep){
    rotateAnimation += 360 / table.getRowCount();
    }else if (rotateAnimation >= 360-OneStep) {
        rotateAnimation = 0;
    }
}

function convertDegreesToPosition(temp) {
    // we need to map the temperatures to a new scale
    // 0° = 600px, 25° = 300px, 20° = 30px
    // https://p5js.org/reference/#/p5/map
    const position = map(temp, 5, 20.366666, 10, 300);
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
        rotate(rotationData);
        const futureYPosition = convertDegreesToPosition(futureMeanTemp);
        const futureXPosition = DataRadius;
        fill('red');
        rect(futureXPosition, 0, futureYPosition, RectWidth, 0, 10, 10, 0);

        const YPosition = convertDegreesToPosition(meanTemp);
        const XPosition = DataRadius;
        fill('blue');
        rect(XPosition, -RectWidth, YPosition, RectWidth, 0, 10, 10, 0);
        pop();

        //////////////////////////////////////////////////////////////


        //TEMPERATURE TEXT;

        textAlign(CENTER);

        push();
        rotate(rotationData);
        translate(YPosition + 10, -RectWidth / 2);
        const meanTemplabel = `${meanTemp}°C`;
        const futureTemplabel = `${futureMeanTemp}°C`;
        fill('blue');
        rotate(90);
        text(meanTemplabel, 0, -DataRadius);
        pop();

        push();
        rotate(rotationData);
        translate(futureYPosition + 10, -RectWidth / 2);
        fill('red');
        rotate(90);
        text(futureTemplabel, RectWidth, -DataRadius);
        pop();

        push();
        rotate(rotationData);
        translate(720, 0);
        const label = `${city}`;
        fill('black');
        rotate(90);
        textSize(80);
        text(label, 0, 100);
        pop();

    }
}