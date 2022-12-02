import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from "./Home";
import Demo from "./Demo";
import PopUp from "./Help";
import "./Navbar.css"

class App extends Component{
  constructor(props){
    super(); 
    this.state = {
      popUp: false,
    }
  }

  isClicked = (event) =>{
    console.log(this.state.popUp)
    this.state.popUp = !this.state.popUp; 
    this.setState(prevState => ({
      ...prevState,
      moveKey: this.state.popUp,
    }))

  }

    render(){
        return(
            <Router>
            <nav>
                <div>
                  <Link to = "/interactive_grid">
                        Home 
                  </Link>
                  <Link to = "/Demo">
                        Demo 
                  </Link>
                </div>
                <div onClick = {this.isClicked}>
                      Help
                </div>
            </nav>
            {this.state.popUp ? <div onClick = {this.isClicked} className = "background"><PopUp/></div>
              : <div/>}
            <Routes>
                <Route exact path='/interactive_grid' element={<Home/>}></Route>
                <Route exact path='/Demo' element={<Demo clicked = {this.state.popUp} handleClicked = {this.isClicked}/>}></Route>
            </Routes>
            </Router>
        )
    } 
}

export default App; 