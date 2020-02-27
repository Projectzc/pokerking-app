import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg, showToast, storageLoginUser} from '../utils/utils';
import dva from '../utils/dva';

/*获取热门资讯列表*/
export function getMainEventList(body,resolve, reject) {
    get(api.event_list(body),body,ret=>{
        resolve(ret.data)
    },reject)
}

/*获取赛程的所有日期*/
export function getSchedulesDates(body,resolve, reject) {
    get(api.schedules_dates(body),body,ret=>{
        resolve(ret.data)
    },reject)
}
/*获取某个日期的赛程*/
export function getSchedulesEvents(body,resolve, reject) {
    get(api.schedules_events(body),body,ret=>{
        resolve(ret.data)
    },reject)
}

/*获取主赛的新闻详情*/
export function getEventDetail(body,resolve, reject) {
    get(api.event_detail(body),body,ret=>{
        resolve(ret.data)
    },reject)
}


export function infosSearch(body,resolve,reject) {
    get(api.infos_search,body,ret=>{
        resolve(ret.data)
    },reject)
}

export function historySearch( resolve, reject) {
    get(api.history_search,{},ret=>{
        resolve(ret.data)
    },reject)
}

export function removeHistorySearch(resolve, reject) {
    get(api.remove_history_search,{},ret=>{
        resolve(ret.data)
    },reject)
}