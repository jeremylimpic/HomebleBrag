import React from 'react';
import { nextStep, prevStep } from '../actions/step-actions';
import { selectHouseType } from '../actions/form-actions';
import classNames from 'classnames';

const Step3 = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        answers: React.PropTypes.object.isRequired,
    },

    onSelect(e, houseType) {
        e.preventDefault();
        this.props.dispatch(selectHouseType(houseType));
        this.props.dispatch(nextStep());
    },

    onPrev(e) {
        e.preventDefault();
        this.props.dispatch(prevStep());
    },

    render() {
        const { houseType } = this.props.answers;
        const homeClasses = classNames({ selected: houseType === 'home' });
        const apartmentClasses = classNames({ selected: houseType === 'apartment' });
        const condoClasses = classNames({ selected: houseType === 'condo' });

        return (
            <div className="step-3">
                <h3 className="sub-heading">Choose One:</h3>
                <ul className="options">
                    <li>
                        <a href="#" className={homeClasses} onClick={e => this.onSelect(e, 'home')}>
                            <span className="label">House</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={apartmentClasses} onClick={e => this.onSelect(e, 'apartment')}>
                            <span className="label">Apartment</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className={condoClasses} onClick={e => this.onSelect(e, 'condo')}>
                            <span className="label">Condo</span>
                        </a>
                    </li>
                </ul>
                <a className="back-link" href="" onClick={this.onPrev}>Back</a>
            </div>
        );
    },
});

export default Step3;
