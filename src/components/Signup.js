import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { login } from "./Context/UserContext"
import InputBox, { inputBox } from "./InputBox"
import Button from "./Button"
import "./Signup.css"

function Signup () {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function changeHandler(e) {
        switch(e.target.name) {
            case "username":
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:

        }
    }

    function submitHandler(e) {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({ "username": username, "password": password })

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'cors',
            credentials: 'include'
        };

        fetch("http://localhost:8080/signup", requestOptions)
            .then(response => response.json())
            .then(user => login(user.username, user.password) )
            .then(() => {history.replace("/")})
            .catch(error => console.log('error', error));   
        
    }

    return (
        <div className="container">
            <div className="Signup">
                <h1>
                    Create Account
                </h1>
                <form>
                    <InputBox value={username} type={"username"} handler={changeHandler}></InputBox>
                    <InputBox value={password} type={"password"} handler={changeHandler}></InputBox>
                    <Button handler={submitHandler} name={"Sign Up"} type={"Primary"}/>
                    <Button handler={ () => {history.replace("/")} } type={"Seconardy"} name={"Back"} />
                </form>
            </div>
        </div>
    )
}

export default Signup;