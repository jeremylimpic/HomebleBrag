import React from 'react';
import {
    setAddress,
    setAddressAutocompleteNext,
    setAddressAutocompletePrev,
} from '../actions/form-actions';

const Address = React.createClass({
    propTypes: {
        address: React.PropTypes.string,
        dispatch: React.PropTypes.func,
        addressAutofill: React.PropTypes.array,
        addressAutofillSelection: React.PropTypes.number,
    },

    onChange() {
        this.props.dispatch(setAddress(this.refs.input.value));
    },

    onKeyDown(e) {
        const { addressAutofillSelection, addressAutofill, dispatch } = this.props;

        if (e.keyCode === 40) {
            e.preventDefault();
            if (addressAutofillSelection < addressAutofill.length - 1) {
                dispatch(setAddressAutocompleteNext());
            }
        } else if (e.keyCode === 38) {
            e.preventDefault();
            if (addressAutofillSelection > 0) {
                dispatch(setAddressAutocompletePrev());
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            dispatch(setAddress(addressAutofill[addressAutofillSelection]));
        }
    },

    onAddressClick(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.props.dispatch(setAddress(e.target.innerText.trim()));
    },

    render() {
        let predictionsList;
        if (this.props.addressAutofill.length && this.props.addressAutofill.indexOf(this.props.address) === -1) {
            const predictions = this.props.addressAutofill.map((pred, index) => (
                <li key={pred} className={index === this.props.addressAutofillSelection ? 'selected' : null}>
                    <a href="#" onClick={this.onAddressClick}>{pred}</a>
                </li>
            ));
            predictionsList = <ul className="autocomplete-list">{predictions}</ul>;
        }

        return (
            <div className="address">
                <input
                    type="text"
                    name="address"
                    id="address"
                    value={this.props.address || null}
                    ref="input"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    autoComplete="off"
                    placeholder="EG: 106 N Henry St, Brooklyn, New York 11222" />
                {predictionsList}
            </div>
        );
    },
});

export default Address;
