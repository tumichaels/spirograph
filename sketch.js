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
let offset = 60;
let sliderWidth = '150px'

// called once on startup
function setup() {
  createCanvas(windowWidth, windowHeight);

  cv = createGraphics(1000,1000);

  r1Slider = createSlider(150, 300, 225, 10);
  r1Slider.position(20, offset*1);
  r1Slider.style('width', sliderWidth);
  r2Slider = createSlider(10, 100, 30, 1);
  r2Slider.position(20, offset*2);
  r2Slider.style('width', sliderWidth);
  r3Slider = createSlider(0, 100, 85, 1);
  r3Slider.position(20, offset*3);
  r3Slider.style('width', sliderWidth);
  speedSlider = createSlider(0, 20, 5, 1);
  speedSlider.position(20, offset*4);
  speedSlider.style('width', sliderWidth);

  startButton = createButton("Start");
  startButton.position(20, offset*5);
  resetButton = createButton("Clear");
  resetButton.position(80, offset*5);
  resetButton.mousePressed(clearCv);
  startButton.mousePressed(toggleDraw);
  inOutCheckbox = createCheckbox("Internal", false);
  inOutCheckbox.position(20, offset*6);

  angleMode(DEGREES);
}

// executed 60 times per second until program is stopped or noLoop function is called
function draw() {
  background(255);

  inOut = inOutCheckbox.checked() ? -1 : 1;
  // console.log(inOut);

  r1 = r1Slider.value();
  r2 = inOut * r2Slider.value()/100 * r1;
  r3 = r3Slider.value()/100 * r2;
  dtheta = speedSlider.value()/5;

  // show slider values
  textSize(18);
  textStyle(NORMAL);
  textAlign(LEFT);
  fill(0);
  // should show ratios
  r1_text    = text("r1 = " + r1, 25, offset - 5);
  r2_text    = text("r2 = " + r2, 25, offset*2 - 5);
  r3_text    = text("r3 = " + r3, 25, offset*3 - 5);
  speed_text = text("speed = " + dtheta*5, 25, offset*4 - 5);

  translate(150, 0);
  // circle for path
  fill("white");
  circle(x1,y1,2*r1);

  // circle on perimeter
  x2 = x1 + (r1+r2) * cos(theta1 % 360);
  y2 = y1 + (r1+r2) * sin(theta1 % 360);
  circle(x2, y2, 2*r2);

  // display path
  image(cv, 0, 0);

  // // point marker + update path
  fill(255, 127, 80);
  // // distance around large circle -> revolutions of small circle
  // // need rotation from point of contact! -> this is tricky for other shapes
  theta2 = (r1/r2*theta1 + theta1)%360;
  x3 = x2 + r3 * cos(theta2);
  y3 = y2 + r3 * sin(theta2);
  circle(x3, y3, 2*DOT_SIZE);
  
  cv.line(px, py, x3, y3);
  px = x3, py = y3;


  if (beginDraw) {
    theta1 = (theta1 + dtheta);
  }
}

function clearCv() {
  cv.clear();
}

function toggleDraw() {
  if (beginDraw) {
    beginDraw = false;
    startButton.html("Start");
  }
  else {
    beginDraw = true;
    startButton.html("Stop");
  }
}