import SMERouter from 'sme-router';

import { root, login } from '../controllers';

console.log(login)

const router = new SMERouter('root');

router.route('/', root);

router.route('/login', login(router));

export default router