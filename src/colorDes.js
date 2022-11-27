import React from "react"; 
import "./description.css"

function ColorDes(props){
    return(
        <div>
            {(props.colorDes == 0)?(
                <p>
                    Keyboard interactions are the traditional method of interacting with a computer screen. <br/><br/>
                    However, for those with disabilities hindering finger mobility, keyboards are not an accessible mode of interaction.<br/>
                    <p className = "directions">
                        Directions:<br/>
                    </p>
                    Use numbers keys 1,2,3 to assign color. Use the space bar to delete. 
                </p>
            ):(props.colorDes == 1)?(
                <p>
                    This interaction looks at how to use the number of fingers held up to set a color.<br/>
                    <p className = "directions">
                        Directions:<br/>
                    </p>
                    Hold up one finger for color one, <br/><br/>
                    Two fingers for color two, <br/><br/>
                    Three fingers for color three, <br/><br/>
                    Four fingers to delete the color <br/>

                </p>
            
            ):(props.colorDes == 2)?(
                <p>
                    This interaction looks at how assign different objects to interactions with the computer <br/>
                    <p className = "directions">
                        Directions:<br/>
                    </p>
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