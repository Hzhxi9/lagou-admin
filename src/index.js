import './assets/styles/common.css';

import 'babel-polyfill';

import router from './routes';

const hash = location.hash.slice(1);

router.go('/');
