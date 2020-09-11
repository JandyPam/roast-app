/**
 * Defines the API route we are using.
 * 定义请求数据的地址
 */
let api_url = '';
let app_url = '';
var gaode_maps_js_api_key = '{14b03616f6d2138127328817cc28f04c}';

// 遍历当前开发模式：开发/生产
switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://117.29.175.26:801/api/v1';
        app_url = 'http://117.29.175.26:801';
        break;
    case 'production':
        api_url = 'http://117.29.175.26:801/api/v1';
        app_url = 'http://117.29.175.26:801';
        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
}