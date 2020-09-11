// 将src/config.js文件中暴露出的ROAST_CONFIG引进
import { ROAST_CONFIG } from './../config.js';

export default {
    /**
     * GET /api/v1/cafes
     * 向/cafes发起axios-get请求，获取全部咖啡店信息
     */
    getCafes: function(){
        return axios.get( ROAST_CONFIG.API_URL + '/cafes' );
    },
    /**
     * GET /api/v1/cafes/{cafeID}
     * 发出axios-get请求，获取单个咖啡店信息
     */
    getCafe: function( cafeID ){
        return axios.get( ROAST_CONFIG.API_URL + '/cafes/' + cafeID );
    },
    /**
     * POST /api/v1/cafes
     * 发出aixos-post请求，请求新增一个咖啡店
     */
    postAddNewCafe: function( name, address, city, state, zip ){
        return axios.post( ROAST_CONFIG.API_URL + '/cafes',
            {
                name: name, //店名
                address: address, // 地址
                city: city, // 所在城市
                state: state,  //所在省份
                zip: zip // 邮编
            }
        );
    }
}

