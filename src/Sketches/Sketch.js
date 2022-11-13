import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5"; 

let video; 
let cnv; 
let handpose; 
let facemesh; 
let predictionsFinger = []; 
let predictionsFace = []; 
let position = [0,0]; 
let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]; 
let numFingers = 0; 

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

function Grid(props){
    
	const setup = (p5, canvasParentRef) => {
        video = p5.createCapture(p5.VIDEO);
        video.size(p5.windowWidth, p5.windowHeight);
        handpose = ml5.handpose(video, modelReady);
        handpose.on("predict", results => {
            predictionsFinger = results;
        });

        facemesh = ml5.facemesh(video, modelReady);
        facemesh.on("predict", results => {
            predictionsFace = results;
        });
        
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		cnv = p5.createCanvas(700, 700).parent(canvasParentRef);
        video.hide()
	};


    function modelReady() {
        console.log("Model ready!");
    }

	const draw = (p5) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight); 
        p5.background(15,16,22); 
        configureGrid();
        drawGrid(p5); 
        p5.textSize(32)
    }

    //for finding fingers and the number of fingers being held up 
    function findFingers() {
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

    function findFace(){
        for (let i = 0; i<predictionsFace.length; i++){
            let points = predictionsFace[i].scaledMesh; 
    
            for (let j= 0; j<points.length; j++){
                let x = points[j][0]; 
                let y = points[j][1]; 
    
                let right = points[127][0]
                let middle = points[6]
                let left = points[356][0]
                let lip_up = points[13]
                let lip_down = points[14]
                let up = points[151]
                let down = points[17]
                moveRightPrev = moveRight 
                moveLeftPrev = moveLeft
                moveUpPrev = moveUp
                moveDownPrev = moveDown

                if (isNegative(right, middle[0])){
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

                if (!isNegative(left, middle[0])){
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
            }
        }
                

    }


    function configureGrid(){
        if (props.option == 1){
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

        if (props.option == 2){
            findFace()
        }
    }

    function drawGrid(p5) {
        var size = 50; 
        p5.stroke(255); 
        for(var i = 0; i <grid.length; i++){
        for (var j = 0; j< grid.length; j++){
          if (grid[i][j] == 0){
              p5.fill(15, 16, 22);  
          }
          else if (grid[i][j] == 1) {
              p5.fill(61,92,123); 
          }
          else if (grid [i][j] == 2) {
              p5.fill(106,93,123); 
          }
          else if (grid [i][j] == 3) {
              p5.fill(226,121,130); 
          }
          p5.rect(500 + (size*i) , 25 + (size*j), size, size); 
      }
      p5.fill(255); 
      p5.rect(500 + (size*position[0]) , 25 + (size*position[1]), size, size);
    }
	}

    function distance(p1, p2) {
        let dis = Math.sqrt(Math.pow(p2[1] - p1[1], 2) +  Math.pow(p2[0] - p1[0], 2))
        return dis 
    }

    function isNegative(one, two){
        if (two - one <0){
            return true; 
        }
        return false; 
    }

  const keyPressed = (p5) =>{
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
	return <Sketch setup={setup} draw={draw} keyPressed ={keyPressed} />;
};

export default Grid