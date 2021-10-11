import rootTemplate from '../views/index.art';
import loginTemplate from '../views/login.art';
import usersTemplate from '../views/users.art'

const rootTemp = rootTemplate({});
const loginTemp = loginTemplate({});


const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault();
    router.go('/index');
  };
};

const _login = () => {
  const $btnClose = $('#user-close')

  const data = $('#user-form').serialize();
   
  $.ajax({
    url: '/api/users/login',
    type: 'post',
    data,
    success(res){
      console.log(res)
    }
  })
  $btnClose.click()
}

const root = (router) => {
  return (req, res, next) => {
    res.render(rootTemp);

    $(window, '.wrapper').resize()

    $('#content').html(usersTemplate())

    $('#user-save').on('click', _login)
  };
};

const login = (router) => {
  return (req, res, next) => {
    res.render(loginTemp);
    console.log(loginTemp);
    $('#login').on('submit', _handleSubmit(router));
  };
};

export { root, login };
