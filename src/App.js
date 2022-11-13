import React, {Component} from "react";
import Grid from "./Sketches/Sketch";
import "./App.css"; 

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      key: null
    }
  
  }

  handleKeyPress = (event) => {
    if (event.key == "1"){
      this.setState(prevState => ({
        ...prevState,
        key: event.key
      }))
    }

    if (event.key == "2"){
      this.setState(prevState => ({
        ...prevState,
        key: event.key
      }))
    }
  }

  render(){
    return(
          <div className = "centered">
            <input type="text" id="one" onKeyPress={this.handleKeyPress} />
            <h1>Option 1</h1>
            <Grid option = {this.state.key}/>
          </div>
    )
  }
}

export default App; 