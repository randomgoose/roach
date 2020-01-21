import React from 'react';
import Editor, { defaultText } from './components/Editor';
import ToolBar from './components/ToolBar';
import SideBar from './components/SideBar';
import WordCounter from './components/WordCounter';
import Preview from './components/Preview';
import { jsPDF } from 'jspdf';
import { LoginContext } from './components/LoginContext';
import './App.css';
import './style.css'

const axios = require('axios');
axios.defaults.withCredentials = true;

class App extends React.Component {
		state = {
			textToRender: defaultText,
			wordsNum: defaultText.match(/\b[-?(\w+)?]+\b/gi).length,
			linesNum: defaultText.split('\n').length,
			sideBarCollapsed: true,
			isLoggedIn: false,
			loggedUser: '?'
		}

	componentDidMount() {
	}

	changeTheme = (event) => {
		let currentThemeLink = document.getElementById("theme");
		currentThemeLink.setAttribute('href', './themes/' + event.target.value.toLowerCase() + '.css');
		console.log(currentThemeLink);
	}

	exportPDF = () => {
		let doc = new jsPDF();
		doc.text('Hello world!', 10, 10);
		doc.save('a4.pdf');
	}

	toggleSideBar = () => {
		this.setState({
			sideBarCollapsed: !this.state.sideBarCollapsed
		});
		// console.log(this.state.sideBarCollapsed);
	}

	toggleLogin = () => {
		this.setState({
			isLoggedIn: !this.state.isLoggedIn
		});
		// console.log(this.state.sideBarCollapsed);
	}

	updateText = text => {
		this.setState({
			textToRender: text.text,
			wordsNum: text.wordsNum,
			linesNum: text.linesNum
		});
		// console.log(this.state.linesNum);
	};

	logout = () => {
        fetch("http://localhost:8080/logout", { method: "GET", credentials: "include" })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                return err;
            });
    }

	render() {
		return (
			<div id='container'>
				<ToolBar changeTheme={this.changeTheme}
					exportPDF={this.exportPDF}
					updateText={this.updateText}
					toggleSideBar={this.toggleSideBar}
					collapsed={this.state.sideBarCollapsed} />
				<LoginContext.Provider value={{ isLoggedIn: this.state.isLoggedIn, toggleLogin: this.toggleLogin, logout: this.logout, loggedUser: this.state.loggedUser}}>
					<SideBar isLoggedIn={this.state.isLoggedIn} collapsed={this.state.sideBarCollapsed} updateText={this.updateText} />
				</LoginContext.Provider>
				<Editor updateText={this.updateText} />
				<Preview textToRender={this.state.textToRender} />
				<WordCounter wordsNum={this.state.wordsNum} linesNum={this.state.linesNum} />
			</div>
		)
	}
}

export default App;