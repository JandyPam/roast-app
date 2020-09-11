/**
 * Adds the promise polyfill for IE 11
 * 安装 es6 的 promise 支持
 */
require('es6-promise').polyfill();

import Vue from 'vue';
import Vuex from 'vuex';
import { cafes } from './modules/cafes.js'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        cafes
    }
});

export default store;