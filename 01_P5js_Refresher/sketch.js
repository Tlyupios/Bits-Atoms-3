const data = [13, 30, 20];


function setup() {
    createCanvas(500, 500);
    //rectMode(CENTER);
    angleMode(DEGREES);
    noStroke();



  }
  
  function draw() {
    background(240);

    fill(30,200,200)
    for (i = 0; i < data.length; i++){
      rect(100+ i*50, 100, 40, data[i] * mouseY);
    }



  }