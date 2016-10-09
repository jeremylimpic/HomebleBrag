import React from 'react';
import { nextStep, prevStep } from '../actions/step-actions';
import { selectOwnOrRent } from '../actions/form-actions';
import classNames from 'classnames';

const Step4 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, ownOrRent) {
        e.preventDefault();
        this.props.dispatch(selectOwnOrRent(ownOrRent));
        this.props.dispatch(nextStep());
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    render() {
        const { ownOrRent } = this.props.answers;
        const homeownerClasses = classNames({ selected: ownOrRent === 'home-owner' });
        const homerenterClasses = classNames({ selected: ownOrRent === 'home-renter' });

        return (
            <div className="step-4">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={homeownerClasses} onClick={e => this.onSelect(e, 'home-owner')}>
                            <span className="label">Owner</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={homerenterClasses} onClick={e => this.onSelect(e, 'home-renter')}>
                            <span className="label">Renter</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
            </div>
        );
    },
});

export default Step4;
