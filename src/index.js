window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

//这是工程的入口文件
import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import AMap from 'vue-amap';
import "./style/index.css";
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
    // 高德key
    key: '14b03616f6d2138127328817cc28f04c',
    // 插件集合 （插件按需引入）
    // plugin: ['AMap.Geolocation']
});

new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});