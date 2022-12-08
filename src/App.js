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

//app class: creates Navar and renders out page clicked 
class App extends Component{
  constructor(props){
    super(); 
    this.state = {
      popUp: false,
    }
  }

  //if help is clicked 
  popupIsClicked = (event) =>{
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
                <div onClick = {this.popupIsClicked}>
                  <a>
                      Help
                  </a>
                </div>
            </nav>
            {this.state.popUp ? <div onClick = {this.popupIsClicked} className = "background"><PopUp onClick = {this.popupIsClicked}/></div>
              : <div/>}
            <Routes>
                <Route exact path='/interactive_grid' element={<Home/>}></Route>
                <Route exact path='/Demo' element={<Demo clicked = {this.state.popUp} handleClicked = {this.popupIsClicked}/>}></Route>
            </Routes>
            </Router>
        )
    } 
}

export default App; 