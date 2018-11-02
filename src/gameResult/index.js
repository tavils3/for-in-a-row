import React, { Component } from 'react';
import Button from '../button';
import './gameResult.css';

class GameResult extends Component {
    constructor() {
        super();
        this.getResult = this.getResult.bind(this);
        this.endGameClick = this.endGameClick.bind(this);
        this.continueGameClick = this.continueGameClick.bind(this);
    }
    
    getResult(result) {
        switch (result) {
            case 1 : 
                return 'Победил игрок 1';
            case 2 :
                return 'Победил игрок 2';
            case 3 :
                return 'Победила дружба';
        }
    }
    
    endGameClick() {
        this.props.endGameClick();
    }
    
    continueGameClick() {
        this.props.continueGameClick();
    }
    
    render() {
        return (
            <div className="game-result">
                <div className="game-result__window">
                    <div className="game-result__text">{this.getResult(this.props.gameResult)}</div>
                    <Button text="Еще раз" className="game-result__button" onClick={this.continueGameClick} />
                    <Button text="Завершить игру" className="game-result__button" onClick={this.endGameClick} />
                </div>
            </div>
        );
    }
}

export default GameResult;