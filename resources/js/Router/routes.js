import Orders from '../Pages/Orders.vue';
import Main from '../Pages/Main.vue';

const routes = [
    {
        path: '/',
        component: Main,
        name: 'main'
    },
    {
        path: '/orders',
        component: Orders,
        name: 'orders'
    }
]

export default routes;
