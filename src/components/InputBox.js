import React from 'react'
import "./InputBox.css"

function InputBox (props) {

    let { value, type, handler } = props

    return (
        <div className="InputBox">
            <div className="formGroup field">
                <input value={value}
                    name={type}
                    id={type}
                    className="formField"
                    type={type}
                    placeholder={type[0].toUpperCase() + type.slice(1)}
                    onChange={handler}
                    autoComplete="off"
                    required></input>
                <label className="formLabel" htmlFor={type}>{type[0].toUpperCase() + type.slice(1)}</label>
            </div>
        </div>
    )

}

export default InputBox