import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
import App from './components/App';
import UserContext from './UserContext';
import createUserName from './utils/createUserName';
import initState from '../utils/initState';
import rootReducer from './reducer';

const init = (gon) => {
  const userName = cookie.get('userName') || createUserName();
  cookie.set('userName', userName);

  const preloadedState = initState(gon);
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default init;
