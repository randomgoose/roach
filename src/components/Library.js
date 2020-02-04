import React, { Component } from 'react';
import File from './File';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Library.css';
import { DocumentContextConsumer, updateDocumentID, updateText } from './Context/DocumentContext'

let selectFile;

class Library extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedIndex: 0,
            fileList: this.props.fileList
        }
    }

    selectFile = (index, id, rawText) => {
        this.setState({
            selectedIndex: index
        }, () => { updateDocumentID(id); updateText(rawText); });
    }

    componentWillReceiveProps(nextProps){
        this.setState(state => ({
            fileList: nextProps.fileList.sort()
        }))
    }

    keyHandler = (e, deleteDocument) => {

        if (e.metaKey) {
            console.log(e.which)
            switch(e.which) {
                case 8:
                    console.log('delete');
                    deleteDocument(this.state.fileList[this.state.selectedIndex].id)
                    break;
                default:
                    console.log('unknown')
            }
        }
    }

    render() {
        selectFile = this.selectFile;
        let files = this.state.fileList.map((file) => 
            <li key={this.state.fileList.indexOf(file)} index={this.state.fileList.indexOf(file)} 
                className={ this.state.selectedIndex === this.state.fileList.indexOf(file) ? "selected" : "unselected"}>
                {/* <File id={JSON.parse(file).id} title={JSON.parse(file).title} content={JSON.parse(file).content} index={this.state.fileList.indexOf(file)} selectFile={this.selectFile}/> */}
                <File content={file.content} index={this.state.fileList.indexOf(file)} id={file._id} timeCreated={file.timeCreated} selectFile={this.selectFile}></File>
            </li>)
        // console.log(this.state.fileList);
        return(
            <DocumentContextConsumer>
                { DocumentContext => (
                    <div id="library" className="library" onKeyDown={e => this.keyHandler(e, DocumentContext.deleteDocument)}>
                        <div><button className='btn' id='signout' onClick={DocumentContext.logout}><FontAwesomeIcon icon={faSignOutAlt} /></button></div>
                    <input type="search" className="Search"></input>
                    <button className='btn' onClick={() => { DocumentContext.addDocument(); }} ><FontAwesomeIcon icon={ faPlus } size="lg" /></button>
                    <button className='btn' onClick={() => { DocumentContext.deleteDocument(); }} ><FontAwesomeIcon icon={ faTrash } size="lg" /></button>
                    <ul>
                    {files}
                    </ul>
                </div>
                )}
            </DocumentContextConsumer>   
        )
    }
}

export { selectFile };
export default Library;