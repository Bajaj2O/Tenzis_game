import React from "react";

export default function Dice(props) {
    const styles =
                { backgroundColor: props.isHeld ? "green" : "auto" };


    return (
        <span className="dice" >
            <button style={styles} onClick={props.holdDie}>
                {props.value}
            </button>
        </span>
    )
}