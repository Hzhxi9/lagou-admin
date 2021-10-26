import './assets/styles/common.css'

import router from './routes';

const hash = location.hash.slice(1);

router.go('/');
