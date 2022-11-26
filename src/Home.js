import React from 'react';
import HomeGrid from './homeSketch';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
import "./App.css"
import Demo from './Demo';
  
function Home () {
    return(
         <div className = "home">
            <h1 className = "home"> Interactive Grid </h1>
            <p className = "homeDesTitle">
                How can we move past using a keyboard and mouse to talk to a computer? 
            </p>
            <p className = "homeDes">
                This is the basic question driving the Interative Grid project. 
                Using ML libraries such as ML5.js and the Google Teachable Machine, 
                the Interative Grid project serves as a fun and informative way to interact with 
                various experimental methods of designing for accessbility, using only users&lsquo; hands and face to 
                control how to move around and assign color to a 20X20 grid. 
            </p>
                <Link to = "/Demo">
                <p className = "homeLink"> Demo </p>
                </Link>
                <Routes>
                    <Route exact path='/Demo' element={< Demo />}></Route>
                </Routes>
            <HomeGrid/>
        </div>
    )
}
  
export default Home;