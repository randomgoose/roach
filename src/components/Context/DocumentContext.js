import React from 'react';
import { auth, updateDocuments } from './UserContext';
import uuid from 'react-uuid';

const { Provider, Consumer } = React.createContext();

class DocumentContextProvider extends React.Component {
    state = {
        rawText: '',
        documentID: ''
    }

    updateDocumentID = (id) => {
        this.setState({
            documentID: id
        }, () => { console.log(this.state.documentID); });
    }

    updateText = (rawText) => {
        this.setState({
            rawText: rawText
        }, () => {
            console.log("context text", this.state.rawText)
        })

    }

    addDocument = () => {

        let myHeaders = new Headers();

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
            mode: "cors",
            credentials: "include"
        };

        fetch("http://localhost:8080/add", requestOptions)
            .then(response => response.json())
            .then(data => { updateDocuments(data.documents)}) 
            .catch(error => { alert(error); console.log('error', error) });
    
    }

    saveDocument = () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let docToSave = JSON.stringify({ documentID: this.state.documentID, newContent: this.state.rawText })

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: docToSave,
            redirect: 'follow',
            mode: 'cors',
            credentials: 'include'
        };

        fetch("http://localhost:8080/save", requestOptions)
            .then(response => response.json())
            .then(data => { console.log(data.info) })
            .catch(error => { alert(error); console.log('error', error) });
    }

    // getDocuments = () => {
    //     let myHeaders = new Headers();

    //     let requestOptions = {
    //         method: 'GET',
    //         headers: myHeaders,
    //         redirect: 'follow',
    //         mode: 'cors',
    //         credentials: 'include'
    //     };

    //     fetch("http://localhost:8080/get", requestOptions)
    //         .then(response => response.json())
    //         .then(data => { updateDocuments(data.documents)}) 
    //         .catch(error => { alert(error); console.log('error', error) });
    // }

    countWords() {
        return this.state.rawText.length === 0 ? 0 : this.state.rawText.match(/\b[-?(\w+)?]+\b/gi).length;
    };

    countLines() {
        return this.state.rawText.length === 0 ? 0 : this.state.rawText.split('\n').length;
    };

    render() {
        return (
            <Provider value={{
                // state: this.state,
                rawText: this.state.rawText,
                updateText: this.updateText,
                saveDocument: this.saveDocument,
                updateDocumentID: this.updateDocumentID,
                wordsNum: this.countWords(),
                linesNum: this.countLines(),
                addDocument: this.addDocument,
                getDocuments: this.getDocuments
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export { DocumentContextProvider, Consumer as DocumentContextConsumer }