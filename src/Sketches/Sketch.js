import React from "react";
import Sketch from "react-p5";
import * as ml5 from "ml5"; 

let video; 
let cnv; 
let handpose; 
let predictions = []; 
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

export default (props) => {
    
	const setup = (p5, canvasParentRef) => {
        video = p5.createCapture(p5.VIDEO);
        video.size(p5.windowWidth, p5.windowHeight);
        handpose = ml5.handpose(video, modelReady);
        handpose.on("predict", results => {
            predictions = results;
          });
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		cnv = p5.createCanvas(700, 700).parent(canvasParentRef);
	};


    function modelReady() {
        console.log("Model ready!");
    }

	const draw = (p5) => {
        p5.createCanvas(1000,1000); 
        p5.background(0); 

        configureGrid();
        drawGrid(p5); 
    }

    function findFingers() {
        let fingersUp = 0; 
        console.log(predictions.length)
        for (let i = 0; i < predictions.length; i += 1) {
            const prediction = predictions[i];

            //position of tip and base of fingers
            const thumbTip = prediction.landmarks[4]
            const thumbBase = prediction.landmarks[5]

            const indexTip = prediction.landmarks[8]
            const indexBase = prediction.landmarks[5]

            const middleTip = prediction.landmarks[12]
            const middleBase = prediction.landmarks[9]

            const ringTip = prediction.landmarks[16]
            const ringBase = prediction.landmarks[13]

            const pinkyTip = prediction.landmarks[20]
            const pinkyBase = prediction.landmarks[17]

            /*
            if (distance([thumbTip[0], thumbTip[1]], [thumbBase[0], thumbBase[1]])){
                fingersUp += 1
            }
            */
            if (distance([indexTip[0], indexTip[1]], [indexBase[0], indexBase[1]])){
                fingersUp += 1
            }
            if (distance([middleTip[0], middleTip[1]], [middleBase[0], middleBase[1]])){
                fingersUp += 1
            }
            if (distance([ringTip[0], ringTip[1]], [ringBase[0], ringBase[1]])){
                fingersUp += 1
            }
            if (distance([pinkyTip[0], pinkyTip[1]], [pinkyBase[0], pinkyBase[1]])){
                fingersUp += 1
            }

            numFingers = fingersUp
            console.log(fingersUp)
        }
    }

    function configureGrid(){
        findFingers()
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

    function drawGrid(p5) {
        var size = 50; 
		p5.background(255);
        for(var i = 0; i <grid.length; i++){
        for (var j = 0; j< grid.length; j++){
          if (grid[i][j] == 0){
              p5.fill(255,255,255);  
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
          p5.rect(25 + (size*i) , 25 + (size*j), size, size); 
      }
      p5.fill(0); 
      p5.rect(25 + (size*position[0]) , 25 + (size*position[1]), size, size);
    }
	}
        

    function distance(p1, p2) {
        //let dis = Math.sqrt(Math.pow(p2[1] - p1[1], 2) +  Math.pow(p2[0] - p1[0], 2))
        let dis = (p1[1] - p2[1])
        console.log(dis)
        if (dis > 0){
            return false
        }else{
            return true
        }
    }

  const keyPressed = (p5) =>{
    console.log(p5.keyCode)
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