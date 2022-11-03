function preload() {
  earthTexture = loadImage('images/earth-texture-night.jpg');
  cloudTexture = loadImage('images/cloud-texture.png');
}

let slider;

const cloudOffset = 12; // distance from globe to clouds
let radius = 300;
let rotation = 1;

const zoomInButton = document.querySelector('[data-js="zoom-in"]');
const zoomOutButton = document.querySelector('[data-js="zoom-out"]');
console.log('zoomInButton: ', zoomInButton);

zoomInButton.addEventListener('click', zoomIn);
zoomOutButton.addEventListener('click', zoomOut);

function drawEarth(earthRadius) {
  // earth rotation
  //rotateY(rotation);
  //rotation += 0.00003 * mouseX;

  // globe
  push();
  texture(earthTexture);
  sphere(earthRadius, 50, 50);
  pop();

  // clouds
  push();
  texture(cloudTexture);
  sphere(earthRadius + cloudOffset);
  pop();
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  drawEarth(radius);

  slider = createSlider(0, 360, 0);
  slider.position(10, 30);
  slider.style('width', '80px');

}

function draw() {
  background(0);
  noStroke(); // hides the spheres frame/skeleton

  angleMode(DEGREES);
  let val = slider.value();
  rotateY(val);
  drawEarth(radius);
}

function zoomIn() {
  radius = radius + 30;
}

function zoomOut() {
  radius = radius - 30;
}
