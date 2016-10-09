import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app';
import configureStore from './store/configure';
import './style.scss';
import './externals/move.js';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('main'));
