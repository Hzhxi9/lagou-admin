import './assets/styles/common.css';
import 'babel-polyfill';

import router from './routes';

/**判断登录 */
$.ajax({
    url: '/api/auth',
    type: 'GET',
    success: function(result){
        console.log(result.state,'==')
        if(result.state) router.go('/');
        else router.go('/login')
    },
    fail: function(error){
        console.log(error)
    }
})

