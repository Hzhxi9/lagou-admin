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

const login = router => {
  return (req, res, next) => {
    res.render(loginTemp);

    /**将跳转主页的方法绑定在submit上 */
    $('#signin').on('submit', _handleSubmit(router));
  };
};

export default login
