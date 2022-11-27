import React, {Component} from "react";
import Grid from "./Sketches/Sketch";
import MovementDes from "./movementDes";
import ColorDes from "./colorDes";
import PopUp from "./Help";
import "./App.css"; 

let movementMap = {
  0: "Keyboard",
  1: "Face" 
}

let colorMap = {
  0: "Keyboard",
  1: "Hands", 
  2: "Object"
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
    }
  
  }

  handleMoveKeyPress = (event) => {
    console.log(this.props.clicked)
    if (event.target.value != null){
      this.state.moveKey = parseInt(event.target.value)
      this.setState(prevState => ({
        ...prevState,
        moveKey: this.state.moveKey
      }))

    }
  }

  handleColorKeyPress = (event) => {
    if (event.target.value != null){
      this.state.colorKey = parseInt(event.target.value)
      this.setState(prevState => ({
        ...prevState,
        colorKey: this.state.colorKey
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


  render(){
    return(
          <div className = "centered">
            <div className = "body">
              {this.props.clicked ? <PopUp/>
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
              </div>
              <div className = "bodyRightTwo">
                <div className = "interaction"> Movement</div>
                <button type="button" value = "0" onClick = {this.handleMoveKeyPress}> Default—Keyboard </button> 
                <button type="button" value = "1" onClick = {this.handleMoveKeyPress}> Face </button> 
                <div className = "interaction"> Color Assignment </div>
                <button type="button" value = "0" onClick = {this.handleColorKeyPress}> Default—Keyboard </button> 
                <button type="button" value = "1" onClick = {this.handleColorKeyPress}> Hands </button> 
                <button type="button" value = "2" onClick = {this.handleColorKeyPress}> Object </button> 
              </div>
            </div>
          </div>
    )
  }
}

export default Demo; 