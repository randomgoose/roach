import React, { Component } from 'react';
// import { marked } from 'marked';

const marked = require('marked');

marked.setOptions({
	breaks: true
});


class Preview extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return(
			<div id="preview" dangerouslySetInnerHTML={{__html: marked(this.props.textToRender)}} />
		)
	}
}

export default Preview;