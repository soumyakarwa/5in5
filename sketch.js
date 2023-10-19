let baseSize = 10;
let palette =["#D94A56", "#544673", "#75B2BF", "#D97941", "#6CA66A"]; 
let posList = []; 
let posTextList = ["Adjective", "Adposition", "Adverb", "Auxillary", "Coordinating Conjunction", "Determiner", "Interjection",   "Noun","Numeral", "Other", "Pronoun", "Proper Noun", "Subordinating Conjunction", "Verb"]; 
let wordList = {}; 

function preload(){
  dataset = loadJSON('text1.json'); 
  fontlibre = loadFont('./fonts/LibreBaskerville-Regular.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  dataSetUp();
  typeSetUp();  
  // noLoop();
}

function draw() {
  background(0);
  fill(255);
  textSize(14); 
  let xloc = (width - textArrayWidth(posTextList))/2; 
  let yloc = xloc;  
  partOfSpeechDrawHelper(xloc, yloc); 
  rect(xloc, yloc + xloc/2, textArrayWidth(posTextList), height-yloc-150); 
  // let s = 0; 
  // for(word in dataset){
  //   s++; 
  // }
  // let rows = int(s/(textSize()+20))
  // console.log(s, rows); 
  // for(word in dataset){
  //   let curr = dataset[word].count; 
  //   if(curr < 20) {
  //     fill(palette[0]); 
  //   } else if(curr >= 20 && curr < 60) {
  //     fill(palette[1]);
  //   } else if(curr >= 60 && curr < 100) {
  //     fill(palette[2]);
  //   } else if(curr >= 140 && curr < 140) {
  //     fill(palette[3]);
  //   } else {
  //     fill(palette[4]);
  //   }
  //   text(word, xloc, yloc)
  //   xloc += textWidth(word) + 10; 
  //   if(xloc > width -2){
  //     yloc += 15; 
  //     xloc = 0; 
  //   }
  //   if(yloc > height - 100){
  //     break; 
  //   }
  // }
  textSize(10); 
  displayWordList("ADJ", xloc, yloc + xloc/1.5); 


}

/// HELPER FUNCTIONS ///

function dataSetUp(){
  for(word in dataset){
    if (posList.includes(dataset[word].pos) || dataset[word].pos === "X"){
      continue;
    }
    else{
      posList.push(dataset[word].pos); 
    }
  }

  for(let i = 0; i < posList.length; i++){
    wordList[posList[i]] = [];
  }
  
  for(word in dataset){
    if(word.includes("http") || word.includes("1878") || dataset[word].pos === "X" || !Object.keys(wordList).includes(dataset[word].pos)){
        continue; 
    }
    wordList[dataset[word].pos].push(word); 
  }
  console.log(wordList); 
}

function typeSetUp(){
  textFont(fontlibre); 
  textSize(14); 
}

function textArrayWidth(arr){
  let totalWidth = 0; 
  for(let i = 0; i < arr.length; i++){
    if (i !== arr.length - 1) { // if it's not the last word
      totalWidth += textWidth(posTextList[i]) + 15; 
    } else {
      totalWidth += textWidth(posTextList[i]);
    }
  }
  return totalWidth
}

function partOfSpeechDrawHelper(startingX, startingY){
  for(let i = 0; i < posTextList.length; i++){
    text(posTextList[i], startingX, startingY); 
    startingX += textWidth(posTextList[i]) + 15; 
  }
}

function displayWordList(currPos, xloc, yloc){
  let textx = xloc; 
  let texty = yloc; 
  for(let i = 0; i < wordList[currPos].length; i++){
    let word = wordList[currPos][i]; 
    let currCount = dataset[word].count;
    fill(textColor(currCount)); 
    text(word, textx, texty); 
    textx += textWidth(word) + 10; 
    if(textx > width - xloc){
      texty += yloc/5; 
      textx = xloc; 
    }
    if(texty > height - yloc){
      break; 
    }
  }
}

function textColor(currCount){
  if(currCount < 20) {
    return palette[0]; 
  } else if(currCount >= 20 && currCount < 60) {
    return palette[1]; 
  } else if(currCount >= 60 && currCount < 100) {
    return palette[2];
  } else if(currCount >= 140 && currCount < 140) {
    return palette[3];
  } else {
    return palette[4];
  }
}

