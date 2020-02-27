import {get,post} from '../configs/fetch'

export default function request (options = { method: 'GET', data: {} }) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`)
    if(options.method==='GET'){
       return get(options.url,options.data,options.resolve,options.reject)
    }
}