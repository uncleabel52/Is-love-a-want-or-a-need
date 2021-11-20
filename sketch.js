//Is love a need or a want?
//by Jonathan Chan
//From course SM2289, writing digital media, taught by Daniel Howe, CityU HK
//dedicate this work for doubts and my love.

//Initial publish date: 03-10-2021
//Latest update date: 20-11-2021

let Subject = "love";
let MainSub = "love";
let lin = "";
let txtSiz;
let clickBoxes = [];
let juiceMixer;
let linNum = 5;
let linNum_ = 1;
let sceneBoo = false;
let sceneSubIn = 0;
let sceneThres = 6;
let bolder;
let deFont = "Georgia",
  altFont = "Arial";
let bg, tColorBase, tColorA, tColorB;
let timing = 0,
  stopper = 0,
  interval = 200,
  stopBoo = true,
  timeBoo = true;

let textLiner;
let keyProbablitiy = 1;
let wSpsp = "&spsp;";
let choice = [];

let sceneMaxTerm = 6;

let wordListMixNo = 110;

let pWW, pWH;

//vertical spacing = height / vSpacing
let vSpacing = 15;
let intVSpacing = 2;

function reStyle() {
  pWW = windowWidth;
  pWH = windowHeight;
  bolder = width / 4;
  txtSiz = min(height / 30, 60);
}

function preload() {
  bg = loadImage('assets/background0.jpg');
  deFont = loadFont('assets/rough_typewriter.otf');
  altFont = loadFont('assets/rough_typewriter-bld-itl.otf');
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  reStyle();

  //color design
  // bg = color(245, 241, 239);
  tColorBase = color(0);
  tColorA = color(242, 41, 27);
  tColorB = color(181, 45, 196);

  

  //text setup
  textSize(txtSiz);
  textFont(deFont);
  textAlign(LEFT, TOP);

  //grammar and first line setup
  juiceMixer = RiTa.grammar(rules);
  lin = scene[0];
  textLiner = new textWriter(
    lin,
    bolder,
    (intVSpacing * height) / vSpacing,
    width - bolder * 2,
    height / vSpacing,
    " ",
    txtSiz
  );
  textLiner.setStyle(
    txtSiz,
    tColorBase,
    tColorA,
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );
  textLiner.display();

  //replace space with &spsp;
  for (let i = 0; i < wordList.length; i++) {
    wordList[i].word = wordList[i].word.replaceAll(" ", wSpsp);
    wordList[i].subject = wordList[i].subject.replaceAll(" ", wSpsp);
  }

  //translate the wordList to grammer rules
  for (let i = 0; i < wordset.length - 3; i++) {
    let tempWords = [];
    for (let j = 0; j < wordListMixNo; j++)
      if (wordList[j].set == wordset[i].set) tempWords.push(wordList[j].word);

    let tempRule = "";
    for (let j = 0; j < tempWords.length; j++) {
      if (j != 0) tempRule += " | ";
      tempRule += tempWords[j];
    }
    juiceMixer.addRule(`POOL_${wordset[i].set}`, tempRule);

    if (wordset[i].side) {
      let tempAnt = "";
      for (let j = 0; j < wordset[i].antonyms.length; j++) {
        if (j != 0) tempAnt += " | ";
        tempAnt += `$POOL_${wordset[i].antonyms[j]}`;
      }
      juiceMixer.addRule(`ANTIPOOL_${wordset[i].set}`, tempAnt);
      let tempOpt = `LK_ $POOL_${wordset[i].set} _LK or LK_ $ANTIPOOL_${wordset[i].set} _LK`;
      juiceMixer.addRule(`OPTION_${wordset[i].set}`, tempOpt);
    }
  }
}



function draw() {
  changeCanvas(pWW, pWH);
  reStyle();
  

  // background(bg);
  let imgSiz = width
  if (height> width) imgSiz = height;
  image(bg, 0, 0, imgSiz, imgSiz);
  
  
  instructionIndex = 0;

  textLiner.setFrame(
    bolder,
    (intVSpacing * height) / vSpacing,
    width - bolder * 2,
    height / vSpacing,
    txtSiz
  );
  
  textLiner.setStyle(
    txtSiz,
    tColorBase,
    tColorA,
    tColorB,
    deFont,
    deFont,
    altFont,
    ITALIC
  );
  

  textLiner.display();

  if (instructionBoo && sceneSubIn == 0) {
    instruction = `Click ${instructionAni[instructionIndex]} to proceed`;
    let spliter = split(instruction, " ");
    let spacing = 0;

    for (let i = 0; i < spliter.length; i++) {
      textFont(deFont);
      if (spliter[i] == "red") {
        fill(tColorA);
      } else if (spliter[i] == "purple") {
        fill(tColorB);
        textFont(altFont);
        textStyle(ITALIC);
      } else fill(tColorBase);

      push();
      textSize(txtSiz/1.5);
      text(
        spliter[i],
        width / 2 - textWidth(instruction) / 2 + spacing,
        (height * 5) / 7
      );

      textFont(deFont);
      spacing += textWidth(spliter[i] + " ");
      pop();
    }
  }
}

