import React, { Component } from 'react';

class WordCounter extends Component {

	render(){
		return(
			<div id='wordCounter'>
				<span>Markdown</span>
				<b id='wordsNum'>{this.props.wordsNum}</b><span>words</span>
				<b id='linesNum'>{this.props.linesNum}</b><span>lines</span>
				<b id='cursorLocator' />
            </div>
		)
	}
}

export default WordCounter;