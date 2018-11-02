import React, { Component } from 'react';
import Table from '../table';
import Column from '../column';
import Button from '../button';
import Player from '../player';
import GameResult from '../gameResult';
import '../App.css';
import {Redirect, Link} from 'react-router-dom';
import io from 'socket.io-client';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            field: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            mode: this.props.location.state.mode,
            hasGameBegin: false,
            currentPlayer: null,
            gameResult: null,
            player1: {
                name: 'Player 1',
                number: 1,
                points: 0
            },
            player2: {
                name: 'Player 2',
                number: 2,
                points: 0
            },
        };
        this.socket = io('http://localhost:4000');
        this.modeSelectionClick = this.modeSelectionClick.bind(this);
        this.startGameClick = this.startGameClick.bind(this);
        this.endGameClick = this.endGameClick.bind(this);
        this.doStepClick = this.doStepClick.bind(this);
        this.selectMode = this.selectMode.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.continueGameClick = this.continueGameClick.bind(this);
    }
    
    modeSelectionClick() {
        this.setState({mode: null});
    }
    
    startGameClick() {
        if (this.state.mode == 'multiplayer') {
            this.socket.send();
            this.socket.on('message', function (data) {
                console.log(data);
            });
            return;
        }
        this.setState({
            hasGameBegin: true,
            currentPlayer: 1
        });
    }
    
    endGameClick() {
        this.setInitialState();
    }
    
    setInitialState() {
        this.setState({
            field: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            mode: this.state.mode,
            hasGameBegin: false,
            currentPlayer: null,
            gameResult: null,
            player1: {
                name: 'Player 1',
                number: 1,
                points: 0
            },
            player2: {
                name: 'Player 2',
                number: 2,
                points: 0
            },
        });
    }
    
    doStepClick(columnIndex) {
        let table = this.state.field;
        let currentCellIndex = 0;
        if (table[columnIndex][0] != 0) {
            return;
        } else {
            // Поиск первого свободного элемента для заполнения
            for (let i = table[columnIndex].length - 1; i >= 0; i--) {
                if (table[columnIndex][i] == 0) {
                    currentCellIndex = i;
                    table[columnIndex][i] = this.state.currentPlayer;
                    this.setState({field: table});
                    break;
                }
            }
            // Поиск ряда по вертикали
            for (let i = 1, len = table[columnIndex].length, curEl = table[columnIndex][0], identEl = 1; i < len; i++) {
                if (table[columnIndex][i] != 0) {
                    if (curEl == table[columnIndex][i]) {
                        identEl++;
                        if (identEl == 4) {
                            this.setState({
                                gameResult: curEl,
                                ["player" + curEl]: {
                                    name: `Player ${curEl}`,
                                    points: this.state['player' + curEl].points + 1,
                                    number: curEl
                                }
                            });
                            return;
                        }
                    } else {
                        curEl = table[columnIndex][i];
                        identEl = 1;
                    }
                }
            }
            // Поиск ряда по горизонтали
            for (let i = 0, len = table.length - 1, identEl = 1, curEl = table[0][currentCellIndex]; i < len; i++) {
                if (table[i][currentCellIndex] != 0) {
                    if (table[i][currentCellIndex] == table[i + 1][currentCellIndex]) {
                        identEl++;
                    } else {
                        identEl = 1;
                    }
                }
                if (identEl == 4) {
                    this.setState({
                        gameResult: table[i][currentCellIndex],
                        ["player" + table[i][currentCellIndex]]: {
                            name: `Player ${table[i][currentCellIndex]}`,
                            points: this.state['player' + table[i][currentCellIndex]].points + 1,
                            number: table[i][currentCellIndex]
                        }
                    });
                    return;
                }
            }
            // Поиск ряда по диагонали слева-направо
            for (let column = 0; column < 4; column++) {
                for (let cell = 5; cell > 2; cell--) {
                    let curEl = table[column][cell];
                    if (curEl != 0 
                        && curEl == table[column + 1][cell - 1]
                        && curEl == table[column + 2][cell - 2]
                        && curEl == table[column + 3][cell - 3]
                    ) {
                        this.setState({
                            gameResult: curEl,
                            ["player" + curEl]: {
                                name: `Player ${curEl}`,
                                points: this.state['player' + curEl].points + 1,
                                number: curEl
                            }
                        });
                        return;
                    }
                }
            }
            // Поиск ряда по диагонали справа-налево
            for (let column = table.length - 1; column > 2; column--) {
                for (let cell = 5; cell > 2; cell--) {
                    let curEl = table[column][cell];
                    if (curEl != 0 
                        && curEl == table[column - 1][cell - 1]
                        && curEl == table[column - 2][cell - 2]
                        && curEl == table[column - 3][cell - 3]
                    ) {
                        this.setState({
                            gameResult: curEl,
                            ["player" + curEl]: {
                                name: `Player ${curEl}`,
                                points: this.state['player' + curEl].points + 1,
                                number: curEl
                            }
                        });
                        return;
                    }
                }
            }
            // Проверка на заполненность всей таблицы
            let isTableFull = true;
            table.forEach((column) => {
                if (column[0] == 0) {
                    isTableFull = false;
                    return;
                }
            });
            if (isTableFull) {
                this.setState({gameResult: 3});
                return;
            }
            this.state.currentPlayer == 1 ? this.setState({currentPlayer: 2}) : this.setState({currentPlayer: 1});
        }
    }
    
    selectMode(data) {
        this.setState({mode: data});
    }
    
    isMyPlayer(player) {
        if (player.number == 1 && this.state.mode == 'single') {
            return 'Вы';
        }
    }
    
    continueGameClick() {
        this.setState({
            gameResult: null,
            currentPlayer: 1,
            field: [
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ]
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.mode && <Link className="button mode-button" onClick={this.modeSelectionClick} to={{pathname: '/game'}}>Сменить режим игры</Link>}
                {this.state.mode && !this.state.hasGameBegin && <div className="start-button-wrapper"><Button text="Начать игру" className="start-button" onClick={this.startGameClick} /></div>}
                {this.state.hasGameBegin && this.state.mode && <div className="end-button-wrapper"><Button text="Завершить игру" className="end-button" onClick={this.endGameClick} /></div>}
                {
                    this.state.hasGameBegin && this.state.mode &&
                    <div className="game-status">
                        <Player playerNumber={1} text={this.isMyPlayer(this.state.player1)} player={this.state.player1} currentPlayer={this.state.currentPlayer == 1} />
                        <Player playerNumber={2} text={this.isMyPlayer(this.state.player2)} player={this.state.player2} currentPlayer={this.state.currentPlayer == 2} />
                    </div>
                }
                {this.state.hasGameBegin && this.state.mode && <Table data={this.state.field} onClick={this.doStepClick} />}
                {this.state.gameResult && <GameResult gameResult={this.state.gameResult} continueGameClick={this.continueGameClick} endGameClick={this.endGameClick} />}
            </React.Fragment>
        );
    }
}

export default Game;