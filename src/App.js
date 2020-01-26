import React from 'react';
import Editor from './components/Editor';
import ToolBar from './components/ToolBar';
import SideBar from './components/SideBar';
import WordCounter from './components/WordCounter';
import Preview from './components/Preview';
import { jsPDF } from 'jspdf';
import './App.css';
import './style.css'
import { UserContextConsumer, UserContextProvider, auth } from './components/Context/UserContext';
import { DocumentContextProvider, DocumentContextConsumer } from './components/Context/DocumentContext';

class App extends React.Component {
		state = {
			// textToRender: defaultText,
			// wordsNum: defaultText.match(/\b[-?(\w+)?]+\b/gi).length,
			// linesNum: defaultText.split('\n').length,
			sideBarCollapsed: true,
		}

	componentDidMount() {
		auth();
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
			// wordsNum: text.wordsNum,
			// linesNum: text.linesNum
		});
		// console.log(this.state.linesNum);
	};

	render() {
		return (
			<div id='container'>
				<ToolBar changeTheme={this.changeTheme}
					exportPDF={this.exportPDF}
					updateText={this.updateText}
					toggleSideBar={this.toggleSideBar}
					collapsed={this.state.sideBarCollapsed} />
				<UserContextConsumer>
					{ UserContext => (
						<SideBar isLoggedIn={UserContext.isLoggedIn} collapsed={this.state.sideBarCollapsed} updateText={this.updateText} />
					)}
				</UserContextConsumer>
				<DocumentContextConsumer>
					{ DocumentContext => (
						<React.Fragment>
							<Editor updateText={DocumentContext.updateText} rawText={DocumentContext.rawText}/>
							<Preview textToRender={DocumentContext.rawText}/>
							<WordCounter wordsNum={DocumentContext.wordsNum} linesNum={DocumentContext.linesNum} />
						</React.Fragment>
					) }
				</DocumentContextConsumer>
			</div>
		)
	}
}

export default App;