import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5"; 

//global
let video; 
let handpose; 
let facemesh; 
let objectDetector; 
let numFingers = 0; 
let predictionsFinger = []; 
let predictionsFace = []; 
let obj_1 = null; 
let obj_2 = null; 
let obj_3 = null; 
let obj_4 = null; 
let object = null; 
let position = [0,0]; 
let classifier;
let soundModel = 'https://teachablemachine.withgoogle.com/models/fi2FPJs__/';
let label = 'listening...';
let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    
]; 

let temp = ""; 

//face
let moveLeftPrev = false; 
let moveLeft = false; 
let leftSwitch = false; 
let moveRightPrev = false; 
let moveRight = false; 
let rightSwitch = false; 
let moveDownPrev = false; 
let moveDown = false; 
let downSwitch = false; 
let moveUpPrev = false; 
let moveUp = false; 
let upSwitch = false; 

//Grid function 
function Grid(props){

    //setup for facemesh, handpose, and object detector 
	const setup = (p5, canvasParentRef) => {
        //creates video 
        video = p5.createCapture(p5.VIDEO);
        video.size(p5.windowWidth, p5.windowHeight);

        handpose = ml5.handpose(video, modelHand);
        facemesh = ml5.facemesh(video, modelFace);
        objectDetector = ml5.objectDetector('cocossd', {}, modelObject);
        classifier = ml5.soundClassifier(soundModel + 'model.json');

        video.hide()
        //creates canvas 
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
	};

    //prints when models are ready 
    function modelHand() {
        console.log("Handpose Model ready!");
    }

    function modelFace() {
        console.log("FaceMesh Model ready!");
    }

    function modelObject() {
        console.log('Object Model Loaded!');
      }

    //draws grid and text in sketch 
	const draw = (p5) => {
        p5.background("#252837"); 
        configureGrid();
        drawGrid(p5); 
        p5.textSize(12)
        if (props.colorKey == 2){
            p5.text("Object for Color 1: " + obj_1, p5.windowWidth * 0.1, 700)
            p5.text("Object for Color 2: " + obj_2, p5.windowWidth * 0.1 + 150, 700)
            p5.text("Object for Color 3: " + obj_3, p5.windowWidth * 0.1 + 300, 700)
            p5.text("Object for deleting: " + obj_4, p5.windowWidth * 0.1 + 450, 700)
        }
    }

    //for finding fingers and the number of fingers being held up 
    function findFingers() {
        handpose.on("predict", results => {
            predictionsFinger = results;
        });
        let fingersUp = 0; 
        for (let i = 0; i < predictionsFinger.length; i += 1) {
            const prediction = predictionsFinger[i];

            //position of tip and base of fingers
            const center = prediction.landmarks[0]

            const indexTip = prediction.landmarks[8]
            const indexBase = prediction.landmarks[5]

            const middleTip = prediction.landmarks[12]
            const middleBase = prediction.landmarks[9]

            const ringTip = prediction.landmarks[16]
            const ringBase = prediction.landmarks[13]

            const pinkyTip = prediction.landmarks[20]
            const pinkyBase = prediction.landmarks[17]

            let iFull = distance([indexTip[0], indexTip[1]], [center[0], center[1]])
            let iHalf = distance([indexBase[0], indexBase[1]], [center[0], center[1]])

            let mFull = distance([middleTip[0], middleTip[1]], [center[0], center[1]])
            let mHalf = distance([middleBase[0], middleBase[1]], [center[0], center[1]])

            let rFull = distance([ringTip[0], ringTip[1]], [center[0], center[1]])
            let rHalf = distance([ringBase[0], ringBase[1]], [center[0], center[1]])

            let pFull = distance([pinkyTip[0], pinkyTip[1]], [center[0], center[1]])
            let pHalf = distance([pinkyBase[0], pinkyBase[1]], [center[0], center[1]])

            if (iFull >= iHalf){
                fingersUp += 1
            }
            if (mFull >= mHalf){
                fingersUp += 1
            }
            if (rFull >= rHalf){
                fingersUp += 1
            }
            if (pFull >= pHalf){
                fingersUp += 1
            }

            numFingers = fingersUp
            console.log(numFingers)
        }
    }

    //for detectig facial movements 
    function findFace(){
        facemesh.on("predict", results => {
            console.log("Face prediction occurred");
            predictionsFace = results;
        });

        for (let i = 0; i<predictionsFace.length; i++){
            let points = predictionsFace[i].scaledMesh; 
    
            for (let j= 0; j<points.length; j++){
                let x = points[j][0]; 
                let y = points[j][1]; 
    
                let right = points[127]
                let middle = points[1]
                let left = points[356]
                let lip_up = points[13]
                let lip_down = points[14]
                let up = points[454]
                moveRightPrev = moveRight 
                moveLeftPrev = moveLeft
                moveUpPrev = moveUp
                moveDownPrev = moveDown

                if (isNegative(right[0], middle[0])){
                    console.log("Right")
                    moveRight = true; 
                    if (moveRightPrev){
                        rightSwitch = false; 
                    }
                    else if (!moveRightPrev){
                        rightSwitch = true; 
                        if (position[0] <= grid.length-2){
                            position[0] += 1; 
                        }
                    }

                }else{
                    moveRight = false; 
                    rightSwitch = false; 
                }

                if (!isNegative(left[0], middle[0])){
                    moveLeft = true; 
                    if (moveLeftPrev){
                        leftSwitch = false; 
                    }
                    else if (!moveLeftPrev){
                        leftSwitch = true; 
                        position[0] -= 1; 
                        if (position[0]<=0){
                        position[0] = 0; 
                    }
                }
                }else{
                    moveLeft = false; 
                    leftSwitch = false; 
                }

                if (distance(lip_up, lip_down) > 15){
                    moveDown = true; 
                    if (moveDownPrev){
                        downSwitch = false
                    }
                    else{
                        if (position[1] <= grid.length-2){
                            position[1] += 1; 
                        }
                    }
                }else{
                    moveDown = false; 
                    downSwitch = false; 
                }

                if (!isNegative(middle[1], up[1])){
                    moveUp = true; 
                    if (moveUpPrev){
                        upSwitch = false
                    }
                    else{
                        position[1] -= 1
                        if (position[1]<=0){
                            position[1] = 0; 
                        }
                    }
                }else{
                    moveUp = false; 
                    upSwitch = false; 
                }
            }
        }
    }

    //for setting objects to colors 
    function objectColor(){
        objectDetector.detect(video, (err, results) => {

            for(var i = 0; i<results.length; i++){
                console.log(results[i])
                if (results[i]["label"] != "person" && results[i]["width"] >= 300 && results[i]["confidence"] > 0.70){
                    temp = results[i]["label"]
                }
            }

            object = results[results.length-1]["label"]

           if (obj_1 == null){
               if (object != "person"){
                    obj_1 = object
               }
           }
           if (obj_2 == null && (object !== obj_1)){ 
                if (object != "person"){
                    obj_2 = object
                }
           }
           if (obj_2 != null && obj_3 == null && (object !== obj_2 && object !== obj_1)){
                if (object != "person"){
                    obj_3 = object
                }
           }
           if (obj_3 != null && obj_4 == null && (object !== obj_3 && object !== obj_2 && object !== obj_1)){
                if (object != "person"){
                    obj_4 = object
                }
           }
          });
    }

    //for teachable machine sound 
    function findSound(){
        classifier.classify(gotResult);
    }

    function gotResult(error, results) {
        if (error) {
          console.error(error);
          return;
        }
        // The results are in an array ordered by confidence.
        // console.log(results[0]);
        label = results[0];
        if (label.confidence > 0.90)
        {
            if (label.label == "Clap"){
                grid[position[0]][position[1]] = 1
            }
            if (label.label == "Crinkle"){
                grid[position[0]][position[1]] = 2
            }
            if (label.label == "Knock"){
                grid[position[0]][position[1]] = 3
            }

        }
        console.log(label)
      }


    //for setting colors to the grid 
    function configureGrid(){
        //Colors 
        //Fingers 
        if (props.colorKey == 1){
            findFingers(); 
            if (numFingers == 1){
                grid[position[0]][position[1]] = 1
            }

            if (numFingers == 2){
                grid[position[0]][position[1]] = 2
            }

            if (numFingers == 3){
                grid[position[0]][position[1]] = 3
            }

            if (numFingers == 4){
                grid[position[0]][position[1]] = 0 
            }
        }

        //Objects
        if (props.colorKey == 2){
            objectColor(); 
            if (object == obj_1){
                grid[position[0]][position[1]] = 1
            }
            if (object == obj_2){
                grid[position[0]][position[1]] = 2
            }
            if (object == obj_3){
                grid[position[0]][position[1]] = 3
            }
            if (object == obj_4){
                grid[position[0]][position[1]] = 0
            }
        }

        //Sounds 
        if(props.colorKey == 3){
            findSound(); 
        }

        //Movement Interactions 
        if (props.moveKey == 1){
            findFace()
        }

        //Sounds

    }

    //helper function to draw grid 
    function drawGrid(p5) {
        var size = 30; 
        p5.stroke(80,80,80); 
        for(var i = 0; i <grid.length; i++){
        for (var j = 0; j< grid.length; j++){
          if (grid[i][j] == 0){
              p5.fill(15, 16, 22);  
          }
          else if (grid[i][j] == 1) {
              p5.fill(props.colorOne); 
          }
          else if (grid [i][j] == 2) {
              p5.fill(props.colorTwo); 
          }
          else if (grid [i][j] == 3) {
              p5.fill(props.colorThree); 
          }
          p5.rect(p5.windowWidth * 0.1 + (size*i) , 25 + (size*j), size, size); 
      }
      p5.fill(255, 255, 255, 63); 
      p5.rect(p5.windowWidth * 0.1 + (size*position[0]) , 25 + (size*position[1]), size, size);
    }
	}

    //distance formula 
    function distance(p1, p2) {
        let dis = Math.sqrt(Math.pow(p2[1] - p1[1], 2) +  Math.pow(p2[0] - p1[0], 2))
        return dis 
    }

    //negative formula 
    function isNegative(one, two){
        if (two - one <0){
            return true; 
        }
        return false; 
    }


    //keypressed for default interactions 
  const keyPressed = (p5) =>{
    //moving around using keyboard
    if (props.moveKey == 0)
    {
        if (p5.keyCode == 37){
        if (position[0] >= 1){
            position[0] -= 1
        }
        }
        if (p5.keyCode == 39){
        if (position[0] <= grid.length-2){
            position[0] += 1
        }
        }
        if (p5.keyCode == 38){
        if (position[1] >= 1){
            position[1] -= 1
        }
        }
        if (p5.keyCode == 40){
        if (position[1] <= grid.length-2){
            position[1] += 1
        }
        }
    }

    //assigning color using keyboard 
    if (props.colorKey == 0){
        if (p5.keyCode == 49){
            grid[position[0]][position[1]] = 1

        }
        if (p5.keyCode == 50){
            grid[position[0]][position[1]] = 2
        }
        if (p5.keyCode == 51){
            grid[position[0]][position[1]] = 3
        }
        if (p5.keyCode == 32){
            grid[position[0]][position[1]] = 0
        }
        }
    }
	return <Sketch setup={setup} draw={draw} keyPressed ={keyPressed} />;
};

export default Grid