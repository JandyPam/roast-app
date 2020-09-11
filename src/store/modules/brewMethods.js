/*
|-------------------------------------------------------------------------------
| VUEX modules/brewmethods.js
|-------------------------------------------------------------------------------
| The Vuex data store for the brew methods
*/
import BrewMethodAPI from './../../api/brewMethod.js';

export const brewMethods = {
    /**
     * Defines the state being monitored for the module
     */
    state: {
        brewMethods: [], // 冲泡方式
        brewMethodsLoadStatus: 0 //冲泡方式获取成功与否的状态码
    },
    actions: {
        // Loads all of the brew methods.
        // 获取全部冲泡信息
        loadBrewMethods({ commit }) {
            // 设置冲泡方式加载状态码
            commit('setBrewMethodsLoadStatus', 1);

            // Calls the API to load the brew methods.
            // 请求冲泡方式
            BrewMethodAPI.getBrewMethods()
                .then(function (response) {
                    // Sets the brew methods on a successful response.
                    // 设置冲泡数据获取成功的状态码和数据
                    commit('setBrewMethods', response.data);
                    commit('setBrewMethodsLoadStatus', 2);
                })
                .catch(function () {
                    // Clears the brew methods on failure.
                    // 获取失败：设置冲泡方式为空，状态码为失败
                    commit('setBrewMethods', []);
                    commit('setBrewMethodsLoadStatus', 3);
                });
        }
    },

    mutations: {
        // Sets the brew method load status.
        // 设置冲泡方式加载的状态码
        setBrewMethodsLoadStatus(state, status) {
            state.brewMethodsLoadStatus = status;
        },

        // Sets the brew methods.
        // 设置冲泡方式
        setBrewMethods(state, brewMethods) {
            state.brewMethods = brewMethods;
            console.dir('this is brewMethods.js',status);
        }
    },
    getters: {
        // Returns the brew methods.
        // 返回冲泡方式
        getBrewMethods(state) {
            return state.brewMethods;
        },

        // Returns the brew methods load status.
        // 返回冲泡方式加载的状态码
        getBrewMethodsLoadStatus(state) {
            return state.brewMethodsLoadStatus;
        }
    }
};