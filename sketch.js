let palette =["#B33951", "#201335", "#446274", "#74A57F", "#DF7F01"];  
// green: "#447604", blue: #407076"
let backgroundColor = "#EEEBE0"; 
let blackColor = "#272416"; 
let posList = []; 
let posTextInfo = []; 
let wordList = {}; 
let displayID = "ADJ"; 
let countRange = [3, 5, 12, 30]; 
let marginTop = 30; 
let marginBottom = 160; 
let marginLeft = 5; 
let titleSize = 14; 
let titleSpacing = 15;  
let bodySize = 13; 
let descriptionLineSpacing = 4; 
let descriptionTxtBoxWidth = 450;
let displayWordInLineSpacing = 10; 
let displayWordBetLineSpacing = 2; 


function preload(){
  dataset = loadJSON('text1.json'); 
  // fontlibre = loadFont('./fonts/LibreBaskerville-Regular.ttf'); 
  fontTest = loadFont('./fonts/Source_Serif_4/static/SourceSerif4-Regular.ttf'); 
  fontBold = loadFont('./fonts/Source_Serif_4/static/SourceSerif4-SemiBold.ttf'); 

  fontRoboto = loadFont('./fonts/Roboto/Roboto-Regular.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  dataSetUp();
  typeSetUp();  
  posSetUp(); 
}

function draw() {
  background(backgroundColor);
  drawHelper(); 
}

/// HELPER FUNCTIONS ///

function drawHelper(){
  noStroke();
  textSize(titleSize); 
  let xloc = (width - textArrayWidth(posTextInfo.text))/2;  
  let yloc = marginTop;   
  partOfSpeechDrawHelper(xloc, yloc); 
  let rectWidth = width; 
  let rectHeight = height-marginBottom-yloc/2; 
  fill(backgroundColor);
  rect(marginLeft, yloc + yloc/2, rectWidth, rectHeight); 
  textSize(bodySize); 
  for(let i = 0; i < posTextInfo.length; i++){
    checkMouseClicked(posTextInfo[i]); 
  }
  for(let i = 0; i < posTextInfo.length; i++){
    if(posTextInfo[i].id === displayID){
      posTextInfo[i].selected = true;
    }
    else{
      posTextInfo[i].selected = false;
    }
  }
  displayWordList(displayID, marginLeft, yloc*2, rectWidth, rectHeight);
  drawDescription(xloc, yloc, rectWidth, rectHeight)
}

function drawDescription(xloc, yloc, wdth, hght){
  textSize(titleSize); 
  fill(blackColor); 
  let description = "This data portrait analyses the linguistic intricacies of Cassandra Clare's bestselling novel, The Clockwork Angel. It extracts and visualizes the frequency of every word used in the novel in addition to classifying the word according to it's part of speech."; 
  let legend = ["Word Frequency", "Less than " + countRange[0], "Between " + countRange[0] + " & " + countRange[1], "Between " + countRange[1] + " & " + countRange[2], "Between " + countRange[2] + " & " + countRange[3], "Greater than " + countRange[3]]; 
  let finalX = posTextInfo[posTextInfo.length-1].xpos + posTextInfo[posTextInfo.length-1].txtWidth; 
  let legendY =  hght + yloc*2; 
  let legendRectWidth = 70; 
  let curr = legendY + textSize() + descriptionLineSpacing; 
  textFont(fontBold); 
  text(legend[0], finalX - textWidth(legend[0]), legendY);
  text("Data Portrait", xloc, legendY);
  textFont(fontTest); 
  text(description, xloc, yloc*2 + hght + textSize() + descriptionLineSpacing, descriptionTxtBoxWidth);
  for(let i = 1; i < legend.length; i++){
    text(legend[i], finalX - textWidth(legend[2])- 2*legendRectWidth, curr); 
    curr += textSize(); 
  }
  
  curr = legendY + descriptionLineSpacing; 
  
  for(let i = 0; i < palette.length; i++){
    fill(palette[i]);
    rect(finalX - legendRectWidth/2, curr + descriptionLineSpacing, legendRectWidth/2, textSize()-descriptionLineSpacing/2); 
    curr += textSize(); 
  }
}

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
}

