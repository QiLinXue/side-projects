var x = 50;
var v = 0;
var a = 0;
var f = 0;
var m = 1;
var l = 1;
function preload(){
    input = createInput(0.1);
    input.position(window.innerWidth/2-100,3*window.innerHeight/16);
    input.size(100);
    button = createButton('Start!');
    button.position(window.innerWidth/2+20, 3*window.innerHeight/16);
    button.mousePressed(reset);
    button.size(50);
}
  
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);
    fill(255);
}


function draw() {
    background(0);
    textSize(20);
    textAlign(CENTER);
    text("Enter applied force (<= 5): ",window.innerWidth/2,2.5*window.innerHeight/16);

    var inc = 20
    text("Current Acceleration: " + Number((a).toFixed(6)) + " m/s^2",window.innerWidth/2,10*inc);
    text("Current Speed: " + Number((v).toFixed(3)) + " m/s",window.innerWidth/2,12*inc);
    text("Current Position: " + Number((x*10).toFixed(0)) + " m",window.innerWidth/2,14*inc);
    text("Speed of Light: 10 m/s",window.innerWidth/2,16*inc);

    fill(255);
    rect(x,2*window.innerHeight/3,50,50);
    step();
}

function reset(){
    f = parseFloat(input.value());
    x = 50;
    v = 0;
}

function step(){
    l = 1/Math.sqrt(1-(v*v)/(100));
    a = f/(l*l*l*m);

    v += a
    x += v/10
}