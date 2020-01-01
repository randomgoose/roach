import React, { Component } from 'react';

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
                    <div className="fileContent">{this.props.content}</div>
                </a>
            </div>
        )
    }
}

export default File;