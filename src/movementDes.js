import React from "react"; 
import "./description.css"

function MovementDes(props){
    return(
        <div>
            {(props.movementDes == 0)?(
                <p>
                    This is the traditional method of interacting with a computer screen — keyboard interactions. <br/><br/>
                    However, keyboards are not the most accessible mode of interaction—for those with disabilities
                    hindering finger mobility, typing is an impossible task. 
                </p>
            ):(props.movementDes == 1)?(
                 <p>
                     This interaction looks at how to utilize facial motion to control movement on the screen <br/><br/>
                     Try to move around the grid using your face. <br/><br/>
                     Turn your head left and right to move left and right.<br/><br/>
                     Tilt your head up to move up. <br/><br/>
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