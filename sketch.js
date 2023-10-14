let baseSize = 10; 

function preload(){
  dataset = loadJSON('text1.json'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  // for(let i = 0; i < dataset.)
  console.log(dataset[0][0]); 
  console.log(dataset[0][1]); 
}
