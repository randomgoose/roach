import React from 'react';
import { auth, updateDocuments } from './UserContext';
import uuid from 'react-uuid';

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
            .then(data => { alert(data.info) })
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
	// if (this.state.rawText != null){
	// 	return this.state.rawText.length === 0 ? 0 : this.state.rawText.match(/\b[-?(\w+)?]+\b/gi).length;
    // 	} else {
	// 	return 0
    // }
        return this.state.rawText.match(/\b[-?(\w+)?]+\b/gi) == null ? 0 : this.state.rawText.match(/\b[-?(\w+)?]+\b/gi).length;
    };

    countLines = () => {
        return this.state.rawText.split('\n') == null ? 0 : this.state.rawText.split('\n').length;
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
                getDocuments: this.getDocuments,
                setStyle: this.setStyle
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export { DocumentContextProvider, Consumer as DocumentContextConsumer }
