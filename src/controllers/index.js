import rootTemplate from '../views/index.art';
import loginTemplate from '../views/login.art';
import usersTemplate from '../views/users.art';
import userListTemplate from '../views/user-list.art';

const rootTemp = rootTemplate({});
const loginTemp = loginTemplate({});

/**
 * 跳转主页事件
 * @param {*} router
 * @returns
 */
const _handleSubmit = (router) => {
  return (e) => {
    /**阻止提交表单 */
    e.preventDefault();
    router.go('/index');
  };
};

/**
 * 点击保存事件
 */
const _login = () => {
  /**通过序列化表单值创建URL编码文本字符串 */
  const data = $('#user-form').serialize();

  $.ajax({
    url: '/api/user/login',
    type: 'post',
    data,
    success: function(res) {
      console.log('success');
    },
  });
};

const login = (router) => {
  return (req, res, next) => {
    res.render(loginTemp);

    /**将跳转主页的方法绑定在submit上 */
    $('#login').on('submit', _handleSubmit(router));
  };
};

/**
 * 添加用户保存事件
 */
const userSave = () => {
  const $userClose = $('#user-close');

  /**序列化表单 */
  const data = $('#user-form').serialize();

  console.log(data, 'submit')

  /**把添加的用户信息post到数据库 */
  $.ajax({
    url: '/api/user/login',
    type: 'post',
    data,
    success: function(res) {
      console.log('success')
      _list()
    },
  });

  $userClose.click();
};

/**
 *  清空输入框
 */
const clearInput = () => {
  $('#username').val('');
  $('#password').val('');
}

const _list = () => {
  $.ajax({
    url: '/api/user/list',
    success(res) {
      /**渲染list */
      $('#user-list').html(
        userListTemplate({
          data: res.data.data,
        })
      );
    },
  });
};

const root = (router) => {
  return (req, res, next) => {
    /**渲染首页 */
    res.render(rootTemp);

    /**window resize, 让首页撑满整个屏幕 */
    $(window, '.wrapper').resize();

    /**填充用户列表 */
    $('#content').html(usersTemplate());

    /**渲染list */
    _list();

    /**点击保存, 提交表单 */
    $('#user-save').on('click', userSave);
    /**重新点击, 清空输入框 */
    $('#add-user').on('click', clearInput)
  };
};

export { root, login };
