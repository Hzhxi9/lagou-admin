import loginTemplate from '@/views/login.art';

const loginTemp = loginTemplate({});

/**
 * 跳转主页事件
 * @param {*} router
 * @returns
 */
const _handleSubmit = router => {
  return e => {
    /**通过序列化表单值创建URL编码文本字符串 */
    e.preventDefault();
    const data = $('#signin').serialize();
    $.ajax({
      url: '/api/login',
      type: 'post',
      data,
      success: function (res) {
        /**阻止提交表单 */
        console.log(res);
        router.go('/index');
      },
    });
  };
};

const _handleLogout = router => {
  return e => {
    $.ajax({
      url: '/api/logout',
      type: 'POST',
      success: function () {
        e.preventDefault();
        router.go('/login');
      },
    });
  };
};

export const auth = (router, cb) => {
  /**判断登录 */
  $.ajax({
    url: '/api/auth',
    type: 'GET',
    // dataType: 'json',
    success: function (result) {
      /**这里解析不了json */
      console.log('====', result);
      if (result.state) cb();
      else router.go('/login');
    },
    fail: function (error) {
      console.log(error);
    },
  });
};

const login = router => {
  return (req, res, next) => {
    res.render(loginTemp);

    /**将跳转主页的方法绑定在submit上 */
    $('#signin').on('submit', _handleSubmit(router));
  };
};

export const logout = router => {
  return (req, res, next) => {
    $('#users-signout').on('click', _handleLogout(router));
  };
};

export default login;
