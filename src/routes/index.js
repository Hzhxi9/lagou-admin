import SMERouter from 'sme-router';

import root from '../controllers';
import login from '../controllers/login';

const router = new SMERouter('root');

/**路由守卫 */
router.use(req => {
  /**判断登录 */
  $.ajax({
    url: '/api/auth',
    type: 'GET',
    // dataType: 'json',
    success: function (result) {

      console.log(result, 'router')
      if (result.state) router.go('/index');
      else router.go('/login');
    },
    fail: function (error) {
      console.log(error);
    },
  });
});

router.route('/index', root(router));

router.route('/login', login(router));

export default router;
