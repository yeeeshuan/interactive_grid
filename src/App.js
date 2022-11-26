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
                  <Link to = "/">
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
            {this.state.popUp ? <PopUp/>
              : <div/>}
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/Demo' element={< Demo clicked = {this.state.popUp}/>}></Route>
            </Routes>
            </Router>

        )
    } 
}

export default App; 