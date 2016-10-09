import React from 'react';
import { nextStep, prevStep } from '../actions/step-actions';
import { selectPartyFavor } from '../actions/form-actions';
import classNames from 'classnames';

const Step5 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, selection) {
        e.preventDefault();
        this.props.dispatch(selectPartyFavor(selection));
        this.props.dispatch(nextStep());
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    render() {
        const { partyFavor } = this.props.answers;
        const drinksClasses = classNames({ selected: partyFavor === 'drinks' });
        const foodClasses = classNames({ selected: partyFavor === 'food' });
        const convoClasses = classNames({ selected: partyFavor === 'conversation' });

        return (
            <div className="step-5">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={drinksClasses} onClick={e => this.onSelect(e, 'drinks')}>
                            <span className="label">Drink</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={foodClasses} onClick={e => this.onSelect(e, 'food')}>
                            <span className="label">Eat</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={convoClasses} onClick={e => this.onSelect(e, 'conversation')}>
                            <span className="label">Talk</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
            </div>
        );
    },
});

export default Step5;
