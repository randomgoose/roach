import React, { Component } from 'react';
import File from './File';

class Library extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0,
            fileList: this.props.fileList
        }
    }

    selectFile = index => {
        this.setState({
            selectedIndex: index
        });
        // this.props.updateText(this.state.fileList[index]);
        // document.getElementById('editor').value = this.state.fileList[index].text;
    }

    render() {
        let files = this.state.fileList.map((file) => 
            <li key={this.state.fileList.indexOf(file)}
                className={ this.state.selectedIndex === this.state.fileList.indexOf(JSON.parse(file)) ? "selected" : "unselected"}>
                <File title={JSON.parse(file).title} content={JSON.parse(file).content} index={this.state.fileList.indexOf(file)} selectFile={this.selectFile}/>
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