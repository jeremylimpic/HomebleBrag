import React from 'react';
import { nextStep, prevStep } from '../actions/step-actions';
import { selectOwnerType } from '../actions/form-actions';
import classNames from 'classnames';

const Step2 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, type) {
        e.preventDefault();
        this.props.dispatch(selectOwnerType(type));
        this.props.dispatch(nextStep());
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    render() {
        const { ownerType } = this.props.answers;
        const personClasses = classNames({ selected: ownerType === 'person' });
        const coupleClasses = classNames({ selected: ownerType === 'couple' });
        const familyClasses = classNames({ selected: ownerType === 'family' });

        return (
            <div className="step-2">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={personClasses} onClick={e => this.onSelect(e, 'person')}>
                            <span className="label">Person</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={coupleClasses} onClick={e => this.onSelect(e, 'couple')}>
                            <span className="label">Couple</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={familyClasses} onClick={e => this.onSelect(e, 'family')}>
                            <span className="label">Family</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
            </div>
        );
    },
});

export default Step2;
