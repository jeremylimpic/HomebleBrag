import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Form from './form';
import { nextStep } from '../actions/step-actions';
import { sendEmail } from '../actions/email';
import previewVideo from '../img/preview.mp4';
import Hero from './hero';
import Spinner from './spinner';
import ShowVideo from './show-video';
import EmailShare from './email-share';

const App = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired,
        step: PropTypes.number.isRequired,
        spinner: PropTypes.string.isRequired,
        videoUUID: PropTypes.string,
    },

    getInitialState() {
        return { showEmail: false };
    },

    onMakeYourOwn(e) {
        e.preventDefault();
        if (this.props.step === 0) {
            document.querySelector('#preview-video video').pause();
            this.props.dispatch(nextStep());
        }
    },

    onVideoEnd() {
        const vid = document.getElementById('preview-video');
        vid.style.height = `${vid.clientHeight}px`;
        setTimeout(this.vidHeightZero, 1000);
        document.querySelector('.play-again').style.visibility = 'visible';
    },

    vidHeightZero() {
        document.getElementById('preview-video').style.height = 0;
    },

    onShareEmail() {
        this.setState({ showEmail: true });
    },

    onSendEmail(params) {
        this.props.dispatch(sendEmail(params));
    },

    render() {
        let form;
        if ((this.props.step > 0) && (this.props.spinner !== 'spinner')) {
            form = <Form {...this.props} />;
        }

        const bottomClass = classNames({
            expanded: this.props.step > 0,
            expanded2: this.props.step > 1,
        });

        let video = <Spinner visible={this.props.spinner === 'spinner'} />;
        if (this.props.videoUUID) {
            video = <ShowVideo uuid={this.props.videoUUID} onShareEmail={this.onShareEmail} />;
        }

        let showEmail;
        if (this.state.showEmail) {
            showEmail = (
                <EmailShare
                    uuid={this.props.videoUUID}
                    onSend={this.onSendEmail}
                    onClose={() => this.setState({ showEmail: false })} />
            );
        }

        return (
            <div>
                <div id="header" className={`${(this.props.step > 0) ? 'compact' : ''}`}>
                    <h1 className=""><span className="hash">#</span><span className="highlight">homeble</span>brag</h1>
                    <p>
                        Are you too humble to brag about your new home? <br />Let Elizabeth Banks do it for you!
                    </p>

                    <div id="preview-video">
                        <video src={previewVideo} height="390" width="694" preload="auto" autoPlay="autoplay" autostart="autostart" onEnded={this.onVideoEnd}></video>
                        <a className="skip border-button" href="#" onClick={this.onMakeYourOwn}><span className="inner">Skip &amp; Get Started!</span></a>
                    </div>

                    <Hero step={this.props.step} onClick={this.onMakeYourOwn} />
                </div>

                <div id="bottom" className={bottomClass}>
                    {form}
                    {video}
                </div>
                {showEmail}
            </div>
        );
    },
});

export default App;
