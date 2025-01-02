// constants
const PI = 3.141592653589793;

// Variables for drawing
let x, y;
let r1;
let r2;
let r3;
let theta1, dtheta;

// set defaults
x = 200, y = 200;
r1 = 150;
r2 = 23;
r3 = 6;
theta1 = 0, dtheta = -1;


// called once on startup
function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
}

// executed 60 times per second until program is stopped or noLoop function is called
function draw() {
  background(255);

  // circle for path
  fill("white");
  circle(x,y,2*r1);

  // circle on perimeter
  x1 = x + (r1+r2) * cos(theta1 % 360);
  y1 = y + (r1+r2) * sin(theta1 % 360);
  circle(x1, y1, 2*r2);

  // point marker
  fill(255, 127, 80);
  // distance around large circle -> revolutions of small circle
  // revs = (r1/r2) * (theta1/360); // going to write out the whole thing here -> (2 pi r1) * angle/360 / (2 pi r2)
  // need rotation from point of contact!
  // theta2 = (revs*360 + theta1)%360;
  theta2 = (r1/r2*theta1 + theta1)%360;
  x2 = x1 + r2 * cos(theta2);
  y2 = y1 + r2 * sin(theta2);
  circle(x2, y2, 2*r3);


  if (mouseIsPressed) {
    theta1 = (theta1 + dtheta); // this might overflow some point
  }
}