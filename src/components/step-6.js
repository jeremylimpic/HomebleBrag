import React from 'react';
import { nextStep, prevStep } from '../actions/step-actions';
import { selectExcitementLevel } from '../actions/form-actions';
import classNames from 'classnames';

const Step6 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, excitement) {
        e.preventDefault();
        this.props.dispatch(selectExcitementLevel(excitement));
        this.props.dispatch(nextStep());
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    render() {
        const { excitementLevel } = this.props.answers;
        const oneClasses = classNames({ selected: excitementLevel === 1 });
        const twoClasses = classNames({ selected: excitementLevel === 2 });
        const threeClasses = classNames({ selected: excitementLevel === 3 });

        return (
            <div className="step-6">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={oneClasses} onClick={e => this.onSelect(e, 1)}>
                            <span className="label">YAY!</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={twoClasses} onClick={e => this.onSelect(e, 2)}>
                            <span className="label">YAY!!</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={threeClasses} onClick={e => this.onSelect(e, 3)}>
                            <span className="label">YAY!!!</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
            </div>
        );
    },
});

export default Step6;
