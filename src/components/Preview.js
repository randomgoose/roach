import React, { Component } from 'react';
import { text } from '@fortawesome/fontawesome-svg-core';
import './Preview.css';
// import { marked } from 'marked';

const marked = require('marked');

marked.setOptions({
	breaks: true
});

class Preview extends Component {
	constructor(props){
		super(props);
		this.state = {
			textToRender: this.props.textToRender
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState(state => ({
			textToRender: nextProps.textToRender
		}));
	}

	render(){
		return(
			<div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.textToRender)}} />
		)
	}
}

export default Preview;