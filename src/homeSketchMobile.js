import React from "react";
import Sketch from "react-p5";

let video; 
let position = [0,0]; 
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
let timer = 0; 

function HomeGridMobile(props){
    
	const setup = (p5, canvasParentRef) => {
        video = p5.createCapture(p5.VIDEO);
        video.size(p5.windowWidth, p5.windowHeight);
        video.hide()

        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
	};

	const draw = (p5) => {
        timer += 1; 
        p5.background("#252837"); 
        drawGrid(p5); 
    }

    function autoMove(){
        if (Math.floor(timer, 1) % 25 == 0){
            position[0] += 1; 
            console.log(position)
            if (position[0] == grid.length){
                position[1] += 1
                position[0] = 0; 
                if (position[1] == grid.length){
                    position[0] = 0
                    position[1] = 0 
                }
            }
        
        grid[position[0]][position[1]] = Math.floor(Math.random() * 4)
    }
}

    function drawGrid(p5) {
        var size = 40; 
        autoMove(); 
        p5.stroke(80,80,80); 
        for(var i = 0; i <grid.length; i++){
        for (var j = 0; j< grid.length; j++){
          if (grid[i][j] == 0){
              p5.fill(15, 16, 22);  
          }
          else if (grid[i][j] == 1) {
              p5.fill("#3858FF"); 
          }
          else if (grid[i][j] == 2) {
              p5.fill("#FF7E89"); 
          }
          else if (grid[i][j] == 3) {
              p5.fill("#9F54FF"); 
          }
          p5.rect(p5.windowWidth * 0.15 + (size*i) , 15 + (size*j), size, size); 
      }
      p5.fill(255, 255, 255); 
      p5.rect(p5.windowWidth * 0.15 + (size*position[0]) , 15 + (size*position[1]), size, size);
    }
	}

	return <Sketch setup={setup} draw={draw} />
};

export default HomeGridMobile; 