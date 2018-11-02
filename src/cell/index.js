import React, { Component } from 'react';
import './cell.css';

class Cell extends Component {
    getClassName(data) {
        switch (data) {
            case 1:
                return "cell player1";
            case 2:
                return "cell player2";
            default:
                return "cell blank";
        }
    }

    render() {
        return (
            <div className={this.getClassName(this.props.data)}>{this.props.data}</div>
        );
    }
}

export default Cell;