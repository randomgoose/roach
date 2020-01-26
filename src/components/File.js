import React, { Component } from 'react';
import './File.css';
import { DocumentContextConsumer } from './Context/DocumentContext'

class File extends Component {

    render() {
        return (
            <DocumentContextConsumer>
                {DocumentContext => (
                    <div className="file">
                        <a href="#" onClick={() => {
                            DocumentContext.updateText(this.props.content);
                            DocumentContext.updateDocumentID(this.props.id);
                            this.props.selectFile(this.props.index);
                        }}>
                            {/* <div className="fileID">{this.props.title}</div> */}
                            <div className="fileExcerpt">{this.props.content}</div>
                            <div className="timeCreated">{this.props.timeCreated}</div>
                            <div className="fileID">{this.props.id}</div>
                        </a>
                    </div>)}
            </DocumentContextConsumer>

        )
    }
}

export default File;