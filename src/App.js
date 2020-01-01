import React from 'react';
import logo from './logo.svg';
import Editor,  { defaultText } from './components/Editor';
import ToolBar from './components/ToolBar';
import SideBar from './components/SideBar';
import WordCounter from './components/WordCounter';
import Preview from './components/Preview';
import { jsPDF } from 'jspdf';
import './App.css';
import './style.css'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textToRender: defaultText,
			wordsNum: defaultText.match(/\b[-?(\w+)?]+\b/gi).length,
			linesNum: defaultText.split('\n').length,
			sideBarCollapsed: true,
			loggedIn: false
		}
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

	updateText = text => {
		this.setState({
			textToRender: text.text,
			wordsNum: text.wordsNum,
			linesNum: text.linesNum
		});
		// console.log(this.state.linesNum);
	};
	
	render(){
		return(
			<div id='container'>
        <ToolBar changeTheme = {this.changeTheme} 
                 exportPDF = {this.exportPDF}
                 updateText = {this.updateText}
                 toggleSideBar = {this.toggleSideBar}
                 collapsed = {this.state.sideBarCollapsed} />
				<SideBar collapsed = {this.state.sideBarCollapsed} updateText = {this.updateText}/>
				<Editor updateText = {this.updateText} />
				<Preview textToRender = {this.state.textToRender} />
				<WordCounter wordsNum = {this.state.wordsNum} linesNum = {this.state.linesNum} />
			</div>
		)
	}
}

export default App;
