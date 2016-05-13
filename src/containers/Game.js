import Board from '../components/board/Board';
import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GameLogic from '../gamelogic/level1';

export default class Game extends React.Component {

    constructor() {
        let { playnumbers, targetNumber } = GameLogic.getplayNumbers(2, 200);
        super();
        this.state = {
            numbers: playnumbers,
            target: targetNumber
        };
    }

    generateNewNumbers() {
        let { playnumbers, targetNumber } = GameLogic.getplayNumbers(2, 200);
        let newNumbers = {
            numbers: playnumbers,
            target: targetNumber
        };
        this.setState(newNumbers);
    }

  render() {
      return (
          <MuiThemeProvider muiTheme={getMuiTheme()}>
              <Board playnums={this.state.numbers} generate={this.generateNewNumbers.bind(this)}target={this.state.target}/>
          </MuiThemeProvider>
    );
  }
}
