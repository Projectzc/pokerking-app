import api from '../configs/api'
import {get, post, put, setBaseUrl, setToken} from '../configs/fetch'


export function mainEvents(resolve, reject) {
    get(api.main_events,{},ret=>{
        resolve(ret.data)
    },reject)
}
export function getEventInfo(body,resolve, reject) {
    get(api.event_info(body),{},ret=>{
        resolve(ret.data)
    },reject)
}