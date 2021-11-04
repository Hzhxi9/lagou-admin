import rootTemplate from '@/views/index.art';
import usersTemplate from '@/views/users.art';
import userListTemplate from '@/views/user-list.art';

import paging, { setPageActive } from '../components/pagination';

const rootTemp = rootTemplate({});

/**
 * 添加用户保存事件
 */
const userSave = () => {
  const $userClose = $('#user-close');
  /**序列化表单 */
  const data = $('#user-form').serialize();
  /**把添加的用户信息post到数据库 */
  $.ajax({
    url: '/api/user/login',
    type: 'post',
    data,
    success: function (res) {
      getUserList();
      curPage = 1;
      setPageActive(curPage);
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
};

let pages = 0;
let curPage = 1;
let userList = [];

/**
 * 渲染用户列表
 * @param {*} data
 */
const showUserList = data => {
  $('#user-list').html(userListTemplate({ data }));
};

/**
 * 获取用户列表数据
 * @param {*} page
 * @returns
 */
export const getUserList = (page = 1) => {
  return $.ajax({
    url: '/api/user',
    data: { size: 3, page },
    success(res) {
      userList = res.data.data;
      pages = res.data.pages;
      showUserList(res.data.data);
      paging(res.data.pages, curPage);
    },
  });
};

/**绑定事件集合 */
const _methods = () => {
  /**登出事件 */
  $('#users-signout').on('click', function (e) {
    /**阻止a的默认事件 */
    $.ajax({
      url: '/api/logout',
      type: 'POST',
      async: false,
      success: function () {
        console.log('==logout');
        e.preventDefault();
        router.go('/login');
      },
    });
  });

  /** 事件代理 点击删除用户 */
  $('#user-list').on('click', '#delete-user', function (event) {
    $.ajax({
      url: '/api/user',
      type: 'DELETE',
      data: { id: $(this).data('id') },
      success: function () {
        getUserList();
        curPage = 1;
        setPageActive(curPage);
      },
    });
  });

  /**点击保存, 提交表单 */
  $('#user-save').on('click', userSave);

  /**重新点击, 清空输入框 */
  $('#add-user').on('click', clearInput);
};

const root = router => {
  const loadIndex = res => {
    /**渲染首页 */
    res.render(rootTemp);

    /**window resize, 让首页撑满整个屏幕 */
    $(window, '.wrapper').resize();

    /**填充用户列表 */
    $('#content').html(usersTemplate());

    /**渲染list */
    getUserList();

    /**页面事件绑定 */
    _methods();
  };
  return (req, res, next) => {
    /**判断登录 */
    $.ajax({
      url: '/api/auth',
      type: 'GET',
      // dataType: 'json',
      success: function (result) {
        /**
         * 这里解析不了json
         */
        console.log('====', result);
        if (result.state) loadIndex(res);
        else router.go('/login');
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };
};

export default root;
