// @ts-check

import '../assets/application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import gon from 'gon';
import init from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

init(gon);
