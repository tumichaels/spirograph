// constants
const PI = 3.141592653589793;
const DOT_SIZE = 6;

// Variables for drawing
let x, y;
let r1;
let r2;
let r3;
let theta1, dtheta;
let trail = []; // can just track px, py instead of whole trail
let cv;

// set defaults
x = 300, y = 300;
r1 = 150;
r2 = 70;
r3 = 55;
theta1 = 0, dtheta = -1;


// called once on startup
function setup() {
  cv = createCanvas(1000, 1000);
  angleMode(DEGREES);
  let resetButton = createButton("Clear");
  resetButton.position(0, 100);
  resetButton.mousePressed(clearTrail);
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
  x2 = x1 + r3 * cos(theta2);
  y2 = y1 + r3 * sin(theta2);
  circle(x2, y2, 2*DOT_SIZE);
  trail.push({x: x2, y: y2});
  
  fill(255,0,0)
  for (let i = 1; i < trail.length; i++) {
    const current = trail[i];
    const previous = trail[i - 1];
    cv.line(previous.x, previous.y, current.x, current.y);
  }


  if (mouseIsPressed) {
    theta1 = (theta1 + dtheta); // this might overflow some point
  }
}

function clearTrail() {
  trail = [];
}