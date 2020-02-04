import React, { Component } from 'react';
import { UserContextConsumer } from './Context/UserContext';
import './Login.css';

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
                            <div className="Header">Welcome back!</div>
                            <div className="Text">Log in to use your library!</div>
                            <div className="formGroup field">
                                <input value={this.state.username}
                                    name="username"
                                    id="username"
                                    className="formField"
                                    placeholder="Username"
                                    onChange={this.changeHandler}
                                    autoComplete="off"
                                    required></input>
                                <label className="formLabel" htmlFor="username">Username</label>

                            </div>
                            <div className="formGroup field">
                                <input value={this.state.password}
                                    name="password"
                                    id="password"
                                    type="password"
                                    className="formField"
                                    placeholder="Password"
                                    onChange={this.changeHandler}
                                    required></input>
                                <label className="formLabel" htmlFor="password">Password</label>
                            </div>
                            <br></br>
                            <button className="mainButton" onClick={(e) => { e.preventDefault(); context.login(username, password) }}>LOGIN</button>
                            <div className="Text">OR</div>
                            <a href={context.signup}>Create a new account</a>
                            {/* <a href="http://localhost:8080/signup">Create a new account</a> */}
                        </form>
                    </div>
                )}
            </UserContextConsumer>
        )
    }
}

export default Login;