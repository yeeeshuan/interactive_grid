import React from "react"; 
import "./description.css"

function MovementDes(props){
    return(
        <div>
            {(props.movementDes == 0)?(
                <p>
                    Keyboard interactions are the traditional method of interacting with a computer screen. <br/><br/>
                    However, for those with disabilities hindering finger mobility, keyboards are not an accessible mode of interaction.
                    <br/>
                    <p className = "directions">
                        Directions:<br/>
                    </p>
                    Use the arrow keys to navigate the grid. 

                </p>
            ):(props.movementDes == 1)?(
                 <p>
                     This interaction looks at how to utilize facial motion to control movement on the screen. 
                     <br/>
                     <br/>
                     The ML5.js Facemesh Library allows for facial landmark detection. 
                     <p className = "directions">
                        Directions:<br/>
                    </p>
                     Turn your head left and right to move left and right.<br/>
                     Tilt your head up to move up. <br/>
                     Open your mouth to move down. 
                </p>
                 ):(
                     <p>

                     </p>
                 )}
        </div>
    )
}

export default MovementDes