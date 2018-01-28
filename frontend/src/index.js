import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

var HOST = window.location.origin.replace(/^http/, 'ws')
HOST = (HOST === 'ws://localhost:3000') ? 'ws://localhost:8080' : HOST
const socket = new WebSocket(HOST);

export default socket

let store = createStore(reducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
