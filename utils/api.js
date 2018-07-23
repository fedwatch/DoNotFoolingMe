const FIREBASE = "";
const DOMAIN_NAME = "//wd.fedjs.com"
// const DOMAIN_NAME = "http://localhost/"
/*
@description Project
ESS 快速充电站
 */

const API = {
    INDEX:DOMAIN_NAME+"/",
    GET_USER_POSITION:DOMAIN_NAME+"/getUserPosition",
    GET_USER_INFO:DOMAIN_NAME+"/getUserInfo",
    GET_ESS_LIST:DOMAIN_NAME+"/getEssList",
    UPDATE_ESS_LIST:DOMAIN_NAME+"/updateEssList",
    REMOVE_ESS_LIST:DOMAIN_NAME+"/removeEssList",
    SAVE_ESS_LIST:DOMAIN_NAME+"/saveEssList",
    GET_ESS:DOMAIN_NAME+"/getEss",
    UPDATE_ESS:DOMAIN_NAME+"/updateEss",
    REMOVE_ESS:DOMAIN_NAME+"/removeEss",
    SAVE_ESS:DOMAIN_NAME+"/saveEss",
    GET_FAV_LIST:DOMAIN_NAME+"/getFavList",
    UPDATE_FAV_LIST:DOMAIN_NAME+"/updateFavList",
    SAVE_FAV_LIST:DOMAIN_NAME+"/saveFavList",
    REMOVE_FAV_LIST:DOMAIN_NAME+"/removeFavList",
    GET_FAV:DOMAIN_NAME+"/getFav",
    UPDATE_FAV:DOMAIN_NAME+"/updateFav",
    SAVE_FAV:DOMAIN_NAME+"/saveFav",
    REMOVE_FAV:DOMAIN_NAME+"/removeFav",
}

export default API;