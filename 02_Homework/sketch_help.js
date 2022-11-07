console.log('Loading data...');

let table;

const canvasWidth = window.innerWidth;
const canvasHeight = 6000; // ⚠️ size limit if too long
const xPosAxis1 = 20; // px
const xPosAxis2 = 500; // px

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('Data/future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const barMargin = 10;
  const barHeight = 30;

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    const yPosition = convertDegreesToPosition(meanTemp);
    const xPosition = xPosAxis1;
    drawTemperature(xPosition, yPosition);
    //drawLabelToday(yPosition, city, meanTemp);
    drawLabel(yPosition, city, futureMeanTemp, xPosition);


    const futureYPosition = convertDegreesToPosition(futureMeanTemp);
    const futureXPosition = xPosAxis2;
    drawTemperature(futureXPosition, futureYPosition);
    //drawLabelFuture(futureYPosition, city, futureMeanTemp);
    drawLabel(futureYPosition, city, futureMeanTemp, futureXPosition);


    drawConnectingLine(yPosition, futureYPosition);
  }

  // drawAxes();
  // drawAxesLabels();
}

function convertDegreesToPosition(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const position = map(temp, 5, 20.366666, 600, 30);
  return position;
}

function drawTemperature(x, y) {
  fill('black');
  circle(x, y, 10);
}

function drawLabel(yPos, city, temp, xPos) {
  fill('black');
  const label = `${city}: ${temp}°C`;
  text(label, xPos + 10, yPos + 5);
}

function drawConnectingLine(y1, y2) {
  line(xPosAxis1, y1, xPosAxis2, y2);
  circle(20, 600, 10);
  line(20, 600, xPosAxis2, 600)
}
