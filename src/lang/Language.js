/**
 *作者：lorne
 *时间：2019/1/16
 *功能：
 */
import {logMsg} from "../utils/utils";
import dva from '../utils/dva'
import { setLang } from "../configs/fetch";


export default class Language {

    langObj = require('./zh.json')

    constructor(){
      global.localLanguage = 'zh'
      storage.load({
        key: 'Language'
      }).then(ret=>{
        global.localLanguage = ret
       let timeout = setTimeout(()=>{
          this.switchLang(ret)
         clearTimeout(timeout)
        },500)

      }).catch(e=>{
        global.localLanguage = 'zh'
      })
    }

    switchLang(language){
      global.storage.save({
        key: 'Language',
        data: language,
      });

        if(language === 'en'){
            this.langObj = require('./en.json')
        }else if(language === 'zh-e'){
            this.langObj = require('./zh-e.json')
        }else {
            this.langObj = require('./zh.json')
        }
        setLang(language ==='zh-e'?'tc':language)
        global.localLanguage = language
        dva.getDispatch()({type:'common/switchLang',params:language})

    }

    t(key){
        return this.langObj[key]
    }




}
