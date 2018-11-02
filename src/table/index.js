import React, { Component } from 'react';
import Column from '../column';
import './table.css';

class Table extends Component {
    render() {
        return (
            <div className="table">
            {
                this.props.data.map((col, i) => {
                    return <Column data={col} i={i} onClick={this.props.onClick} />
                })
            }
            </div>
        );
        
    }
}

export default Table;