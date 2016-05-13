import React from 'react';
import Dialog from 'material-ui/Dialog/Dialog';

export default class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }

    handleModalClick() {
        this.props.onclickfn(false);
        this.setState({
            modal: false
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            modal: nextProps.open
        });
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
                    <div className="bold-text">
                        <p>
                            The number inside the circle is your target number.
                        </p>
                        <p>
                            Click on the boxes to shuffle through the available numbers to
                            get to your target number.
                        </p>
                        <p>
                            Click Compute when you have the right number
                        </p>
                        <p>
                            Numbers are computed from right to left.
                        </p>
                        <p>
                            Mutilpe and Division double your score.
                        </p>
                    </div>
                        <div className="center-button">
                            <div className="center-button-name"
                              onTouchTap={this.handleModalClick.bind(this)}
                              onClick={this.handleModalClick.bind(this)}
                            >
                            Close
                        </div>
                    </div>
                </Dialog>
        );
    }
}
