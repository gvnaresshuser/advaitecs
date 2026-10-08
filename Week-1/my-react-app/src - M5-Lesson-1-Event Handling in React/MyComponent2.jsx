import React from 'react';

class MyComponent2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log('Button clicked');
    }

    render() {
        return (
            <button onClick={this.handleClick}>Click me</button>
        );
    }
}

export default MyComponent2;
/*
Binding Event Handlers: You can bind event handlers in the constructor or use arrow 
function syntax to automatically bind this:
*/
