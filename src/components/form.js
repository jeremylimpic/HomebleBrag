import React, { PropTypes } from 'react';
import ProgressBar from './progress-bar';
import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';
import Step4 from './step-4';
import Step5 from './step-5';
import Step6 from './step-6';
import Step7 from './step-7';
import Step8 from './step-8';

const Form = React.createClass({
    propTypes: {
        dispatch: PropTypes.func.isRequired,
        step: PropTypes.number.isRequired,
    },

    renderSteps() {
        switch (this.props.step) {
            case 1:
                return <Step1 {...this.props} />;
            case 2:
                return <Step2 {...this.props} />;
            case 3:
                return <Step3 {...this.props} />;
            case 4:
                return <Step4 {...this.props} />;
            case 5:
                return <Step5 {...this.props} />;
            case 6:
                return <Step6 {...this.props} />;
            case 7:
                return <Step7 {...this.props} />;
            case 8:
                return <Step8 {...this.props} />;
            default:
                return null;
        }
    },

    render() {
        return (
            <div className="form">
                <ProgressBar {...this.props} />
                <div className="current-step">
                    {this.renderSteps()}
                </div>
            </div>
        );
    },
});

export default Form;
