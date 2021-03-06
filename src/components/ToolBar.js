import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUndo, faRedo, faBold, faItalic, faStrikethrough, faSave, faFileExport, faQuoteLeft, faList, faListOl } from '@fortawesome/free-solid-svg-icons';
import { DocumentContextConsumer } from './Context/DocumentContext';


String.prototype.insertAt = function (index, string) {
	return this.substring(0, index) + string + this.substring(index);
};

class ToolBar extends Component {
	constructor(props) {
		super(props);
		this.setItalic = this.setItalic.bind(this);
		this.setBold = this.setBold.bind(this);
		this.setStrike = this.setStrike.bind(this);
		// this.toggleSideBar = this.toggleSideBar.bind(this);

		this.state = {
			sideBarCollapsed: true
		}
	}

	static getDerivedStateFromProps(props, state) {
		return {
			sideBarCollapsed: props.collapsed
		}
	}

	setItalic() {
		let editor = document.getElementById('editor');
		let selectionStart = editor.selectionStart;
		let selectionEnd = editor.selectionEnd;

		editor.value = editor.value.insertAt(selectionStart, '*').insertAt(selectionEnd + 1, '*');

		editor.focus();
		editor.setSelectionRange(selectionStart, selectionEnd + 2);

		this.props.updateText({
			text: editor.value
		});


	}

	setBold() {
		let editor = document.getElementById('editor');
		let selectionStart = editor.selectionStart;
		let selectionEnd = editor.selectionEnd;

		editor.value = editor.value.insertAt(editor.selectionStart, '**').insertAt(editor.selectionEnd + 2, '**');

		editor.focus();
		editor.setSelectionRange(selectionStart, selectionEnd + 4);

		this.props.updateText({
			text: editor.value
			// wordsNum: 
		});
	}

	setStrike() {

	}

	addFile() {
		let dateCreated = new Date();
	}

	saveFile() {

	}

	// saveDocument() {
	// 	fetch('/save', {
	// 		method: 'POST',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify({
	// 			content: document.getElementById('editor').value,
	// 			author: 'Random'
	// 		})
	// 	}).then(r => r.json());
	// }

	render() {
		// console.log(this.state.sideBarCollapsed);
		let menuIcon;

		if (this.state.sideBarCollapsed) {
			console.log(this.state.sideBarCollapsed);
			menuIcon = <FontAwesomeIcon icon={faBars} size="lg" />;
		} else {
			menuIcon = <FontAwesomeIcon icon={faTimes} size="lg" />;
		}

		return (
			<DocumentContextConsumer>
				{DocumentContext => (
					<div id="toolBar">
						<button className='btn' id='menu' onClick={this.props.toggleSideBar}>{menuIcon}</button>
						<button className='btn' id='undo' onClick={() => {DocumentContext.undo();}}><FontAwesomeIcon icon={faUndo} size="lg" /></button>
						<button className='btn' id='redo' onClick={() => {DocumentContext.redo();}}><FontAwesomeIcon icon={faRedo} size="lg" /></button>
						<button className='btn' id='bold' onClick={() => DocumentContext.setStyle("bold")}><FontAwesomeIcon icon={faBold} size="lg" /></button>
						<button className='btn' id='italic' onClick={() => DocumentContext.setStyle("italic")}><FontAwesomeIcon icon={faItalic} size="lg" /></button>
						<button className='btn' id='strike' onClick={() => DocumentContext.setStyle("strikethrough")}><FontAwesomeIcon icon={faStrikethrough} size="lg" /></button>
						<button className='btn' id='quote' onClick={() => DocumentContext.setStyle("quote")}><FontAwesomeIcon icon={faQuoteLeft} size="lg" /></button>
						<button className='btn' id='unorderedList' onClick={() => DocumentContext.setStyle("unorderedList")}><FontAwesomeIcon icon={faList} size="lg" /></button>
						<button className='btn' id='orderedList' onClick={() => DocumentContext.setStyle("orderedList")}><FontAwesomeIcon icon={faListOl} size="lg" /></button>
						<button className='btn' id='save' onClick={DocumentContext.saveDocument}><FontAwesomeIcon icon={faSave} size="lg" /></button>
						<button className='btn' id='export' onClick={this.props.exportPDF} ><FontAwesomeIcon icon={faFileExport} size="lg" /></button>
						<select id='theme' onChange={this.props.changeTheme}>
							<option value='Github'>Github</option>
							<option value='Gothic'>Gothic</option>
							<option value='Newsprint'>Newsprint</option>
							<option value='Night'>Night</option>
						</select>
					</div>
				)}
			</DocumentContextConsumer>
		);
	}


}

export default ToolBar;