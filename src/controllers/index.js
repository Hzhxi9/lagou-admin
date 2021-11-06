import { getUserList, _methods as usersMethods } from './user';
import { logout, auth } from './login';

import rootTemplate from '@/views/index.art';
import usersTemplate from '@/views/users.art';

const rootTemp = rootTemplate({});
const usersTemp = usersTemplate({});

// 观察者模式-页码
const pageWatcher = () => {
  $('body').on('changeCurPage', (e, index) => {
    console.log(index)
    getUserList(index);
  });
};

const root = router => {
  const loadIndex = res => {
    /**渲染首页 */
    res.render(rootTemp);

    /**window resize, 让首页撑满整个屏幕 */
    $(window, '.wrapper').resize();

    /**填充用户列表 */
    $('#content').html(usersTemp);

    /**渲染list */
    getUserList();

    /**页面事件绑定 */
    usersMethods();

    /**登出事件注册 */
    logout();

    /**订阅页码点击事件 */
    pageWatcher()
  };
  return (req, res, next) =>
    auth(router, () => {
      loadIndex(res);
    });
};

export default root;
