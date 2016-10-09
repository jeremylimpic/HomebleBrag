import React, { PropTypes } from 'react';
import Address from './address';
import StreetViewPreview from './street-view-preview';
import { showStreetviewPreview } from '../actions/step-actions';
import { chooseAddress, validateAddress } from '../actions/form-actions';
import classNames from 'classnames';

const Step1 = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired,
        address: PropTypes.string,
        showStreetviewPreview: PropTypes.bool,
        validAddress: PropTypes.bool,
    },

    goBack(e) {
        e.preventDefault();
        this.props.dispatch(chooseAddress());
    },

    findHome(e) {
        e.preventDefault();
        if (this.props.address) {
            this.props.dispatch(validateAddress(this.props.address));
            this.props.dispatch(showStreetviewPreview());
        }
    },

    render() {
        const buttonClasses = classNames('step-button', { disabled: !this.props.address });

        if (this.props.showStreetviewPreview) {
            if (this.props.validAddress === null) {
                return (
                    <div className="step-1">
                        <h2>Looking up your home now...</h2>
                    </div>
                );
            }

            if (this.props.validAddress === false) {
                return (
                    <div className="step-1">
                        <h2>Whoops, can&apos;t find your home! <small>(on realtor.com)</small><br />Whatever, we have one you can use instead!</h2>
                        <div className="continue-row">
                            <a href="#" className={buttonClasses} onClick={this.goBack}>Next</a>
                        </div>
                    </div>
                );
            }

            return (
                <div className="step-1">
                    <h2>Is this your house?</h2>
                    <StreetViewPreview {...this.props} />
                </div>
            );
        } else {
            return (
                <div className="step-1">
                    <h2>First enter the address of your new home</h2>
                    <Address {...this.props} />
                    <div className="continue-row">
                        <a href="#" className={buttonClasses} onClick={this.findHome}>Next</a>
                    </div>
                </div>
            );
        }
    },
});

export default Step1;
