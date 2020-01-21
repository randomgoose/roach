import React, { Component } from 'react';

class Toggler extends Component {
    state = {
        on: false
    }

    toggle = this.setState(prevState => {
        return {
            on: !prevState.on
        }
    })

    render() {
        const {component: C, defaultOption, ...props} = this.props;
        return (
            <C on={this.state.on} toggle={this.toggle}  {...props} />
        )
    }
}

export function withToggle(component, defaultOption) {
    return function (props) {
        return (
            <Toggler component={component} defaultOption={defaultOption} {...props} />
        )
    }
}