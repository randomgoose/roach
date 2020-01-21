import React, { Component } from 'react';
import { UserContextConsumer } from './Context/UserContext';
import './Login.css';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        const { username, password } = this.state;
        return(
            <UserContextConsumer>
                { context => (
                    <div className='Login'>
                    <form>
                        <div>Log in see your library!</div>
                        <div className="formGroup field">
                            <input value={this.state.username} name="username" id="username" className="formField" placeholder="Username" onChange={this.changeHandler} required></input>
                            <label className="formLabel" htmlFor="username">Username</label>
                            
                        </div>
                        <div className="formGroup field">
                            <input value={this.state.password} name="password" id="password" type="password" className="formField" placeholder="Password" onChange={this.changeHandler} required></input>
                            <label className="formLabel" htmlFor="password">Password</label>
                        </div>
                        <br></br>
                        <button onClick={(e) => {e.preventDefault(); context.login(username, password)}}></button>
                        {/* <a href="http://localhost:8080/signup">Create a new account</a> */}
                    </form>
                </div>
                )}
            </UserContextConsumer>    
        )
    }
}

export default Login;