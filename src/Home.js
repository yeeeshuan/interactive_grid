import React from 'react';
import HomeGrid from './homeSketch';
import { useMediaQuery } from 'react-responsive';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from 'react-router-dom';
import "./App.css"
import Demo from './Demo';


//homepage 
const Home = () => {

    return(
         <div className = "home">
            <h1 className = "homeTitle"> Interactive Grid </h1>
            <p className = "homeDesQuestion">
                How can we move past using a keyboard to talk to a computer? 
            </p>
            <p className = "homeDesBody">
                This is the basic question driving the Interative Grid project. 
                Using ML libraries such as ML5.js and the Google Teachable Machine, 
                the Interative Grid project serves as a fun way to interact with 
                various experimental methods of designing for accessbility, using only users&lsquo; hands and face and 
                objects around them to control how to move around and assign color to a 20X20 grid. 
                <br/>
                <br/>
                The goal of this project is to help designers learn more about various alternative methods to interact with the computer 
                and provide insights to the ML libraries and tools available to create such interactions. 
                
            </p>
            <div className = "homeBlock">
                <div className = "child">
                    <Link to = "/Demo">
                    <p className = "homeLink"> Demo </p>
                    </Link>
                </div>
                <div className = "child">
                    <a href =  "https://github.com/yeeeshuan/interactive_grid">
                        <p className = "homeLink"> Github </p>
                    </a>
                </div>
            </div>
                <Routes>
                    <Route exact path='/Demo' element={< Demo />}></Route>
                </Routes>
            <HomeGrid/>
        </div>
    )
}
  
export default Home;