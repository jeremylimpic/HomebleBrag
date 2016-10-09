import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { loadStep } from '../actions/step-actions';

const ProgressBar = React.createClass({
    propTypes: {
        step: PropTypes.number.isRequired,
        answers: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
    },

    isComplete(index) {
        const { answers } = this.props;
        switch (index) {
            case 2:
                return answers.ownerType !== null;
            case 3:
                return answers.houseType !== null;
            case 4:
                return answers.ownOrRent !== null;
            case 5:
                return answers.partyFavor !== null;
            case 6:
                return answers.excitementLevel !== null;
            case 7:
                return answers.giftType !== null;
            case 8:
                return answers.congratsLevel !== null;
            default:
                return false;
        }
    },

    loadStep(index) {
        if (this.isComplete(index)) {
            this.props.dispatch(loadStep(index));
        }
    },

    render() {
        const { step } = this.props;

        const stepClasses = [
            classNames('one', {
                active: step === 2,
                complete: this.isComplete(2),
            }),
            classNames('two', {
                active: step === 3,
                complete: this.isComplete(3),
            }),
            classNames('three', {
                active: step === 4,
                complete: this.isComplete(4),
            }),
            classNames('four', {
                active: step === 5,
                complete: this.isComplete(5),
            }),
            classNames('five', {
                active: step === 6,
                complete: this.isComplete(6),
            }),
            classNames('six', {
                active: step === 7,
                complete: this.isComplete(7),
            }),
            classNames('seven', {
                active: step === 8,
                complete: this.isComplete(8),
            }),
        ];

        const headerClasses = classNames('progress-header', { noShow: step === 0 });

        const barClasses = classNames('hb-progress-bar', {
            start: step === 1,
            middle: step > 1 && step < 8,
            end: step > 8,
        });

        return (
            <div className={headerClasses}>
                <div className={barClasses}>
                    <div className="progress-step one">1. Enter Address</div>
                    <div className="progress-step two">2. Choose Options</div>
                    <div className="progress-step three">3. Preview</div>
                </div>
                <ul className={`form-steps ${(step > 1) ? '' : 'noShow'}`}>
                    <li className={stepClasses[0]} onClick={() => this.loadStep(2)}>1</li>
                    <li className={stepClasses[1]} onClick={() => this.loadStep(3)}>2</li>
                    <li className={stepClasses[2]} onClick={() => this.loadStep(4)}>3</li>
                    <li className={stepClasses[3]} onClick={() => this.loadStep(5)}>4</li>
                    <li className={stepClasses[4]} onClick={() => this.loadStep(6)}>5</li>
                    <li className={stepClasses[5]} onClick={() => this.loadStep(7)}>6</li>
                    <li className={stepClasses[6]} onClick={() => this.loadStep(8)}>7</li>
                </ul>
            </div>
        );
    },
});

export default ProgressBar;
