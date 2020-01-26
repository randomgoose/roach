import React, { Component } from 'react';
import './Editor.css';


class Editor extends Component {

	state = {
		rawText: this.props.rawText
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			rawText: nextProps.rawText
		})
	}

	changeHandler = (event) =>  {
		this.setState({
			rawText: event.target.value
		}, () => {
			console.log("editor state", this.state.rawText);
			this.props.updateText(this.state.rawText);
			// console.log("editor value", event.target.value);
		})
	};

	keyHandler = (event) => {
		event.preventDefault();
		console.log(event.which);
		if (event.ctrlKey) {
			switch (event.which) {
				case 66:
					console.log('Keyboard Shortcuts: Bold');
					break;
				case 73:
					console.log('Keyboard Shortcuts: Italic');
					break;
				default:
					console.log('unknown');
			}
		}
	};

	render() {
		return (
			<textarea className='editor'
				value={this.state.rawText}
				id='editor'
				onKeyUp={this.keyHandler}
				onChange={this.changeHandler}
				autoFocus='autoFocus' />
		)
	}
}

export default Editor;