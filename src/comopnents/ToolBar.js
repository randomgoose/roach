import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUndo, faRedo, faBold, faItalic, faStrikethrough, faSave, faFileExport } from '@fortawesome/free-solid-svg-icons';


String.prototype.insertAt = function(index, string){
	return this.substring(0, index) + string + this.substring(index);
};

class ToolBar extends Component {
	constructor(props) {
		super(props);
		this.setItalic = this.setItalic.bind(this);
		this.setBold = this.setBold.bind(this);
		this.saveDocument = this.saveDocument.bind(this);
		this.setStrike = this.setStrike.bind(this);
		// this.toggleSideBar = this.toggleSideBar.bind(this);

		this.state = {
			sideBarCollapsed: true
		}
	}

	static getDerivedStateFromProps(props, state){
		return {
			sideBarCollapsed: props.collapsed
		}
	}

	setItalic(){
		let editor = document.getElementById('editor');
		let selectionStart = editor.selectionStart;
		let selectionEnd = editor.selectionEnd;

		editor.value = editor.value.insertAt(selectionStart, '*').insertAt(selectionEnd + 1, '*');

		editor.focus();
		editor.setSelectionRange(selectionStart, selectionEnd+2);

		this.props.updateText({
			text: editor.value
		});
	
		
		// alert(editor.selectionStart + 'to' + editor.selectionEnd);
		
	}

	setBold(){
		let editor = document.getElementById('editor');
		let selectionStart = editor.selectionStart;
		let selectionEnd = editor.selectionEnd;

		editor.value = editor.value.insertAt(editor.selectionStart, '**').insertAt(editor.selectionEnd + 2, '**');

		editor.focus();
		editor.setSelectionRange(selectionStart, selectionEnd+4);

		this.props.updateText({
			text: editor.value
			// wordsNum: 
		});
	}

	setStrike() {
		
	}

	saveDocument(){
		fetch('/save', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: document.getElementById('editor').value,
				author: 'Random'
			})
		}).then(r => r.json());
	}

	render(){
		// console.log(this.state.sideBarCollapsed);
		let menuIcon;

		if (this.state.sideBarCollapsed){
			console.log(this.state.sideBarCollapsed);
			menuIcon = <FontAwesomeIcon icon={faBars} />;
		} else {
			menuIcon = <FontAwesomeIcon icon={faTimes} />;
		}

		return(
		<div id="toolBar"> 
			<button className='btn' id='menu' onClick={this.props.toggleSideBar}>{menuIcon}</button>
			<button className='btn' id='undo'><FontAwesomeIcon icon={faUndo} /></button>
			<button className='btn' id='redo'><FontAwesomeIcon icon={faRedo} /></button>
			<button className='btn' id='bold' onClick={this.setBold}><FontAwesomeIcon icon={faBold} /></button>
			<button className='btn' id='italic' onClick={this.setItalic}><FontAwesomeIcon icon={faItalic} /></button>
			<button className='btn' id='strike' onClick={this.setStrike}><FontAwesomeIcon icon={faStrikethrough} /></button>
			<button className='btn' id={'save'} onClick={this.saveDocument}><FontAwesomeIcon icon={faSave}/></button>
			<button className='btn' id='export' onClick={this.props.exportPDF} ><FontAwesomeIcon icon={faFileExport}/></button>
			<select id='theme' onChange={this.props.changeTheme}>
				<option value='Github'>Github</option>
				<option value='Gothic'>Gothic</option>
				<option value='Newsprint'>Newsprint</option>
				<option value='Night'>Night</option>
			</select>
		</div>
		);
	}


}

export default ToolBar;