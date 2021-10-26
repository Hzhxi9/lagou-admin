import SMERouter from 'sme-router';

import { root, login } from '../controllers';

const router = new SMERouter('root');

router.route('/', root(router));

router.route('/login', login(router));

export default router