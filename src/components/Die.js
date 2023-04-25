import React from "react";


export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "green" : "white" 
    }
    return (
        <div 
        className="die" 
        style={styles}
        onClick={props.holdDie}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}