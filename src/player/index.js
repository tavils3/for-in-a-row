import React, { Component } from 'react';
import './player.css';

class Player extends Component {
    render() {
        return (
            <div className="player">
                <div className="player__name">{this.props.player.name}</div>
                <div className={`player__block player__block_${this.props.playerNumber}${this.props.currentPlayer ? ' player__block_current' : ''}`}>{this.props.text}</div>
                <div className="player__result">{this.props.player.points}</div>
            </div>
        );
    }
}

export default Player;