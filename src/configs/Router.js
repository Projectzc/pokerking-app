/**
 *作者：lorne
 *时间：2018/12/21
 *功能：
 */

import {Actions} from 'react-native-router-flux';
import SwitchApi from "../pages/SwitchApi";
import EventDetail from "../pages/EventDetail";
import Structure from "../pages/Structure";
import ProtocolPage from "../pages/ProtocolPage";
import {needLogin} from "../utils/utils";
import CurrentVersion from "../pages/CurrentVersion";

export default class Router {
    popTo({sceneKey, params}) {
        Actions.popTo(sceneKey, {params})
    }

    push({sceneKey, params}) {
        Actions.push(sceneKey, {params})
        console.log('当前界面类名：' + sceneKey)
    }

    pop() {
        Actions.pop()
    }

    replace({sceneKey, params}) {
        Actions.replace(sceneKey, params)
    }


    toDetail() {
        this.push({
            sceneKey: 'Detail'
        })
    }

    toRegister(param) {
        this.push({
            sceneKey: 'Register',
            params: param
        })
    }

    toLogin() {
        this.push({
            sceneKey: 'Login'
        })
    }

    toHotRaceList() {
        this.push({
            sceneKey: 'Main'
        })
    }

    toRaces() {
        this.push({
            sceneKey: 'Races'
        })
    }

    toRaceNew(event_id) {
        needLogin(() => {
            this.push({
                sceneKey: 'RaceNew',
                params: {
                    event_id
                }
            })
        })

    }

    toRaceSchedule(event) {
        needLogin(() => {
            this.push({
                sceneKey: 'RaceSchedule',
                params: {
                    event
                }
            })
        })

    }

    toCashTable() {
        this.push({
            sceneKey: 'CashTable'
        })
    }

    toQueueProcess(item) {
        needLogin(()=>{
            this.push({
                sceneKey: 'QueueProcess',
                params: {
                    item
                }
            })
        })

    }

    toFeedback(id) {
        needLogin(() => {
            this.push({
                sceneKey: 'Feedback',
                params:{
                    id
                }
            })
        })
    }

    toModifyData() {
        needLogin(() => {
            this.push({
                sceneKey: 'ModifyData'
            })
        })

    }

    toSwitchApi() {
        this.push({
            sceneKey: 'SwitchApi'
        })
    }

    toCurrentVersion() {
        this.push({
            sceneKey: 'CurrentVersion'
        })
    }

    toQueueList(item) {
        this.push({
            sceneKey: 'QueueList',
            params: {
                item
            }
        })
    }

    toInfoDetail(id) {
        this.push({
            sceneKey: 'InfoDetail',
            params: {
                id
            }
        })

    }

    toEventDetail(id, event_id) {
        this.push({
            sceneKey: 'EventDetail',
            params: {
                id,
                event_id
            }
        })
    }

    toImageGalleryPage(images, index) {
        this.push({
            sceneKey: 'ImageGallery',
            params: {
                images: images,
                index: index
            }
        })
    }

    toWebViewPage(props, url) {
        this.push({
            sceneKey: 'WebViewPage',
            params: {
                url: url
            }

        })
    }

    toStructure(pdf) {
        this.push({
            sceneKey: 'Structure',
            params: {
                pdf
            }

        })
    }

    toRaceMessage(id) {
        needLogin(() => {
            this.push({
                sceneKey: 'RaceMessage',
                params: {
                    id
                }

            })
        })

    }

    toFAQ() {
        this.push({
            sceneKey: 'FAQ'

        })
    }

    toFoundBeauti() {
        this.push({
            sceneKey: 'FoundBeauti'

        })
    }

    toNotices(refresh) {
        needLogin(() => {
            this.push({
                sceneKey: 'NoticesPage',
                params:{
                    refresh
                }
            })
        })

    }

    toCollections() {
        needLogin(() => {
            this.push({
                sceneKey: 'Collections'
            })
        })

    }

    toUploadDocument(certObjChange,data) {
        this.push({
            sceneKey: 'UploadDocument',
            params:{
                certObjChange,
                data
            }
        })

    }

    toProtocolPage() {
        this.push({
            sceneKey: 'ProtocolPage'

        })
    }

    toSearchNews() {
        this.push({
            sceneKey: 'SearchNews'

        })
    }

    toInstantList(events,refresh) {
        this.push({
            sceneKey: 'InstantList',
            params:{
                events,
                refresh
            }
        })
    }

    toRankList(applies,refresh) {
        this.push({
            sceneKey: 'RankList',
            params:{
                applies,
                refresh
            }
        })
    }

    toSetting() {
        this.push({
            sceneKey: 'Setting'

        })
    }

    toAccountSecurity() {
        needLogin(() => {
            this.push({
                sceneKey: 'AccountSecurity'

            })
        })

    }
    toBindingMobile() {
        needLogin(() => {
            this.push({
                sceneKey: 'BindingMobile'

            })
        })

    }

    toMobile() {
        needLogin(() => {
            this.push({
                sceneKey: 'Mobile'

            })
        })

    }

    toModifyPWD() {
        needLogin(() => {
            this.push({
                sceneKey: 'ModifyPWD'

            })
        })
    }

    toModifyPWDToMobile() {
        needLogin(() => {
            this.push({
                sceneKey: 'ModifyPWDToMobile'

            })
        })
    }

    toChangePhone(mobile, country_code) {
        this.push({
            sceneKey: 'ChangePhone',
            params: {
                mobile,
                country_code
            }
        })
    }

    toRegisterNew() {
        this.push({
            sceneKey: 'RegisterNew'
        })
    }

    toPwdFound() {
        this.push({
            sceneKey: 'PwdFound'
        })
    }

    toVerCodeLogin() {
        this.push({sceneKey: 'VerCodeLogin'})
    }

    toMobileRegister(params) {
        this.push({sceneKey: 'MobileRegister', params})
    }

    toSearchDateTag(searchParams) {
        this.push({sceneKey: 'SearchDateTag', params: {searchParams}})
    }

}