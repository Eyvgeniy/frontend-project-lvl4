// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
import App from './app/App';
import store from './app/store';
import UserContext from './UserContext';
import createUserName from './utils/createUserName';

const userName = cookie.get('userName') || createUserName();
cookie.set('userName', userName);

const render = () => {
  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render();
