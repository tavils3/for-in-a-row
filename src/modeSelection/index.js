import React, { Component } from 'react';
import './modeSelection.css';
import {Link} from 'react-router-dom';

class ModeSelection extends Component {
    
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(data) {
        this.props.onClick({mode: data});
    }
    
    render() {
        return (
            <div className="mode">
                <div className="mode__text">Выберите режим игры</div>
                <div className="mode__buttons">
                    <Link to = {{
                        pathname: '/game/single',
                        state: {
                            onClick: this.handleClick,
                            mode: 'single'
                        }
                    }} className = "button mode__buttons-item" 
                    > Одиночный </Link>
                    <Link to = {{
                        pathname: '/game/multiplayer',
                        state: {
                            onClick: () => {return true;},
                            mode: 'multiplayer'
                        }
                    }} className = "button mode__buttons-item" 
                    > Мультиплеер </Link>
                </div>
            </div>
        );
    }
}

export default ModeSelection;