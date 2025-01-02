// constants
const PI = 3.141592653589793;
const DOT_SIZE = 6;

// canvas
let cv;

// Drawing variables 
// r1 > r2 > r3 (big circle > spiro circle > spiro loop size)
let r1, r2, r3;
let x1 = 500, y1 = 370;
let theta1 = 0, dtheta = -1;

// animation state variables
let beginDraw = false;
let px, py;

// display nice things variables
let offset = 40;
let sliderWidth = '150px'

// called once on startup
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  cv = createGraphics(windowWidth,windowHeight);

  r1Slider = createSlider(150, 300, 225, 10);
  r1Slider.position(20, offset*1);
  r1Slider.style('width', sliderWidth);
  r2Slider = createSlider(10, 100, 30, 1);
  r2Slider.position(20, offset*2);
  r2Slider.style('width', sliderWidth);
  r3Slider = createSlider(0, 100, 85, 1);
  r3Slider.position(20, offset*3);
  r3Slider.style('width', sliderWidth);

  resetButton = createButton("Clear");
  resetButton.position(20, offset*4);
  resetButton.mousePressed(clearCv);
  startButton = createButton("Start");
  startButton.position(20, offset*5);
  startButton.mousePressed(toggleDraw);

  angleMode(DEGREES);
}

// executed 60 times per second until program is stopped or noLoop function is called
function draw() {
  background(255);
  translate(50 + 150, 0);

  r1 = r1Slider.value();
  r2 = r2Slider.value()/100 * r1;
  r3 = r3Slider.value()/100 * r2;

  // circle for path
  fill("white");
  circle(x1,y1,2*r1);

  // circle on perimeter
  x2 = x1 + (r1+r2) * cos(theta1 % 360);
  y2 = y1 + (r1+r2) * sin(theta1 % 360);
  circle(x2, y2, 2*r2);

  // // point marker
  fill(255, 127, 80);
  // // distance around large circle -> revolutions of small circle
  // // need rotation from point of contact! -> this is tricky for other shapes
  // // theta2 = (revs*360 + theta1)%360;
  theta2 = (r1/r2*theta1 + theta1)%360;
  x3 = x2 + r3 * cos(theta2);
  y3 = y2 + r3 * sin(theta2);
  circle(x3, y3, 2*DOT_SIZE);
  // trail.push({x: x2, y: y2});
  
  // fill(255,0,0)
  cv.line(px, py, x3, y3);
  px = x3, py = y3;

  image(cv, 0, 0);


  if (beginDraw) {
    theta1 = (theta1 + dtheta);
  }
}

function clearCv() {
  cv.reset();
}

function toggleDraw() {
  beginDraw = !beginDraw;
}