import api from '../configs/api'
import {get, post, postScan, put, setBaseUrl, setToken} from '../configs/fetch'
import {isEmpty, logMsg,showToast} from '../utils/utils';

/*现金桌列表*/
export function getCashGames(body,resolve, reject) {
    get(api.cash_games, body, resolve, reject)
}
/*现金桌排队进程列表*/
export function getCashQueues(body,resolve, reject) {
    get(api.cash_queues(body), body, ret => {
        resolve(ret.data)
    }, reject)
}
/*现金桌排队进程报名人列表*/
export function getCashQueuesNumber(body,resolve, reject) {
    get(api.cash_queues_number(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

export function postHotSwitch(resolve, reject) {
    post(api.hot_switch,{},resolve,reject)
}

export function postCancelApply(body,resolve, reject) {
    post(api.cancelapply(body),{},resolve,reject)
}

export function postScanApply(body,resolve, reject) {
    postScan(api.scanapplystatus,body,ret=>{
        resolve(ret)
    },reject)
}