//click boxes trigger, reset click boxes and change subject
function mouseClicked() {
  if (textLiner.clickBoxCheck()) {
    //Call the line limit from the start up
    linNum_ = linNum;
    lin = "";

    //count to introduce scene

    sceneSubIn++;
    instructionBoo = false;

    // if (sceneIndex == scene.length - 1 && sceneSubIn == 0) {
    //   sceneIndex = 0;
    //   sceneSubIn = 0;
    //   sceneBoo = true;
    //   Subject = MainSub;
    // } else {
    //   sceneSubIn++;
    //   if (sceneSubIn == sceneThres) {
    //     sceneIndex++;
    //   }
    // }

    let tempBox;

    for (let d = 0; d < wordList.length; d++) {
      if (
        wordList[d].word.includes(
          textLiner.clickBoz[textLiner.clickBoxIndex()].word.replaceAll(
            " ",
            textLiner.wSpace
          )
        )
      ) {
        tempBox = wordList[d];
      }
    }

    //change subject
    Subject = tempBox.subject;

    //change scene if click "love"
    if (Subject == MainSub) {
      sceneBoo = true;
      sceneSubIn = 0;

      // if (sceneIndex == 0) {
      //   instructionIndex = 0;
      //   linNum_ = 1;
      // }
      textSize(txtSiz);
      textFont(deFont);

      let tempChoiceSet = setFromChoice(choice);

      let transformedChoice = tranformChoiceSet(
        tempChoiceSet,
        wordset,
        sceneMaxTerm
      );

      lin = scenario(transformedChoice[0], transformedChoice[1]);

      choice = [];
      textLiner = new textWriter(
        lin,
        bolder,
        (intVSpacing * height) / vSpacing,
        width - bolder * 2,
        height / vSpacing,
        " ",
        txtSiz
      );
      textLiner.startTime(interval);
    } else {
      juiceMixer.addRule("subject", Subject);
      if (!sceneBoo) choice.push(tempBox);

      sceneBoo = false;

      //get set as object
      let tempSet = getOneSetObj(tempBox, wordset);
      //Imply option from wordList

      let tempOption = "";
      for (let l = 0; l < tempSet.leftPicks.length; l++) {
        if (l != 0) tempOption += " | ";
        tempOption += `$OPTION_${tempSet.leftPicks[l]}`;
      }
      juiceMixer.addRule("option", tempOption);

      //       let tempLeft = "",
      //         tempRight = "";
      //       for (let l = 0; l < tempBox.left.length; l++) {
      //         tempLeft += `$pool${tempBox.left[l]}.nr()`;
      //         if (l != tempBox.left.length - 1) tempLeft += " | ";
      //       }

      //       for (let r = 0; r < tempBox.right.length; r++) {
      //         tempRight += `$pool${tempBox.right[r]}.nr()`;
      //         if (r != tempBox.right.length - 1) tempRight += " | ";
      //       }

      //       juiceMixer.addRule("left", tempLeft);
      //       juiceMixer.addRule("right", tempRight);

      //the finishing touch

      for (let j = 0; j < linNum_; j++) {
        let tempKey = true;
        //Change scene line
        if (sceneSubIn >= sceneThres) {
          if (j == linNum_ - 1 && random(1) < keyProbablitiy) {
            lin += `Is ${Subject} LK_ ${MainSub} _LK ?`;
            tempKey = false;
          }
        }
        if (tempKey) {
          lin += juiceMixer.expand();
          if (j != linNum_ - 1) lin += " L2B ";
        }
      }

      textLiner = new textWriter(
        lin,
        bolder,
        (intVSpacing * height) / vSpacing,
        width - bolder * 2,
        height / vSpacing,
        " ",
        txtSiz
      );
    }
  }
}

function keyPressed() {
  console.log(textLiner.clickBoz);
}

//to match canvas with the window size
function changeCanvas(pWindowWidth, pWindowHeight) {
  if (pWindowWidth != windowWidth || pWindowHeight != windowHeight)
    createCanvas(windowWidth, windowHeight);
}

//check for key words
function linCheck(word) {
  let checker = ["Is", "Are", "a", "an", "or", "the"];
  let result = true;
  for (let i = 0; i < checker.length; i++) {
    if (word == checker[i]) result = false;
  }
  return result;
}
