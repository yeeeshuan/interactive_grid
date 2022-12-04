import React from "react";
import "./description.css"; 

function Instructions(props){
    return (
        <div>
            {(props.moveKey == 1 && props.type == "M")?(
                <div className = "popUp" onClick = {props.handleClicked}>
                        <p className = "popUpTitle">
                            Face
                        </p>
                            <p className = "popUpText">
                                This interaction looks at how to utilize facial motion to control movement on the screen. 
                                <br/>
                                <br/>
                                The ML5.js Facemesh Library allows for facial landmark detection. 
                            </p>
                            <p className = "bold">
                                Directions:<br/>
                            </p>
                            <p className = "directions">
                                Turn your head left and right to move left and right.<br/><br/>
                                Tilt your head up to move up. <br/><br/>
                                Open your mouth to move down. 
                            </p>
                            <br/>
                            <br/>
                            
                </div>
            ):(props.moveKey == 2 && props.type == "M")?(
                <div className = "popUp" onClick = {props.handleClicked}>
                    <p className = "popUpTitle">
                        Sound 
                    </p>
                        <p className = "popUpText">
                            This interaction looks at how to utilize sound to control movement on the screen. 
                            <br/>
                            <br/>
                            The Google Teachable Machine allows for audio recognition ML model training. 
                        </p>
                        <p className = "bold">
                            Directions:<br/>
                        </p>
                        <p className = "directions">
                            Clap, crinkle a piece of paper, or knock on your desk three times to assign a color to different modules.<br/><br/>
                        </p>
                    
            </div>
            ):(props.colorKey == 1 && props.type == "C")?(
                <div className = "popUp" onClick = {props.handleClicked}>
                    <p className = "popUpTitle">
                        Hand 
                    </p>
                        <p className = "popUpText">
                            This interaction looks at how to connect hand gestures to interactions with the computer.
                            <br/>
                            <br/>
                            The ML5.js Handpose Library allows for hand landmark detection.
                        </p>
                        <p className = "bold">
                            Directions:<br/>
                        </p>
                        <p className = "directions">
                            Hold up one finger for color one, <br/><br/>
                            Two fingers for color two, <br/><br/>
                            Three fingers for color three, <br/><br/>
                            Four fingers to delete the color <br/>
                        </p>
                        <br/>
                        <br/>
            </div>
            )
            :(props.colorKey == 2 && props.type == "C")?(
                <div className = "popUp" onClick = {props.handleClicked}>
                    <p className = "popUpTitle">
                        Object
                    </p>
                        <p className = "popUpText">
                        This interaction looks at how assign different objects to interactions with the computer <br/>
                            <br/>
                            The ML5.js ObjectDetector Library allows for object detection.
                        </p>
                        <p className = "bold">
                            Directions:<br/>
                        </p>
                        <p className = "directions">
                        Hold up different objects to your camera. In the text below the grid, you will see objects
                        being matched different colors.  <br/><br/>
                        Hold up the objects again to assign a color to different modules. 
                        </p>
                        <br/>
                        <br/>
                        
            </div>
            )
            :(props.colorKey == 3 && props.type == "C")?(
                <div className = "popUp" onClick = {props.handleClicked}>
                    <p className = "popUpTitle">
                        Sound
                    </p>
                        <p className = "popUpText">
                        This interaction looks at how to connect sounds to interactions with the computer <br/>
                            <br/>
                            The Google Teachable Machine allows for audio recognition ML model training. 
                        </p>
                        <p className = "bold">
                            Directions:<br/>
                        </p>
                        <p className = "directions">
                        Clap, crinkle a piece of paper, or knock on your desk three times to assign a color to different modules.<br/><br/>
                        </p>
                        <br/>
                        <br/>
            </div>
            )
            :(<div/>)}
        </div>
        )
    }


export default Instructions; 