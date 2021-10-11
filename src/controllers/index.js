import rootTemplate from '../views/index.art';
import loginTemplate from '../views/login.art';

const rootTemp = rootTemplate({});
const loginTemp = loginTemplate({});

const _handleSubmit = (router) => {
  return (e) => {
    e.preventDefault();
    router.go('/index');
  };
};

const root = (router) => {
  return (req, res, next) => {
    res.render(rootTemp);

    $(window, '.wrapper').resize()
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
