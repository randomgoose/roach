import React, { Component } from 'react';
import './Editor.css';

const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rawText: defaultText
		};
	this.changeHandler = this.changeHandler.bind(this);
	this.countWords = this.countWords.bind(this);
	this.keyHandler = this.keyHandler.bind(this);
	}

	// componentDidMount(){
	// 	// console.log(document.getElementById('editor').innerHTML.match(/\b[-?(\w+)?]+\b/gi).length);
	// 	WordCounter.defaultProps = {
			
	// 	};
	// }
	
	countWords(){
		return this.state.rawText.match(/\b[-?(\w+)?]+\b/gi).length;
	};

	countLines(){
		return this.state.rawText.split('\n').length;
	};
	
	changeHandler(event){
		event.preventDefault();
		this.setState({
			rawText: event.target.value 
		});
		this.props.updateText(
			{text: event.target.value,
			 wordsNum: this.countWords(),
			 linesNum: this.countLines()
			});
	};
	
	keyHandler(event){
		event.preventDefault();
		console.log(event.which);
		if(event.ctrlKey){
			switch(event.which){
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

	render(){
		return(
			<textarea className='editor' id='editor' onKeyUp={this.keyHandler} onChange={this.changeHandler} defaultValue={defaultText} autoFocus='autoFocus' />
		)
	}
}

export { defaultText };
export default Editor;