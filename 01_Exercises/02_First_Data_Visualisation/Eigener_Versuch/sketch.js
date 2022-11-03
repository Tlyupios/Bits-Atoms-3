let table;

function preload() {

  table = loadTable('json/future_cities_data_exercise.csv', 'csv', 'header');

}

function setup() {
  createCanvas(800, 800);
  background(240);
  rectMode(CENTER);

  // get the Count of how many rows and columns there are inside the csv.file
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');

  // if the csv.file is correclty set up, you can get a column by calling the name of the column
  //print(table.getColumn('current_city'));

  // get an whole Row with Array-number
  //print(table.getRow([5]));
  //print(table.getColumn([1]));


  // get specific cell (through coordinates)
  //print(table.get(0, 0));


  // prints out the whole csv.file 
  /*for (let r = 0; r < table.getRowCount(); r++)
    for (let c = 0; c < table.getColumnCount(); c++) {
      print(table.getString(r, c));
    }*/

  print(table.get(0, 0));
}

function draw() {
  background(255);

  for (let i = 0; i < table.getRowCount(); i++) {
    strokeWeight(2);
    line(10, map(table.get(i,1), 0, 25, 800, 0), 790, map(table.get(i,2), 0, 25, 800, 0));
    strokeWeight(8);

  }

}