import React from 'react';
import { auth, updateDocuments } from './UserContext';
import uuid from 'react-uuid';
import { selectFile } from '../Library';


let updateDocumentID;
let updateText;

String.prototype.insertAt = function (index, string) {
	return this.substring(0, index) + string + this.substring(index);
};

const { Provider, Consumer } = React.createContext();

class DocumentContextProvider extends React.Component {

    state = {
        rawText: '',
        documentID: ''
    }

    updateDocumentID = (id) => {
        this.setState({
            documentID: id
        });
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
            .then(data => { updateDocuments(data.documents);}) 
            .catch(error => { alert(error); console.log('error', error) });
    }
    

    saveDocument = () => {
        let selectedIndex = document.getElementsByClassName("selected")[0].getAttribute("index");

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
            .then(data => { updateDocuments(data.documents, selectedIndex) })
            .catch(error => { alert(error); console.log('error', error) });
    }

    deleteDocument = () => {
        let selectedIndex = document.getElementsByClassName("selected")[0].getAttribute("index") - 1;

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

        fetch("http://localhost:8080/delete", requestOptions)
            .then(response => response.json())
            .then(data => { updateDocuments(data.documents, selectedIndex) }) 
            .catch(error => { alert(error); console.log('error', error) });
    }

    setStyle = (style) => {
        let editor = document.getElementById("editor");

        let [selectionStart, selectionEnd] = [editor.selectionStart, editor.selectionEnd];

        switch(style){
            case "bold":
                this.setState(prevState => ({
                    rawText: prevState.rawText.insertAt(selectionStart, '**').insertAt(selectionEnd + 2, "**")
                }));
                editor.setSelectionRange(selectionStart, selectionEnd + 4);
                break;
            case "italic":
                this.setState(prevState => ({
                    rawText: prevState.rawText.insertAt(selectionStart, "*").insertAt(selectionEnd + 1, "*")
                }));
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "strikethrough":
                this.setState(prevState => ({
                    rawText: prevState.rawText.insertAt(selectionStart, "~").insertAt(selectionEnd + 1, "~")
                }));
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "quote":
                this.setState(prevState => ({
                    rawText: prevState.rawText.insertAt(selectionStart, "> ")
                }));
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "unorderedList":
                this.setState(prevState => ({
                    rawText: prevState.rawText.insertAt(selectionStart, "- ")
                }));
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "orderedList":
                this.setState(prevState => ({
                    rawText: prevState.rawText.insertAt(selectionStart, "1. ")
                }));
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            default:
                console.log("Set style");
        }

        editor.focus();
    }

    countWords = () => {
        return this.state.rawText.match(/\b[-?(\w+)?]+\b/gi) == null ? 0 : this.state.rawText.match(/\b[-?(\w+)?]+\b/gi).length;
    };

    countLines = () => {
        return this.state.rawText.split('\n') == null ? 0 : this.state.rawText.split('\n').length;
    };

    render() {
        updateDocumentID = this.updateDocumentID;
        updateText = this.updateText;

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
                getDocuments: this.getDocuments,
                deleteDocument: this.deleteDocument,
                setStyle: this.setStyle
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export { DocumentContextProvider, Consumer as DocumentContextConsumer, updateDocumentID, updateText }
