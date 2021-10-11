import router from './routes';

const hash = location.hash.slice(1);

console.log(hash)

router.go('/');
