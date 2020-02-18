import React from 'react'
import "./Button.css"

function Button(props) {    
    let {handler, name, type}= props;

    return(
        <button className={"Button " + type} onClick={handler}>{name}</button>
    )
}

export default Button