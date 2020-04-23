// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// import faker from 'faker';
// import gon from 'gon';
// import app from './app';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store';
// import app from './app';

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render();
// app(gon);