function posSetUp(){
  posList.sort(); 
  for(let i = 0; i < posList.length; i++){
    posTextInfo.push({id: posList[i], text: "", xpos:0, ypos:0, txtWidth:0, txtHeight:0, selected:false})
  }
  posTextInfo[0].text = "Adjective"; 
  posTextInfo[1].text = "Adposition"; 
  posTextInfo[2].text = "Adverb"; 
  posTextInfo[3].text = "Auxillary"; 
  posTextInfo[4].text = "Coordinating Conjunction"; 
  posTextInfo[5].text = "Determiner"; 
  posTextInfo[6].text = "Interjective"; 
  posTextInfo[7].text = "Other"; 
  posTextInfo[8].text = "Noun"; 
  posTextInfo[9].text = "Numeral"; 
  posTextInfo[10].text = "Pronoun"; 
  posTextInfo[11].text = "Proper Noun"; 
  posTextInfo[12].text = "Subordinating Conjunction"; 
  posTextInfo[13].text = "Verb"; 
}

function typeSetUp(){
  textFont(fontTest); 
}

function textArrayWidth(){
  let totalWidth = 0; 
  textFont(fontBold); 
  for(let i = 0; i < posTextInfo.length; i++){
    if (i !== posTextInfo.length - 1) { // if it's not the last word
      totalWidth += textWidth(posTextInfo[i].text) + titleSpacing; 
    } else {
      totalWidth += textWidth(posTextInfo[i].text);
    }
  }
  textFont(fontTest); 
  return totalWidth
}

function partOfSpeechDrawHelper(startingX, startingY){
  let rectColor; 
  let txtColor; 
  textFont(fontBold); 
  for(let i = 0; i < posTextInfo.length; i++){
    if(posTextInfo[i].selected){
      rectColor = color(100, 150, 0);
      txtColor = color(255); 
    } else {
      rectColor = backgroundColor; 
      txtColor = color(blackColor); 
    }
    fill(rectColor); 
    posTextInfo[i].xpos = startingX-2;
    posTextInfo[i].ypos = startingY-textSize();
    posTextInfo[i].txtWidth = textWidth(posTextInfo[i].text)+4; 
    posTextInfo[i].txtHeight = textSize() + textSize()/2; 
    rect(posTextInfo[i].xpos, posTextInfo[i].ypos, posTextInfo[i].txtWidth, posTextInfo[i].txtHeight); 
    fill(txtColor); 
    text(posTextInfo[i].text, startingX, startingY); 
    startingX += textWidth(posTextInfo[i].text) + titleSpacing; 
  }
  textFont(fontTest); 
}

function displayWordList(currPos, xloc, yloc, rectWidth, rectHeight){  
  let textx = xloc; 
  let texty = yloc; 
  for(let i = 0; i < wordList[currPos].length; i++){
    let word = wordList[currPos][i]; 
    let currCount = dataset[word].count;
    fill(textColor(currCount)); 
    if(textx + textWidth(word) > rectWidth){ 
      texty += textSize()+ displayWordBetLineSpacing; 
      textx = xloc;
      if(texty > rectHeight + yloc/1.25){
        break; 
      }
    }      
    text(word, textx, texty); 
    textx += textWidth(word) + displayWordInLineSpacing;
  }
  return [textx, texty]
}

function textColor(currCount){
  if(currCount < countRange[0]) {
    return palette[0]; 
  } else if(currCount >= countRange[0] && currCount < countRange[1]) {
    return palette[1]; 
  } else if(currCount >= countRange[1] && currCount < countRange[2]) {
    return palette[2];
  } else if(currCount >= countRange[2] && currCount < countRange[3]) {
    return palette[3];
  } else {
    return palette[4];
  }
}

function checkMouseClicked(obj){
  if(mouseIsPressed && mouseX > obj.xpos && mouseX < (obj.xpos+obj.txtWidth) 
  && mouseY > obj.ypos && mouseY < (obj.ypos+obj.txtHeight)){
    obj.selected = true; 
    displayID = obj.id; 
  }
}
