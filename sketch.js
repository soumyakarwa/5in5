let baseSize = 10;
let xloc = 11;
let yloc = 10; 
let count = 0; 
let palette =["#D94A56", "#544673", "#75B2BF", "#D97941", "#6CA66A"]; 

function preload(){
  dataset = loadJSON('text1.json'); 
  fontlibre = loadFont('./fonts/LibreBaskerville-Regular.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); 
}

function draw() {
  background(255);
  textFont(fontlibre); 
  for(word in dataset){
    let curr = dataset[word]; 
    if(curr < 50) {
      fill(palette[0]); 
  } else if(curr >= 50 && curr < 100) {
      fill(palette[1]);
  } else if(curr >= 100 && curr < 150) {
      fill(palette[2]);
  } else if(curr >= 150 && curr < 200) {
      fill(palette[3]);
  } else {
      fill(palette[4]);
  }
    text(word, xloc, yloc)
    xloc += textWidth(word) + 10; 
    if(xloc > width){
      yloc += 15; 
      xloc = 0; 
    }
  }
}
