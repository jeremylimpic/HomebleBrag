import React, { PropTypes } from 'react';

const EmailShare = React.createClass({
    propTypes: {
        onSend: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        uuid: PropTypes.string.isRequired,
    },

    sendEmail(e) {
        e.preventDefault();
        const params = {
            friendEmail: this.refs.friendEmail.value,
            friendName: this.refs.friendName.value,
            yourName: this.refs.yourName.value,
            yourEmail: this.refs.yourEmail.value,
            uuid: this.props.uuid,
        };
        this.props.onSend(params);
        this.props.onClose();
    },

    render() {
        return (
            <div>
                <h1>Share it in an email!</h1>
                <input type="text" ref="friendEmail" placeholder="Friend's email address" />
                <input type="text" ref="friendName" placeholder="Friend's name" />
                <input type="text" ref="yourEmail" placeholder="Your email address" />
                <input type="text" ref="yourName" placeholder="Your name" />
                <button onClick={this.sendEmail}>Send it!</button>
                <button onClick={this.props.onClose}>Cancel</button>
            </div>
        );
    },
});

export default EmailShare;
