import React, { Component } from 'react';
import File from './File';

class Library extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0,
            fileList: [
                {"title": "Shopping List", "content": "yes!", "wordsNum": 12, "linesNum": 12, "text": "A"},
                {"title": "Data Analysis", "content": "no!", "wordsNum": 12, "linesNum": 12, "text": "B"},
                {"title": "Daily Report", "content": "okay..", "wordsNum": 12, "linesNum": 12, "text": "C"}
            ]
        }
    }

    selectFile = index => {
        this.setState({
            selectedIndex: index
        });
        this.props.updateText(this.state.fileList[index]);
        document.getElementById('editor').value = this.state.fileList[index].content;
    }

    render() {
        let files = this.state.fileList.map((file) => 
            <li key={this.state.fileList.indexOf(file)} className={ this.state.selectedIndex === this.state.fileList.indexOf(file) ? "selected" : "unselected"}>
                <File title={file.title} content={file.content} index={this.state.fileList.indexOf(file)} selectFile={this.selectFile}/>
            </li>)

        return(
            <div id="library">
                {this.state.selectedIndex}
                <ul>
                {files}
                </ul>
               
            </div>
        )
    }
}

export default Library;