import React from "react";
import "./description.css"; 

//helper popup 
function PopUp(props){
    return (
        <div className = "popUp" onClick = {props.handleClicked}>
            <p className = "popUpText" >
                <p className = "popUpTitle">
                    Help
                </p>
                    To understand how to use a movement or color assigning interaction, first use the interaction paired with the default keyboard. 
                    For example, if exploring with a movement interaction, first use the keyboard to assign color to the individual modules before moving on to 
                    other interactions. Have fun experimenting with different combinations! 
            </p>
        </div>
    )
}

export default PopUp; 