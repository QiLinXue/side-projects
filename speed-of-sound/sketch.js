var mic;
let beep;

function setup(){
  beep = loadSound('beep.m4a');

  createCanvas(window.innerWidth, window.innerHeight);
  mic = new p5.AudioIn()
  mic.start();
}

var loud = false;

function draw(){
  background(0);
  micLevel = mic.getLevel();

  if(micLevel > 0.05 && !loud){
      background(255);
      time2 = window.performance.timing.navigationStart + window.performance.now();
      console.log(time2);
      loud = true;
  }
  if(micLevel < 0.05){
      loud = false
  }

  fill(255);
  text(" " + time1 + " " + time2,50,50);
}

var time1 = 0;
var time2 = 0;

function mousePressed(){
    beep.play();
    time1 = window.performance.timing.navigationStart + window.performance.now();
    background(255);
}