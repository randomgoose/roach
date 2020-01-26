import React, { Component } from 'react';

class WordCounter extends Component {
	state = {
		wordsNum: this.props.wordsNum,
		linesNum: this.props.linesNum
	}

	componentWillReceiveProps(nextProps) {
		this.setState(state => ({
			wordsNum: nextProps.wordsNum,
			linesNum: nextProps.linesNum
		}))
	}

	render(){
		return(
			<div id='wordCounter'>
				<span>Markdown</span>
				<b id='wordsNum'>{this.state.wordsNum}</b><span>words</span>
				<b id='linesNum'>{this.state.linesNum}</b><span>lines</span>
				<b id='cursorLocator' />
            </div>
		)
	}
}

export default WordCounter;