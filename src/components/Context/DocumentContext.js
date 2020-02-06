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
        rawText: {
            history: [],
            present: '',
            future: []
        },
        documentID: ''
    }

    updateDocumentID = (id) => {
        this.setState({
            documentID: id
        });
    }

    updateText = (rawText) => {
        this.setState(prevState => ({
            rawText: {
                history: [prevState.rawText.present, ...prevState.rawText.history],
                present: rawText,
                future: []
            }
        }), () => {
            console.log(
                this.state.rawText
            )
        })
    }

    addDocument = () => {
        // let newDocument = 

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
            .catch(error => { console.log('error', error) });

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
        let selectedIndex = document.getElementsByClassName("selected")[0] ? document.getElementsByClassName("selected")[0].getAttribute("index") - 1 : 0;
        if (selectedIndex == -1){
            selectedIndex = 0;
        }

        console.log('index to delete', selectedIndex)

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
                this.updateText(this.state.rawText.present.insertAt(selectionStart, '**').insertAt(selectionEnd + 2, "**"))
                editor.setSelectionRange(selectionStart, selectionEnd + 4);
                break;
            case "italic":
                this.updateText(this.state.rawText.present.insertAt(selectionStart, "*").insertAt(selectionEnd + 1, "*"))
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "strikethrough":
                this.updateText(this.state.rawText.present.insertAt(selectionStart, "~").insertAt(selectionEnd + 1, "~"))
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "quote":
                this.updateText(this.state.rawText.present.insertAt(selectionStart, "> "))
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "unorderedList":
                this.updateText(this.state.rawText.present.insertAt(selectionStart, "- "))
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            case "orderedList":
                this.updateText(this.state.rawText.insertAt(selectionStart, "1. "))
                editor.setSelectionRange(selectionStart, selectionEnd + 2);
                break;
            default:
                console.log("Set style");
        }

        editor.focus();
    }

    countWords = () => {
        return this.state.rawText.present.match(/\b[-?(\w+)?]+\b/gi) == null ? 0 : this.state.rawText.present.match(/\b[-?(\w+)?]+\b/gi).length;
    };

    countLines = () => {
        return this.state.rawText.present.split('\n') == null ? 0 : this.state.rawText.present.split('\n').length;
    };

    undo = () => {
        // this.setState
        if (this.state.rawText.history.length > 0) {
            this.setState({
                rawText: {
                    history: this.state.rawText.history.slice(1),
                    present: this.state.rawText.history[0],
                    future: [this.state.rawText.present, ...this.state.rawText.future]
                }
            }, () => {
                console.log(this.state.rawText)
            })
        }
    }

    redo = () => {
        if (this.state.rawText.future.length > 0) {
            this.setState({
                rawText: {
                    history: [this.state.rawText.present, ...this.state.rawText.history],
                    present:this.state.rawText.future[0],
                    future: this.state.rawText.future.slice(1)
                }
            })
        }
    }

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
                setStyle: this.setStyle,
                undo: this.undo,
                redo: this.redo
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export { DocumentContextProvider, Consumer as DocumentContextConsumer, updateDocumentID, updateText }
