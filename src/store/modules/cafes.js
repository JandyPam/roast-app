/**
 * 将cafe.js从api文件夹中引入
 */

import CafeAPI from './../../api/cafe.js';

/**
 * status = 0 -> 数据尚未加载
 * status = 1 -> 数据开始加载
 * status = 2 -> 数据加载成功
 * status = 3 -> 数据加载失败
 */
export const cafes = {
  state: {
    cafes: [], //咖啡店数组
    cafesLoadStatus: 0,  // 跟踪数组加载状态，状态码如上
    cafe: {}, //单个咖啡店对象
    cafeLoadStatus: 0  // 跟踪对象加载状态，状态码如上
  },
  actions: {
    // 加载所有咖啡店信息的方法
    loadCafes({ commit }) {
      // 提交加载状态

      // 获取前
      commit('setCafesLoadStatus', 1);

      CafeAPI.getCafes()
        .then(function (response) {
          commit('setCafes', response.data);
          // 获取成功
          commit('setCafesLoadStatus', 2);
        })
        .catch(function () {
          commit('setCafes', []);

          // 获取失败
          commit('setCafesLoadStatus', 3);
        });
    },

    // 加载单个咖啡店信息的方法
    loadCafe({ commit }, data) {
      commit('setCafeLoadStatus', 1);

      CafeAPI.getCafe(data.id)
        .then(function (response) {
          commit('setCafe', response.data);
          commit('setCafeLoadStatus', 2);
        })
        .catch(function () {
          commit('setCafe', {});
          commit('setCafeLoadStatus', 3);
        });

    },

    // 新增咖啡店
    addCafe({ commit, state, dispatch }, data) {
      // 状态1表示开始添加
      commit('setCafeAddStatus', 1);

      CafeAPI.postAddNewCafe(data.name, data.address, data.city, data.state, data.zip)
        .then(response => {
          // 状态2表示添加成功
          commit('setCafeAddStatus', 2);
          dispatch('loadCafes');
        })
        .catch(() => {
          // 状态3表示添加失败
          commit('setCafeAddStatus', 3);
        });
    }
  },
  mutations: {
    // 参数state为此模块中的state， status为传递进来的参数
    setCafesLoadStatus(state, status) { // 状态码
      state.cafesLoadStatus = status;
    },

    setCafes(state, cafes) { // 返回所有咖啡店的数据
      state.cafes = cafes;
    },

    setCafeLoadStatus(state, status) { // 状态码
      state.cafeLoadStatus = status;
    },

    setCafe(state, cafe) { // 返回的单个咖啡店的数据
      state.cafe = cafe;
    },

    setCafeAddStatus(state, status) { // 新增咖啡店数据
      state.cafeAddStatus = status;
    }
  },
  getters: {//定义获取数据的方法
    // 获取所有咖啡店信息状态码的方法
    getCafesLoadStatus(state) {
      return state.cafesLoadStatus;
    },
    // 获取所有咖啡店的方法
    getCafes(state) {
      return state.cafes;
    },
    // 获取单个咖啡店状态码的方法
    getCafeLoadStatus(state) {
      return state.cafeLoadStatus;
    },
    // 获取咖啡店的方法
    getCafe(state) {
      return state.cafe;
    },
    // 获取新增咖啡店请求的状态码
    getCafeAddStatus( state) {
      return state.cafeAddStatus;
    }
  }
}