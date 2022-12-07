import React, {Component} from "react";
import Grid from "./Sketches/Sketch";
import MovementDes from "./movementDes";
import ColorDes from "./colorDes";
import PopUp from "./Help";
import Instructions from "./instruction";
import "./App.css"; 

let movementMap = {
  0: "Keyboard",
  1: "Face" 
}

let colorMap = {
  0: "Keyboard",
  1: "Hands", 
  2: "Object", 
  3: "Sound"
}

class Demo extends Component{
  constructor(props){
    super(props)
    this.state = {
      moveKey: 0, 
      colorKey: 0, 
      colorOne: "#3858FF", 
      colorTwo: "#FF7E89", 
      colorThree: "#9F54FF", 
      moveFaceDemo: 0, 
      moveSoundDemo: 0, 
      colorHandDemo: 0, 
      colorObjectDemo: 0, 
      colorSoundDemo: 0, 
      type: null
    }
  }


  handleMoveKeyPress = (event) => {
    this.state.type = "M"
    if (event.target.value != null){
      this.state.moveKey = parseInt(event.target.value)
      if (this.state.moveKey == 1){
        this.state.moveFaceDemo += 1
      }
      else if (this.state.moveKey == 2){
        this.state.moveSoundDemo += 1
      }
      this.setState(prevState => ({
        ...prevState,
        moveKey: this.state.moveKey, 
        moveFaceDemo: this.state.moveFaceDemo,
        moveSoundDemo: this.state.moveSoundDemo, 
        type: this.state.type

      }))

    }
  }

  handleColorKeyPress = (event) => {
    this.state.type = "C"
    if (event.target.value != null){
      this.state.colorKey = parseInt(event.target.value)
    
    if (this.state.colorKey == 1){
        this.state.colorHandDemo += 1
      }
    else if (this.state.colorKey == 2){
        this.state.colorObjectDemo += 1
      }
    else if (this.state.colorKey == 3){
        this.state.colorSoundDemo += 1
      }   

      this.setState(prevState => ({
        ...prevState,
        colorKey: this.state.colorKey, 
        colorObjectDemo: this.state.colorObjectDemo, 
        colorSoundDemo: this.state.colorSoundDemo, 
        type: this.state.type
      }))

    }
  }

  handleColorPick = (event) =>{
    if (event.target.id == "colorOne"){ 
      this.state.colorOne = event.target.value
    }
    if (event.target.id == "colorTwo"){ 
      this.state.colorTwo = event.target.value
    }
    if (event.target.id == "colorThree"){ 
      this.state.colorThree = event.target.value
    }
      this.setState(prevState => ({
        ...prevState,
        colorOne: this.state.colorOne,
        colorTwo: this.state.colorTwo,
        colorThree: this.state.colorThree
      }))
  }

  demoIsClicked = () =>{
    if (this.state.type == "M"){
    if(this.state.moveKey == 1){
      this.state.moveFaceDemo += 1
    }
    else if (this.state.moveKey == 2){
      this.state.moveSoundDemo += 1
    }
  }
  else{
    if (this.state.colorKey == 1){
      this.state.colorHandDemo += 1
    }
    else if (this.state.colorKey == 2){
      this.state.colorObjectDemo += 1
    }
    else if (this.state.colorKey == 3){
      this.state.colorSoundDemo += 1
    }
  }
    this.setState(prevState => ({
      ...prevState,
     moveFaceDemo: this.state.moveFaceDemo, 
     moveSoundDemo: this.state.moveSoundDemo, 
     colorHandDemo: this.state.colorHandDemo, 
     colorObjectDemo: this.state.colorObjectDemo, 
     colorSoundDemo: this.state.colorSoundDemo
    }))

  }

