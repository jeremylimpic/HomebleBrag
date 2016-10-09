import React, { PropTypes } from 'react';
const spinnerImg = require('../img/video-loading.gif');

const Spinner = React.createClass({
    propTypes: {
        visible: PropTypes.bool.isRequired,
    },

    getInitialState() {
        return { countdown: 130000 };
    },

    componentWillReceiveProps(nextProps) {
        if (!this.props.visible && nextProps.visible) {
            const endTime = new Date().getTime() + 150000;
            this._interval = window.setInterval(() => {
                if (this._interval <= 0) {
                    window.clearInterval(this._interval);
                    this.setState({ countdown: 0 });
                } else {
                    this.setState({ countdown: endTime - new Date().getTime() });
                }
            }, 1000);
        }
    },

    render() {
        if (this.props.visible) {
            /*const { countdown } = this.state;
            const secondsLeft = countdown / 1000;

            let countdownMsg = `Your video will be ready any second now!`;
            if (countdown > 0) {
                let minutes = Math.floor(secondsLeft / 60);
                let seconds = Math.ceil(secondsLeft % 60);
                if (seconds === 60) {
                    seconds = 0;
                    minutes += 1;
                }

                let secondsMsg = '';
                if (seconds !== 0) {
                    secondsMsg = ` ${seconds} ${seconds === 1 ? 'second' : 'seconds'}`;
                    if (minutes > 0) {
                        secondsMsg = ` and ${secondsMsg}`;
                    }
                }

                let minutesMsg = '';
                if (minutes > 0) {
                    minutesMsg = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
                }

                countdownMsg = `Your video will be ready in about ${minutesMsg}${secondsMsg}!`;
            }*/

            return (
                <div className="you-did-it clearfix">

                    <div className="info col">
                        <h2 className="heading">You Did It!</h2>
                        <p>Now shout it from the rooftop<br />(of your new house)!</p>
                        <h3>Share!</h3>
                        <div className="social-links">
                            <a className="fb" href=""></a>
                            <a className="twitter" href=""></a>
                            <a className="email" href=""></a>
                        </div>
                        <div className="continue-row">
                            <a className="start-over" href="">Start Over</a>
                        </div>
                    </div>
                    <div className="video-col col">
                        <div className="vid-preview">
                            <img src={spinnerImg} alt="" />
                            <span className="msg">Loading Brags</span>
                        </div>
                    </div>

                </div>
            );
        } else {
            return null;
        }
    },
});

export default Spinner;
