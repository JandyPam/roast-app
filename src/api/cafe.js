// 将src/config.js文件中暴露出的ROAST_CONFIG引进
import { ROAST_CONFIG } from './../config.js';

export default {
    /**
     * GET /api/v1/cafes
     * 向/cafes发起axios-get请求，获取全部咖啡店信息
     */
    getCafes(){
        return axios.get( ROAST_CONFIG.API_URL + '/cafes' );
    },
    /**
     * GET /api/v1/cafes/{cafeID}
     * 发出axios-get请求，获取单个咖啡店信息
     */
    getCafe ( cafeID ){
        return axios.get( ROAST_CONFIG.API_URL + '/cafes/' + cafeID );
    },
    /**
     * POST /api/v1/cafes
     * 发出aixos-post请求，请求新增一个咖啡店
     */
    postAddNewCafe (name, locations, website, description, roaster) {
        return axios.post(ROAST_CONFIG.API_URL + '/cafes',
           {
               name: name,
               locations: locations,
               website: website,
               description: description,
               roaster: roaster
           }
        );
    },
    /**
     * POST  /api/v1/cafes/{cafeID}/like
     * 定义喜欢路由
     */
    postLikeCafe (cafeID) {
        return axios.post(ROAST_CONFIG.API_URL + '/cafes/' + cafeID + '/like');
    },

    /**
     * DELETE /api/v1/cafes/{cafeID}/like
     * 定义取消喜欢路由
     */
    deleteLikeCafe (cafeID) {
        return axios.delete(ROAST_CONFIG.API_URL + '/cafes/' + cafeID + '/like');
    }
}

