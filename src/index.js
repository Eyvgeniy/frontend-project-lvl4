// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// import faker from 'faker';
import gon from 'gon';
import axios from 'axios';
import routes from './routes';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import app from './app';

if (process.env.NODE_ENV !== 'production') {
	localStorage.debug = 'chat:*';
}

// console.log('it works!');
// console.log('gon', gon);

app(gon);
