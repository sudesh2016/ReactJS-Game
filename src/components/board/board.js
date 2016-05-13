import React from 'react';
import GameLogic from '../../gamelogic/level1';
import Overview from '../overview/overview';
import Modal from '../modal/modal';
const TEN = 10;
const HUNDRED = 100;
const THOUSAND = 1000;

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        let playnums = props.playnums;

        let high = localStorage.getItem('math-genius-high-score');
        if (!high) {
            localStorage.setItem('math-genius-high-score', 0);
        }
        this.state = {
            playIndex: 1,
            playnum1: playnums[0],
            playnum2: playnums[1],
            current: 0,
            high: high ? high : 0,
            timerEnabled: false,
            modal: false,
            timeup: false,
            loss: false,
            answer: null,
            overview: false,
            color: 'green'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.timerEnabled) {
            this.timer = setTimeout(() => this.progress(2), 300);
        }
        this.reset(nextProps);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }


    reset(props) {
        let playnums = props.playnums;
        this.setState({
            playIndex: 1,
            playnum1: playnums[0],
            playnum2: playnums[1],
            modal: false,
            timeup: false,
            loss: false,
            answer: null
        });
    }

    progress(completed) {
        let high;
        if (completed > 100) {
            if (this.state.current > this.state.high) {
                localStorage.setItem('math-genius-high-score', this.state.current);
                high = this.state.current;
            } else {
                high = this.state.high;
            }
            this.setState({
                completed: 100,
                loss: true,
                high
            });
        } else {
            this.setState({ completed });
            this.timer = setTimeout(() => this.progress(completed + 2), 300);
        }
    }

    handleClick(holdValue) {
        let state = Object.assign({}, this.state),
            props = this.props;

        if (state.playIndex >= props.playnums.length - 1) {
            state.playIndex = 0;
        } else {
            state.playIndex++;
        }

        state[holdValue] = props.playnums[state.playIndex];

        this.setState(state);
    }

    timerEnable() {
        this.setState({
            completed: 0,
            current: 0,
            timerEnabled: !this.state.timerEnabled
        }, function () {
            clearTimeout(this.timer);
            this.props.generate();
        });
    }

    openOverview() {
        this.setState({
            overview: !this.state.overview
        });
    }


    circleClick() {
        let state = Object.assign({}, this.state),
            props = this.props;

        let result = GameLogic.isAnswer(state.playnum1, state.playnum2, props.target);
        state.answer = result.answer;
        if (!state.answer) {
            if (this.state.current > this.state.high) {
                localStorage.setItem('math-genius-high-score', this.state.current);
                state.high = state.current;
            }
            state.loss = true;
            state.current = 0;
        } else {
            if (result.double) {
                state.current = state.current ? state.current : 1;
                state.current = state.current * 2;
            } else {
                state.current++;
            }
        }

        clearTimeout(this.timer);
        this.setState(state);
    }

    counter() {
        let counterStlyes = {
            marginTop: '10px',
            marginBottom: '20px',
            width: this.state.completed + '%',
            height: '5px',
            backgroundColor: 'rgba(255, 49, 49, 0.47)'
        };
        return (<div className="timer-clock" style={counterStlyes}></div>);
    }

    render() {
        let me = this,
            props = me.props,
            state = me.state,
            textStyles, percent;

        if (props.target < TEN) {
            percent = '38% !important';
            textStyles = {
                marginLeft: percent
            };
        }

        if (props.target >= TEN && props.target < HUNDRED) {
            percent = '25% !important';
            textStyles = {
                marginLeft: percent
            };
        }

        if (props.target >= HUNDRED && props.target < THOUSAND) {
            percent = '15% !important';
            textStyles = {
                marginLeft: percent
            };
        }

        return (
            <div className="game-board">
                <span className="play-stats">
                    <span className="high-score">
                        High: {state.high}
                    </span>
                    <span className="current-score">
                        Current: {state.current}
                    </span>
                </span>
                {this.counter()}
                <div className="circle">
                    <span className="center-text" key={percent} style={textStyles}>{props.target}</span>
                </div>
                <div className="drop-box-container">
                    <div onTouchTap={me.handleClick.bind(me, 'playnum1')}
                      onClick={me.handleClick.bind(me, 'playnum1')}
                      className="drop-box"
                    >
                        <span className="text-box">{state.playnum1}</span>
                    </div>
                    <div onTouchTap={me.handleClick.bind(me, 'playnum2')}
                      onClick={me.handleClick.bind(me, 'playnum2')}
                      className="drop-box"
                    >
                        <span className="text-box">{state.playnum2}</span>
                    </div>
                </div>
                <span onTouchTap={me.circleClick.bind(me)}
                  onClick={me.circleClick.bind(me)}
                  className="compute"
                >
                  Compute
              </span>
                <div className="options">
                    <span onTouchTap={me.timerEnable.bind(me)} onClick={me.timerEnable.bind(me)} className="timerButton">Timer</span>
                    <span className="howtoplay" onTouchTap={me.openOverview.bind(me)} onClick={me.openOverview.bind(me)}>How to ?</span>
                </div>
                <Modal
                  answer={this.state.answer}
                  target={this.props.target}
                  generate={this.props.generate}
                  score={this.state.current}
                  loss={this.state.loss}
                />
            <Overview open={this.state.overview} onclickfn={me.openOverview.bind(me)}/>
            </div>
        );
    }
}


Board.propTypes = {
    playnums: React.PropTypes.array.isRequired,
    target: React.PropTypes.number.isRequired,
    generate: React.PropTypes.func
};
