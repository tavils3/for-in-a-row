import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Game from './game/index.js';
import ModeSelection from './modeSelection';

class App extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Route path="/game" component={ModeSelection} exact="true" />
                    <Route path="/game/single" component={Game} exact="true" />
                    <Route path="/game/multiplayer" component={Game} exact="true" />                   
                </div>
            </HashRouter>
        );
    }
}

export default App;
