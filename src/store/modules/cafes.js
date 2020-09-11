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
    cafeLoadStatus: 0,  // 跟踪对象加载状态，状态码如上
    
    cafeLikeActionStatus: 0,  //添加喜欢动作的加载状态码
    cafeUnlikeActionStatus: 0, //取消喜欢动作的加载状态码
    cafeLiked: false // 喜欢的咖啡
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
      console.log('in');
      commit('setCafeLikedStatus', false);
      commit('setCafeLoadStatus', 1);


      // var singleCafe = {
      //   address: '嘉禾路233号',
      //   city: '厦门',
      //   state: '福建',
      //   zip: 461000,
      //   latitude: 118.12320200,
      //   longitude: 24.48454900
      // };
      // commit('setCafe', singleCafe);
      // commit('setCafeLikedStatus', true);
      // commit('setCafeLoadStatus', 2);

      CafeAPI.getCafe(data.id).then(response => {
          console.log('this is store-modules-cafes.js');
          console.log(response.data);
          commit('setCafe', response.data);
          if (response.data.user_like.length > 0) {
            commit('setCafeLikedStatus', true);
          }
          commit('setCafeLoadStatus', 2);
        })
        .catch(() => {
          commit('setCafe', {});
          commit('setCafeLoadStatus', 3);
        });

    },

    // 新增咖啡店
    addCafe({ commit, state, dispatch }, data) {
      // 状态1表示开始添加
      commit('setCafeAddStatus', 1);

      CafeAPI.postAddNewCafe(data.name, data.locations, data.website, data.description, data.roaster)
      .then(function (response) {
          commit('setCafeAddStatus', 2);
          dispatch('loadCafes');
      })
      .catch(function () {
            commit('setCafeAddStatus', 3);
      });
    },
    
    // 添加喜欢
    likeCafe({commit, state}, data) {
      commit('setCafeLikeActionStatus', 1);
   
      CafeAPI.postLikeCafe(data.id)
          .then(response => {
              commit('setCafeLikedStatus', true);
              commit('setCafeLikeActionStatus', 2);
          })
          .catch(() => {
              commit('setCafeLikeActionStatus', 3);
          });
    },

    // 取消喜欢
    unlikeCafe({commit, state}, data) {
        commit('setCafeUnlikeActionStatus', 1);
    
        CafeAPI.deleteLikeCafe(data.id)
            .then(response => {
              commit('setCafeLikedStatus', false);
              commit('setCafeUnlikeActionStatus', 2);
            })
            .catch(() => {
              commit('setCafeUnlikeActionStatus', 3);
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
    },

    setCafeLikedStatus(state, status) { //设置喜欢的咖啡
      state.cafeLiked = status;
    },
    
    setCafeLikeActionStatus(state, status) { // 设置喜欢动作的状态码
      state.cafeLikeActionStatus = status;
    },
    
    setCafeUnlikeActionStatus(state, status) { // 设置取消喜欢动作的状态码
      state.cafeUnlikeActionStatus = status;
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
    },
    // 获取喜欢咖啡的状态码
    getCafeLikedStatus( state ){
      return state.cafeLiked;
    },
    // 获取喜欢动作的状态码
    getCafeLikeActionStatus( state ){
      return state.cafeLikeActionStatus;
    },
    // 获取取消喜欢动作的状态码
    getCafeUnlikeActionStatus( state ){
      return state.cafeUnlikeActionStatus;
    }
  }
}