import React from "react"; 
import "./description.css"

function MovementDes(props){
    return(
        <div>
            {(props.movementDes == 0)?(
                <div>
                    <p>
                    Keyboard interactions are the traditional method of interacting with a computer screen. <br/><br/>
                    However, for those with disabilities hindering finger mobility, keyboards are not an accessible mode of interaction.
                    </p>
                    <p className = "bold">
                        Directions:<br/>
                    </p>
                    <p className = "instructions">
                    Use the arrow keys to navigate the grid. 
                    </p>
                </div>

            ):(props.movementDes == 1)?(
                <div>
                    <p>
                        This interaction looks at how to utilize facial motion to control movement on the screen. 
                        <br/>
                        <br/>
                        The ML5.js Facemesh Library allows for facial landmark detection. 
                     </p>
                     <p className = "bold">
                        Directions:<br/>
                    </p>
                    <p className = "instructions">
                        Turn your head left and right to move left and right.<br/><br/>
                        Tilt your head up to move up. <br/><br/>
                        Open your mouth to move down. 
                    </p>
                </div>
            ):(props.movementDes == 2)?(
                <div>
                    <p>
                        This interaction looks at how to utilize language recognition to control movement on the screen. 
                        <br/>
                        <br/>
                        The Google Teachable Machine allows for audio recognition ML model training. 
                    </p>
                    <p className = "bold">
                        Directions:<br/>
                    </p>
                    <p className = "instructions">
                        Say left, right, up, down to navigate the grid. 
                    </p>
                </div>
            ):(
                     <p>

                     </p>
                 )}
        </div>
    )
}

export default MovementDes