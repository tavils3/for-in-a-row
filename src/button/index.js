import React, { Component } from 'react';
import './button.css';

class Button extends Component {
    
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.onClick(this.props.data);
    }
    
    render() {
        return (
            <button className={`button ${this.props.className}`} onClick={this.handleClick}>{this.props.text}</button>
        );
        
    }
}

export default Button;