import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            generateNewNumbers: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.answer || nextProps.loss) {
            this.setState({
                modal: true
            });
        }
    }

    getProperDisplay() {
        let display = '';

        if (this.props.answer) {
            display = (
                    <div>
                        <div className="message">Good Job!</div>
                            <div className="answer">
                                {`${this.props.answer} = ${this.props.target}`}
                        </div>
                    </div>
                );
        }

        if (!this.props.answer) {
            display = (
                    <div className="message">Try again!</div>
                );
        }

        return display;
    }


    handleModalClick() {
        this.setState({
            modal: false
        });
        this.props.generate();
    }

    render() {
        const customContentStyle = {
            width: '75%',
            maxWidth: 'none'
        };

        const custombodyStyle = {
            backgroundColor: 'rgba(200, 212, 97, 0.29)'
        };

        return (
                <Dialog
                  className="dialog-class"
                  contentStyle={customContentStyle}
                  bodyStyle={custombodyStyle}
                  modal
                  open={this.state.modal}
                >
                    <div>
                        {this.getProperDisplay()}
                        <div className="center-button">
                            <div className="center-button-name"
                              onTouchTap={this.handleModalClick.bind(this)}
                              onClick={this.handleModalClick.bind(this)}
                            >
                            Next
                            </div>
                        </div>
                    </div>
                </Dialog>
        );
    }
}


Modal.propTypes = {
    answer: React.PropTypes.string,
    target: React.PropTypes.number.isRequired,
    timeup: React.PropTypes.bool,
    loss: React.PropTypes.bool,
    generate: React.PropTypes.func
};
