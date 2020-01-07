import React, { Component } from 'react';
import { LoginContext } from './LoginContext';
const axios = require('axios');
axios.defaults.withCredentials = true;

class Login extends Component {
    static contextType = LoginContext;
    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }

    componentDidMount(){
        // const user = localStorage.getItem('loggedUser');
        axios.post('http://localhost:5000/authrequired', {
            id: localStorage.getItem('loggedUser')
        }, { withCredentials: true})
        .then((response) => {
            if (response.data.isLoggedIn === true) {
                this.props.updateFileList(response.data.documents);
                this.context.toggleLogin();
            }
            alert(localStorage.getItem('loggedUser'));
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    login = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/login', {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }, { withCredentials: true })
        .then((response) => {
            if(response){
                console.log(response);
                this.props.updateFileList(response.data.documents);
                localStorage.setItem('loggedUser', response.data.id);
                this.context.toggleLogin();
                // console.log(response.data.documents);
            }
            else{
                console.log('not authenticated');
            }
        })
        .catch((err) => {
            console.log(err);
        })
        // this.context.toggleLogin();
    }

    render(){
        return(
            <div>
                <form action="http://localhost:5000/login" method="POST">
                    <div>Log in see your library!</div>
                    <div>Username: </div>
                    <input name="username" id="username"></input>
                    <div>Password: </div>
                    <input name="password" id="password" type="password"></input>
                    <br></br>
                    <input type="submit" onClick={this.login}></input>
                </form>
            </div>
        )
    }
}

export default Login;