  render(){
    return(
          <div className = "centered">
            <div className = "body">
              {this.props.clicked ? <div className = "background" onClick = {this.props.handleClicked}><PopUp onClick = {this.props.handleClicked}/></div>
              : <div/>}
              {this.state.moveFaceDemo == 1 && this.state.moveKey == 1 || this.state.moveSoundDemo==1 && this.state.moveKey== 2 || 
              this.state.colorHandDemo == 1 && this.state.colorKey ==1 || this.state.colorObjectDemo == 1 && this.state.colorKey == 2 || this.state.colorSoundDemo == 1 && this.state.colorKey == 3
              ? <div className = "background" onClick = {this.demoIsClicked}> <Instructions onClick = {this.demoIsClicked} moveKey = {this.state.moveKey} colorKey = {this.state.colorKey} type = {this.state.type}/> </div>
              : <div/>}
              <div className = "grid">
                <Grid moveKey = {this.state.moveKey} colorKey = {this.state.colorKey} colorOne = {this.state.colorOne} colorTwo = {this.state.colorTwo} colorThree = {this.state.colorThree}/>
              </div>
              <div className = "bodyRightOne">
                <div className = "description_first">
                  <h1 className = "interactionName">Movement: {movementMap[this.state.moveKey]}</h1>  
                  <MovementDes movementDes = {this.state.moveKey}/>
                </div>
                <div className = "description">
                  <h1 className = "interactionName">Color: {colorMap[this.state.colorKey]}</h1>  
                  <ColorDes colorDes = {this.state.colorKey}/>
                </div>   
                <div className = "description">
                  <h1 className = "interactionName">Color Picker</h1>
                  <input type="color" id="colorOne" value= {this.state.colorOne} onChange = {this.handleColorPick}></input>
                  <input type="color" id="colorTwo" value= {this.state.colorTwo} onChange = {this.handleColorPick}></input>
                  <input type="color" id="colorThree" value= {this.state.colorThree} onChange = {this.handleColorPick}></input>
                </div> 
                <label id="searchLabel" for="colorOne"> One </label>
                <label id="searchLabel" for="colorTwo"> Two </label>
                <label id="searchLabel" for="colorThree"> Three</label>
              </div>
              <div className = "bodyRightTwo">
                <div className = "interaction"> Movement</div>
                {this.state.moveKey == 0? 
                <button type="button" value = "0" onClick = {this.handleMoveKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Default—Keyboard </button> 
                  :<button type="button" value = "0" onClick = {this.handleMoveKeyPress}> Default—Keyboard </button>}
                 {this.state.moveKey == 1? 
                <button type="button" value = "1" onClick = {this.handleMoveKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Face </button> 
                  :<button type="button" value = "1" onClick = {this.handleMoveKeyPress}> Face </button>}
                {this.state.moveKey == 2? 
                <button type="button" value = "2" onClick = {this.handleMoveKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Sound </button> 
                  :<button type="button" value = "2" onClick = {this.handleMoveKeyPress}> Sound </button>}
                <div className = "interaction"> Color Assignment </div>
                {this.state.colorKey == 0? 
                <button type="button" value = "0" onClick = {this.handleColorKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Default—Keyboard </button> 
                  :<button type="button" value = "0" onClick = {this.handleColorKeyPress}> Default—Keyboard </button>}
                 {this.state.colorKey == 1? 
                <button type="button" value = "1" onClick = {this.handleColorKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Hands </button> 
                  :<button type="button" value = "1" onClick = {this.handleColorKeyPress}> Hands </button>}
                  {this.state.colorKey == 2? 
                <button type="button" value = "2" onClick = {this.handleColorKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Object </button> 
                  :<button type="button" value = "2" onClick = {this.handleColorKeyPress}> Object </button>}
                  {this.state.colorKey == 3? 
                <button type="button" value = "3" onClick = {this.handleColorKeyPress} style = {{color: "darkgrey", backgroundColor: "#333333"}}> Sound </button> 
                  :<button type="button" value = "3" onClick = {this.handleColorKeyPress}> Sound </button>}
              </div>
            </div>
          </div>
    )
  }
}

export default Demo; 