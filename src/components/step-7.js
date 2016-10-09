import React from 'react';
import { nextStep, prevStep } from '../actions/step-actions';
import { selectGiftType } from '../actions/form-actions';
import classNames from 'classnames';

const Step7 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, selection) {
        e.preventDefault();
        this.props.dispatch(selectGiftType(selection));
        this.props.dispatch(nextStep());
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    render() {
        const { giftType } = this.props.answers;
        const giftClasses = classNames({ selected: giftType === 'gift' });
        const anotherClasses = classNames({ selected: giftType === 'another-gift' });
        const differentClasses = classNames({ selected: giftType === 'different-gift' });

        return (
            <div className="step-7">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={giftClasses} onClick={e => this.onSelect(e, 'gift')}>
                            <span className="label">Gift</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={anotherClasses} onClick={e => this.onSelect(e, 'another-gift')}>
                            <span className="label">Another Gift</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={differentClasses} onClick={e => this.onSelect(e, 'different-gift')}>
                            <span className="label">Different Gift</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
            </div>
        );
    },
});

export default Step7;
