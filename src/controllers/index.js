import rootTemplate from '@/views/index.art';
import loginTemplate from '@/views/login.art';
import usersTemplate from '@/views/users.art';
import userListTemplate from '@/views/user-list.art';
import usersListPageTemplate from '@/views/users-pages.art';

const rootTemp = rootTemplate({});
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
         router.go('/index');
      },
    });
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
    success: function (res) {
      console.log('success');
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
 * 页码高亮事件
 * @param {number} index
 */
const setPageActive = index => {
  /**
   * 绑定点击事件
   * 排除第一个和最后一个li
   */
  $('#pages-list li:not(:first-child, :last-child)')
    .eq(index - 1)
    .addClass('active')
    .siblings()
    .removeClass('active');
};

/**
 * 渲染页码
 * @param {*} count
 */
const paging = count => {
  const pageArray = new Array(count);
  const htmlPage = usersListPageTemplate({ pageArray });
  $('#users-pages').html(htmlPage);
  /**页码初始化高亮 */
  setPageActive(curPage);
};

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
const getUserList = (page = 1) => {
  return $.ajax({
    url: '/api/user',
    data: { size: 10, page },
    success(res) {
      userList = res.data.data;
      pages = res.data.pages;
      showUserList(res.data.data);
      paging(res.data.pages);
    },
  });
};

const root = router => {
  return async (req, res, next) => {
    /**渲染首页 */
    res.render(rootTemp);

    /**window resize, 让首页撑满整个屏幕 */
    $(window, '.wrapper').resize();

    /**填充用户列表 */
    $('#content').html(usersTemplate());

    /**登出事件 */
    $('#users-signout').on('click', function (e) {
      /**阻止a的默认事件 */
      $.ajax({
        url: '/api/logout',
        type: 'POST',
        success: function(){
          e.preventDefault();
          router.go('/login')
        }
      })
    });

    /**
     * 事件代理
     * 点击删除用户
     */
    $('#user-list').on('click', '#delete-user', function (event) {
      $.ajax({
        url: '/api/user',
        type: 'DELETE',
        data: {
          id: $(this).data('id'),
        },
        success: function () {
          getUserList();
          curPage = 1;
          setPageActive(curPage);
        },
      });
    });

    /**点击页面翻页 */
    $('#users-pages').on('click', '#pages-list li:not(:first-child, :last-child)', function () {
      const index = $(this).index();
      curPage = index;
      getUserList(index);
      setPageActive(index);
    });

    /**上一页 */
    $('#users-pages').on('click', '#pages-list li:first-child', function () {
      if (curPage > 1) {
        curPage--;
        getUserList(curPage);
        setPageActive(curPage);
      }
    });

    /**下一页 */
    $('#users-pages').on('click', '#pages-list li:last-child', function () {
      if (curPage < pages) {
        curPage++;
        getUserList(curPage);
        setPageActive(curPage);
      }
    });

    /**渲染list */
    getUserList();

    /**点击保存, 提交表单 */
    $('#user-save').on('click', userSave);

    /**重新点击, 清空输入框 */
    $('#add-user').on('click', clearInput);
  };
};

export { root, login };
