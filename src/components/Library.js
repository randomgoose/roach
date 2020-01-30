import React, { Component } from 'react';
import File from './File';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Library.css';
import { DocumentContextConsumer } from './Context/DocumentContext'

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
        
    }

    componentWillReceiveProps(nextProps){
        // alert(nextProps.fileList.length)
        this.setState(state => ({
            fileList: nextProps.fileList.sort()
        }))
    }

    render() {
        // const fileList = this.state.fileList;
        let files = this.state.fileList.map((file) => 
            <li key={this.state.fileList.indexOf(file)}
                className={ this.state.selectedIndex === this.state.fileList.indexOf(file) ? "selected" : "unselected"}>
                {/* <File id={JSON.parse(file).id} title={JSON.parse(file).title} content={JSON.parse(file).content} index={this.state.fileList.indexOf(file)} selectFile={this.selectFile}/> */}
                <File content={file.content} index={this.state.fileList.indexOf(file)} id={file._id} timeCreated={file.timeCreated} selectFile={this.selectFile}></File>
            </li>)
        // console.log(this.state.fileList);
        return(
            <DocumentContextConsumer>
                { DocumentContext => (
                    <div id="library" className="library">
                    <input type="search"></input>
                    <button className='btn' onClick={() => { DocumentContext.addDocument();}} ><FontAwesomeIcon icon={ faPlus } size="lg" /></button>
                    {this.state.selectedIndex}
                    <ul>
                    {files}
                    </ul>
                </div>
                )}
            </DocumentContextConsumer>   
        )
    }
}

export default Library;