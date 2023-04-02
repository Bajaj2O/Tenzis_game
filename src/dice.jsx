import React from "react";

export default function Dice(props) {
    const styles =
                { backgroundColor: props.isHeld ? "#12e03f" : "black" };


    return (
        <span className="dice" >
            <button style={styles} onClick={props.holdDie}>
                {props.value}
            </button>
        </span>
    )
}