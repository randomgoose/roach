import React from 'react';
const { Provider, Consumer } = new React.createContext();
const axios = require('axios');
let auth;

class UserContextProvider extends React.Component {
    state = {
        isLoggedIn: false,
        id: "",
        documents: []
    };

    login = (username, password) => {
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

        fetch("http://localhost:8080/login", requestOptions)
            .then(response => response.json())
            .then(user => {
                this.setState({
                    isLoggedIn: true,
                    id: user._id,
                    documents: user.documents
                });
                console.log(user);
            })
            .catch(error => console.log('error', error));
    }


    logout = () => {
        fetch("http://localhost:8080/logout", { method: "GET", credentials: "include" })
            .then(response => {
                this.setState({
                    isLoggedIn: false,
                    documents: [],
                    id: ""
                })
                return response.json();
            })
            .catch(err => {
                return err;
            });
    }

    auth = () => {
        let myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
            credentials: "include"
        };

        fetch("http://localhost:8080/auth", requestOptions)
            .then(response => response.json())
            .then(user => {
                if (user.isLoggedIn) {
                    this.setState({
                        isLoggedIn: true,
                        id: user.id,
                        documents: user.documents
                    });
                }
                else {
                    this.setState({
                        isLoggedIn: false,
                        id: "",
                        documents: []
                    })
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        const context = this.state;
        auth = this.auth;
        return (
            <Provider value={{ isLoggedIn: context.isLoggedIn, id: context.id, documents: context.documents, login: this.login, logout: this.logout, auth: this.auth }}>
                {this.props.children}
            </Provider>)
    }
}

export { UserContextProvider, Consumer as UserContextConsumer, auth }