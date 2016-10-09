import React, { PropTypes } from 'react';

const ShowVideo = React.createClass({
    propTypes: {
        uuid: PropTypes.string.isRequired,
        onShareEmail: PropTypes.func,
    },

    shareEmail(e) {
        e.preventDefault();
        this.props.onShareEmail();
    },

    render() {
        return (
            <div className="you-did-it clearfix">
                <div className="info col">
                    <h2 className="heading">You Did It!</h2>
                    <p>Now shout it from the rooftop<br />(of your new house)!</p>
                    <h3>Share!</h3>
                    <div className="social-links">
                        <a className="fb" href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//s3.amazonaws.com/${process.env.AWS_BUCKET}/${this.props.uuid}/index.html`} target="_blank"></a>
                        <a className="twitter" href={`https://twitter.com/home?status=Elizabeth%20Banks%20bragging%20about%20my%20new%20home!%20%23homeblebrag%20https%3A//s3.amazonaws.com/${process.env.AWS_BUCKET}/${this.props.uuid}/index.html`} target="_blank"></a>
                        <a className="email" onClick={this.shareEmail} href="#"></a>
                    </div>
                    <div className="continue-row">
                        <a className="start-over" href="">Start Over</a>
                    </div>
                </div>
                <div className="video-col col">
                    <div className="vid-preview">
                        <video src={`//s3.amazonaws.com/${process.env.AWS_BUCKET}/${this.props.uuid}/output.mp4`} width="100%" preload="auto" autoPlay="autoplay" controls="controls"></video>
                    </div>
                </div>
            </div>
        );
    },
});

export default ShowVideo;
