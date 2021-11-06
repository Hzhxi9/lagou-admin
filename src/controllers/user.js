import userListTemplate from '@/views/user-list.art';

import Page from '../data/Page';
import paging, { setPageActive } from './page';

/**
 * 获取用户列表数据
 * @param {*} page
 * @returns
 */
export const getUserList = (index = 1) => {
  console.log(index, '==index===')
  $.ajax({
    url: '/api/user',
    data: { size: Page.pageSize, page: index },
    success(res) {
      const { pages, data } = res.data;
     
      /**处理分页 */
      paging(pages, index);

      /**渲染列表 */
      showUserList(data);
    },
  });
};

/**
 * 渲染用户列表
 * @param {*} data
 */
export const showUserList = data => {
  $('#user-list').html(userListTemplate({ data }));
};

/**清空输入框 */
const clearInput = () => {
  $('#username').val('');
  $('#password').val('');
};

/**添加用户保存事件 */
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
      /**初始化当前页码数 */
      Page.setCurPage(1);
      setPageActive(1);
    },
  });
  $userClose.click();
};

const deleteUser = () => {
  const id = $(this).data('id');
  $.ajax({
    url: '/api/user',
    type: 'DELETE',
    data: { id },
    success: function () {
      getUserList();
      /**初始化当前页码数 */
      Page.setCurPage(1);
      setPageActive(1);
    },
  });
};

/**绑定事件集合 */
export const _methods = () => {
  /** 事件代理 点击删除用户 */
  $('#user-list').on('click', '#delete-user', deleteUser);

  /**点击保存, 提交表单 */
  $('#user-save').on('click', userSave);

  /**重新点击, 清空输入框 */
  $('#add-user').on('click', clearInput);
};
