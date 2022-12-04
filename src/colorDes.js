import React from "react"; 
import "./description.css"

function ColorDes(props){
    return(
        <div>
            {(props.colorDes == 0)?(
                <div>
                <p>
                    Keyboard interactions are the traditional method of interacting with a computer screen. <br/><br/>
                    However, for those with disabilities hindering finger mobility, keyboards are not an accessible mode of interaction.<br/>
                </p>
                    <p className = "bold">
                        Directions:<br/>
                    </p>
                <p className = "instructions">
                    Use numbers keys 1,2,3 to assign color. Use the space bar to delete. 
                </p>
                </div>
            ):(props.colorDes == 1)?(
                <div>
                <p>
                    This interaction looks at how to connect hand gestures to interactions with the computer.<br/><br/>
                    The ML5.js Handpose Library allows for hand landmark detection. <br/>
                </p>
                    <p className = "bold">
                        Directions:<br/>
                    </p>
                <p className = "instructions ">
                    Hold up one finger for color one, <br/><br/>
                    Two fingers for color two, <br/><br/>
                    Three fingers for color three, <br/><br/>
                    Four fingers to delete the color <br/>

                </p>
                </div>
            
            ):(props.colorDes == 2)?(
                <div>
                <p>
                    This interaction looks at how assign different objects to interactions with the computer <br/><br/>
                    The ML5 
                </p>
                    <p className = "bold">
                        Directions:<br/>
                    </p>
                <p className = "instructions">
                    Hold up different objects to your camera. In the text below the grid, you will see objects
                    being matched different colors.  <br/><br/>
                    Hold up the objects again to assign a color to different modules. 
                </p>
                </div>

            ):(props.colorDes == 3)?(
                <div>
                <p>
                    This interaction looks at how to connect sounds to interactions with the computer <br/>
                    <br/>
                    The Google Teachable Machine allows for audio recognition ML model training. 
                </p>
                    <p className = "bold">
                        Directions:<br/>
                    </p>
                <p className = "instructions">
                    Clap, crinkle a piece of paper, or knock on your desk three times to assign a color to different modules.<br/><br/>
                </p>
                </div>

            ):(
    
                <p>

                </p>

            )}
        </div>
    )
}

export default ColorDes