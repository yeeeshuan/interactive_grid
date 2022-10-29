import React, {Component} from "react";
import Sketch from "./Sketches/Sketch";
import "./App.css"; 

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      predictions: []
    }
    
  }

  render(){
    return(
      <div className = "centered">
        <Sketch/>
      </div>
    )
  }
}

export default App; 