import React, { Component } from 'react';
import './Editor.css';


class Editor extends Component {

	state = {
		rawText: ''
	}

	componentWillReceiveProps(nextProps){
		console.log("in component will receive props", nextProps)
		this.setState({
			rawText: nextProps.rawText.present
		})
	}

	changeHandler = (event) =>  {
		this.setState({
			rawText: event.target.value
		}, () => {
			// console.log("editor state", this.state.rawText);
			this.props.updateText(this.state.rawText);
			// console.log("editor value", event.target.value);
		})
	};

	keyHandler = (event) => {
		console.log(event.which)

		if (event.metaKey) {
			switch (event.which) {
				case 66:
					// Set bold
					this.props.setStyle("bold");
					break;
				case 73:
					// Set italic
					this.props.setStyle("italic");
					break;
				case 83:
					// Save files
					event.preventDefault();
					this.props.saveDocument();
					break;
				case 90:
					// Redo & undo
					if (event.shiftKey) {
						this.props.redo();	
					} else {
						event.preventDefault();
						this.props.undo();
					}
					break;
				default:
					console.log('unknown');
			}
		}
	}

	render() {
		return (
			<textarea className='editor'
				value={this.state.rawText}
				id='editor'
				onKeyDown={this.keyHandler}
				onChange={this.changeHandler}
				autoFocus='autoFocus' />
		)
	}
}

export default Editor;