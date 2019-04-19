var mic;
let beep;
var beeps_init = [];
var beeps_final = [];
var sensitivity = 0.01;
var mode = "init";
var s = 0;
var f = 0;
var avg1, avg2 = 0;
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

  if(mode != "complete"){
      if(micLevel > sensitivity && !loud){
            time2 = window.performance.now();
          if(time2-time1 < 200){
            background(255);
            console.log(time1,time2,time2-time1);
            if(mode == "init"){
                beeps_init.push(time2-time1);
            }
            if(mode == "final"){
                beeps_final.push(time2-time1);
            }
          }
          loud = true;
      }
  }
  if(micLevel < sensitivity){
      loud = false
  }

  fill(255);
  text(f,50,50);
}

var time1 = 0;
var time2 = 0;

function mousePressed(){
    // beep.play();
    time1 = window.performance.now();
}

function keyPressed(){
    if(mode == "init"){
        mode = "final";
    }
    else if(mode == "final"){
        mode = "complete";
        avg1 = 0;
        for(var i=0;i<beeps_init.length;i++){
          avg1+=beeps_init[i];
        }
        avg1 = avg1/beeps_init.length;
      
        avg2 = 0;
        for(var i=0;i<beeps_final.length;i++){
          avg2+=beeps_final[i];
        }
        avg2 = avg2/beeps_final.length;
      
        f = (avg2-avg1)/1000
    }
}