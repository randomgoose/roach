import React from 'react';
const { Provider, Consumer } = React.createContext();

class DocumentContextProvider extends React.Component {
    state = {
        rawText: '',
    }


    updateText = (e) => {
        this.setState({
            rawText: e.target.value
        })
    }

    saveDocument = () => {
        
    }



    render() {
        return (
            <Provider value={{
                rawText: this.state.rawText,
                updateText: this.updateText,
                saveDocument: this.saveDocument
            }}>
                {this.props.children}
            </Provider>
        )
    }

}

export { DocumentContextProvider, Consumer as DocumentContextConsumer }