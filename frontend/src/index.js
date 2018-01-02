import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const socket = new WebSocket("ws://localhost:8080")
// socket.addEventListener('open',() => {
//     socket.send('hello')
// })


render(
    <Provider>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker();
