import React from "react"; 
import "./description.css"

function ColorDes(props){
    return(
        <div>
            {(props.colorDes == 0)?(
                <p >
                    This is the traditional method of interacting with a computer screen — keyboard interactions. <br/><br/>
                    However, keyboards are not the most accessible mode of interaction—for those with disabilities
                    hindering finger mobility, typing is an impossible task. 

                </p>
            ):(props.colorDes == 1)?(
                <p>
                    This interaction looks at how to use the number of fingers held up to set a color.<br/><br/>
                    The number of fingers you hold up corresponds to the color you assign to the grid: <br/><br/>
                    Hold up one finger for color one <br/>
                    two fingers for color two <br/>
                    three fingers for color three <br/>
                    and four fingers to delete the color <br/>

                </p>
            
            ):(props.colorDes == 2)?(
                <p>
                    This interaction looks at how assign different objects to interactions with the computer <br/><br/>
                    Hold up different objects to your camera. In the text below the grid, you will see objects
                    being matched different colors.  <br/><br/>
                    Hold up the objects again to assign a color to different modules. 
                </p>
            ):(
    
                <p>

                </p>

            )}
        </div>
    )
}

export default ColorDes