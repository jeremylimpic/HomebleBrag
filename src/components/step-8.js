import React from 'react';
import { submitForm } from '../actions/form-actions';
import { prevStep } from '../actions/step-actions';
import { selectCongratsLevel } from '../actions/form-actions';
import classNames from 'classnames';

const Step8 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, selection) {
        e.preventDefault();
        this.props.dispatch(selectCongratsLevel(selection));
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    onNext(e) {
        e.preventDefault();
        if (this.props.answers.congratsLevel) {
            this.props.dispatch(submitForm(this.props));
        }
    },

    render() {
        const { congratsLevel } = this.props.answers;
        const buttonClasses = classNames('step-button', { disabled: !congratsLevel });
        const oneClasses = classNames({ selected: congratsLevel === 1 });
        const twoClasses = classNames({ selected: congratsLevel === 2 });
        const threeClasses = classNames({ selected: congratsLevel === 3 });

        return (
            <div className="step-8">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={oneClasses} onClick={e => this.onSelect(e, 1)}>
                            <span className="label">Light<br /> congrats</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={twoClasses} onClick={e => this.onSelect(e, 2)}>
                            <span className="label">Medium<br /> congrats</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={threeClasses} onClick={e => this.onSelect(e, 3)}>
                            <span className="label">Heavy<br /> congrats</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
                <div className="continue-row">
                    <a href="#" className={buttonClasses} onClick={this.onNext}>Next</a>
                </div>
            </div>
        );
    },
});

export default Step8;
