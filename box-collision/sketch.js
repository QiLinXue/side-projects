var collisionCount = 0;

function preload(){
  input = createInput("100");
  input.position(window.innerWidth/2-100,window.innerHeight/6);
  input.size(100);
  button = createButton('Start!');
  button.position(window.innerWidth/2+20, window.innerHeight/6);
  button.mousePressed(reset);
  button.size(50);

  big = new Box(window.innerWidth/2,1000000,100,0);
  small = new Box(window.innerWidth/4,1,50,0);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  rectMode(CENTER);
  fill(255);
}

function reset(){
  var mass = parseFloat(input.value());
  big.x = window.innerWidth/2;
  big.v = -2;
  big.mass = mass;
  small.x = window.innerWidth/4;
  small.v = 0;
  collisionCount = 0;

  clacks = [];
}

function draw() {
  background(0);
  textSize(20);
  textAlign(CENTER);
  text("Enter the mass for the larger mass. Try 1, 100, 10000, 1000000... ",window.innerWidth/2,window.innerHeight/8);
  textSize(50);
  text("Collisions: "+collisionCount,window.innerWidth/2,window.innerHeight/4);
  if(big.x-big.radius/2 > small.radius){
    big.display(big.x);
  }
  else{
    big.display(small.radius+big.radius/2+5)
  }
  small.display(small.x);

  step();
}

function collide(){
  var tempV = big.v;
  big.collide(small.mass,small.v);
  small.collide(big.mass,tempV);
}

function step(){
  if(small.x-small.radius/2 <= 0){
    small.wallBump();
    collisionCount ++;
  }

  if(big.x-big.radius/2 <= small.x+small.radius/2){
    collide();
    collisionCount ++;
  }
  big.step();
  small.step();
}