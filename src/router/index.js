import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./../pages/home.vue')
    },
    {
        path: '/newcafe',
        name: 'newcafe',
        component: () => import('./../pages/newcafe.vue')
    },
    {
        path: '/cafes',
        name: 'cafes',
        component: () => import('./../pages/cafes.vue')
    },
    {
        path: '/cafe',
        name: 'cafe',
        component: () => import('./../pages/cafe.vue')
    }
    // {
    //     path: '/cafes',
    //     name: 'cafes',
    //     component: () => import('pages/cafes.vue')
    // },
    // {
    //     path: '/cafes/new',
    //     name: '',
    //     component: () => import('pages/Newcafes.vue'),
    //     children: [
    //         {
    //             path: '/cafes/:id',
    //             name: 'cafe',
    //             component: () => import('pages/cafe.vue')
    //         }
    //     ]
    // }
];

export default new VueRouter({
    routes 
});