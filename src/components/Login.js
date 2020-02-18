import React, { Component } from 'react';
import { UserContextConsumer } from './Context/UserContext';
import { Route, Switch, Link } from 'react-router-dom';
import './Login.css';
import Button from "./Button"
import InputBox from "./InputBox"

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const { username, password } = this.state;
        return (
            <UserContextConsumer>
                {context => (
                    <div className='Login'>
                        <form>
                            <h3 className="Header">Welcome back!</h3>
                            <p className="Text">Log in to use your library!</p>

                            <InputBox value={this.state.username} type={"username"} handler={this.changeHandler}></InputBox>
                            <InputBox value={this.state.password} type={"password"} handler={this.changeHandler}></InputBox>

                            <Button handler={(e) => { e.preventDefault(); context.login(username, password) }} type={"Primary"} name="LOGIN"/>
                            <p className="Text Center">OR</p>
                            {/* <a href={context.signup}>Create a new account</a> */}
                            {/* <a href="http://localhost:8080/signup">Create a new account</a> */}
                            <Link to="/signup">Create a new account</Link>
                        </form>
                    </div>
                )}
            </UserContextConsumer>
        )
    }
}

export default Login;