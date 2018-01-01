import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
