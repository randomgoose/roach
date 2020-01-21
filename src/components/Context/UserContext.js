import React from 'react';
const { Provider, Consumer } = new React.createContext();

class UserContextProvider extends React.Component {
    state = {
        isLoggedIn: false,
        id: "",
        documents: []
    };

    login = (username, password) => {
        fetch("http://localhost:8080/login", { username, password }, { method: "POST", credentials: "include" })
            .then((response) => {
                return response.json();
            })
            .then((user) => {
                this.setState({
                    isLoggedIn: true,
                    id: user.id,
                    documents: user.documents
                })
            })
            .catch((err) => {
                return err;
            });
    }


    logout = () => {
        fetch("http://localhost:8080/logout", { method: "GET", credentials: "include"})
        .then(response => {
            this.setState({
                isLoggedIn: false
            })
            return response.json();
        })
        .catch(err => {
            return err;
        });
    }

    auth = () => {
        fetch("http://localhost:8080/auth", { method: "GET", credentials: "include" })
			.then((response) => {
				return response.json();
			})
			.then((user) => {
                if (user) {
                    this.setState({
                        isLoggedIn: true,
                        id: user.id,
                        documents: user.documents
                    });    
                } else {
                    this.setState({
                        isLoggedIn: false,
                        id: "",
                        documents: []
                    })
                }
				
			})
			.catch((err) => {
				return err;
			});
    }

    render() {
        return (
            <Provider>
                {this.props.children}
            </Provider>)
    }
}

export { UserContextProvider, Consumer as UserContextConsumer }