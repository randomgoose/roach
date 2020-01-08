import React, { Component } from 'react';
import './File.css'

class File extends Component {
    constructor(props){
        super(props);
    }

    clickHandler = event => {
        this.props.selectFile(this.props.index);
    }

    render() {
        return(
            <div className="file">
                <a href="#" onClick={this.clickHandler}>
                    <div className="fileTitle">{this.props.title}</div>
                    <div className="fileExcerpt">{this.props.content}</div>
                </a>
            </div>
        )
    }
}

export default File;