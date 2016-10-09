import React, { PropTypes } from 'react';
import { buildImageUrl } from '../utils/map-image';
import { nextStep } from '../actions/step-actions';
import { chooseAddress } from '../actions/form-actions';

const StreetViewPreview = React.createClass({
    propTypes: {
        addressPlace: PropTypes.object,
        address: PropTypes.string,
        dispatch: PropTypes.func,
    },

    confirmStreetview(e) {
        e.preventDefault();
        this.props.dispatch(nextStep());
    },

    rejectStreetview(e) {
        e.preventDefault();
        this.props.dispatch(chooseAddress());
    },

    render() {
        if (this.props.addressPlace && this.props.address.length > 0) {
            const address = this.props.addressPlace.formatted_address;
            const imageUrl = buildImageUrl(address);
            return (
                <div className="street-view-preview">
                    <img
                        src={imageUrl}
                        alt={address}
                        width="500"
                        height="300" />
                    <div className="continue-row">
                        <a href="#" onClick={this.confirmStreetview} className="step-button">Yes</a>
                        <a href="#" onClick={this.rejectStreetview} className="step-button">No</a>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    },
});

export default StreetViewPreview;
