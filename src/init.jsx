import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import cookie from 'js-cookie';
import App from './app/App';
import store from './app/store';
import UserContext from './UserContext';
import createUserName from './utils/createUserName';

const init = () => {
  const userName = cookie.get('userName') || createUserName();
  cookie.set('userName', userName);
  ReactDom.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat')
  );
};

export default init;
