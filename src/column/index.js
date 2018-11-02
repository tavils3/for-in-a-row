import React, { Component } from 'react';
import Cell from '../cell';
import './column.css';

class Column extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.onClick(this.props.i);
    }

    render() {
        return (
            <div className="column" onClick={this.handleClick}>
                {
                    this.props.data.map((cell, i) => {
                        return <Cell data={cell} key={i} />
                    })
                }
            </div>
        );
    }
}

export default Column;