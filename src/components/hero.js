import { PropTypes } from 'react';
/*const bubblesAddress = require('../img/bubbles-address.gif');
const bubblesQuestion1 = require('../img/bubbles-question1.gif');
const bubblesQuestion2 = require('../img/bubbles-question2.gif');
const bubblesQuestion3 = require('../img/bubbles-question3.gif');
const bubblesQuestion4 = require('../img/bubbles-question4.gif');
const bubblesQuestion5 = require('../img/bubbles-question5.gif');
const bubblesQuestion6 = require('../img/bubbles-question6.gif');
const bubblesQuestion7 = require('../img/bubbles-question7.gif');*/
const eb0 = require('../img/eb0.jpg');
const eb1 = require('../img/eb1.jpg');
const eb2 = require('../img/eb2.jpg');
const eb3 = require('../img/eb3.jpg');
const eb4 = require('../img/eb4.jpg');
const eb5 = require('../img/eb5.jpg');
const eb6 = require('../img/eb6.jpg');
const eb7 = require('../img/eb7.jpg');

/*const bubbles = [
    { src: bubblesAddress, width: 561, height: 264 },
    { src: bubblesQuestion1, width: 479, height: 245 },
    { src: bubblesQuestion2, width: 479, height: 245 },
    { src: bubblesQuestion3, width: 479, height: 245 },
    { src: bubblesQuestion4, width: 561, height: 264 },
    { src: bubblesQuestion5, width: 479, height: 245 },
    { src: bubblesQuestion6, width: 479, height: 245 },
    { src: bubblesQuestion7, width: 479, height: 245 },
];*/

const ebs = [
    { src: eb0, width: 313, height: 240, className: 'overlap' },
    { src: eb1, width: 175, height: 194 },
    { src: eb2, width: 175, height: 194 },
    { src: eb3, width: 175, height: 194 },
    { src: eb4, width: 313, height: 240, className: 'overlap' },
    { src: eb5, width: 175, height: 194 },
    { src: eb6, width: 175, height: 194 },
    { src: eb7, width: 175, height: 194 },
];


const Hero = props => {
    if (props.step === 0) {
        return (
            <div className="continue-row">
                <a href="#" onClick={props.onClick} className={`make-your-own ${props.step > 0 ? 'expanded' : ''}`}>
                    <img className="bubbles" src={require('../img/makeyourown-sayings.gif')} alt="" />
                    <span className="border-button"><i className="inner">Make your own</i></span>
                </a>
                <a className="play-again border-button" href="" onClick={playAgain}><span className="inner">Play Again</span></a>
            </div>
        );
    } else {
        //const bubblesImg = bubbles[props.step - 1];
        const ebImg = ebs[0];
        return (
            <div id="hero">
                <div className="ebs"><img {...ebImg} alt="" /></div>
            </div>
        );
    }
};

Hero.propTypes = {
    onClick: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
};

const playAgain = function(e) {
    e.preventDefault();
    const vid = document.getElementById('preview-video');
    vid.style.height = 'auto';
    document.querySelector('#preview-video video').play();
    document.querySelector('.play-again').style.visibility = 'hidden';
};

export default Hero;
