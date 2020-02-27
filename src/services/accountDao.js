import api from '../configs/api'
import {get, post, put, setBaseUrl, del, setToken, setLoginEmpty} from '../configs/fetch'
import {isEmpty, logMsg, isEmptyObject, getUserId, APP_VERSION} from '../utils/utils';
import dva from '../utils/dva'
import JPushModule from 'jpush-react-native'
import {initCollects} from "../pages/comm/CollectBtn";
import {Alert, DeviceEventEmitter, Platform, Linking} from 'react-native';

global.loginUser = {}

export function storageLoginUser(loginUser) {
    logMsg('登录用户数据', loginUser)
    global.storage.save({
        key: 'LoginUser',
        data: loginUser
    })
    global.loginUser = loginUser
    setToken(loginUser.access_token)

    getProfile()
    if (loginUser.user_id) {
        JPushModule.setAlias(`test_${loginUser.user_id}`, ret => {
            logMsg('jpush设置极光推送别名', ret)
        })
        getCollectionList({})

        getUnread(loginUser.user_id)
    } else {
        JPushModule.deleteAlias(ret => {
        })
        initCollects(null)
        //推出登录时，消息清除
        dva.getDispatch()({type: 'MinePage/setUnread', params: {}})
    }
}

export function initLoginUser(callback) {
    storage.load({
        key: 'LoginUser'
    }).then(ret => {
        if (isEmptyObject(global.loginUser)) {
            storageLoginUser(ret)
        }
        callback && callback()

    }).catch(err => {
        callback && callback()
    })
}

/*发送验证码*/
export function postCode(body, resolve, reject) {
    post(api.v_codes, body, (ret) => {
        resolve(ret.data);
    }, reject);
}

export function verify(body, resolve, reject) {
    get(api.verify, body, ret => {
        resolve(ret.data)
    }, reject)
}

/*获取首页banner*/
export function getHomeBanners(resolve, reject) {
    get(api.homne_banners, {}, ret => {
        resolve(ret.data)
    }, reject)
}

/*获取热门资讯列表*/
export function getInfoList(body, resolve, reject) {
    get(api.info_list, body, ret => {
        resolve(ret.data)
    }, reject)
}

/*获取热门资讯详情*/
export function getInfoDetail(body, resolve, reject) {
    get(api.info_detail(body), body, ret => {
        resolve(ret.data)
    }, reject)
}


export function register(body, resolve, reject) {
    post(api.register, body, ret => {

        storageLoginUser(ret.data)
        resolve(ret.data)
    }, reject)
}

export function login(body, resolve, reject) {
    post(api.login, body, ret => {
        storageLoginUser(ret.data)
        resolve(ret.data)
    }, reject)
}

export function change_password(body, resolve, reject) {
    post(api.change_password, body, ret => {
        storageLoginUser({})
        resolve(ret.data)
    }, reject)
}

export function verify_code(body, resolve, reject) {
    post(api.verify_vcode, body, ret => {
        resolve(ret.data)
    }, reject)
}

export function getProfile(resolve, reject) {
    if (global.loginUser && global.loginUser.user_id) {
        get(api.profile(), {}, ret => {
            let refreshLoginUser = Object.assign(global.loginUser, ret.data)
            logMsg('刷新登录User',refreshLoginUser)
            global.storage.save({
                key: 'LoginUser',
                data: refreshLoginUser
            })
            global.loginUser = refreshLoginUser
            resolve && resolve(ret.data)
            dva.getDispatch()({type: 'MinePage/setProfile', params: ret.data})

        }, reject)
    } else {
        dva.getDispatch()({type: 'MinePage/setProfile', params: {}})
    }

}

export function putProfile(body, resolve, reject) {
    put(api.profile(), body, ret => {
        dva.getDispatch()({type: 'MinePage/setProfile', params: ret.data})
        resolve(ret.data)
    }, reject)
}

export function uploadAvatar(body, resolve, reject) {
    put(api.uploadAvatar(), body, ret => {
        dva.getDispatch()({type: 'MinePage/setProfile', params: ret.data})
        resolve(ret.data)
    }, reject)
}

/*用户反馈*/
export function postFeedBacks(body, resolve, reject) {
    post(api.feed_backs, body, ret => {
        resolve(ret.data)
    }, reject)
}

/*扑克房反馈*/
export function postFeedBacksCash(cash_game, body, resolve, reject) {
    post(api.feed_backs_cash(cash_game), body, ret => {
        resolve(ret.data)
    }, reject)
}


/*查看是否收藏*/
export function isCollect(body, resolve, reject) {
    post(api.isCollect(), body, ret => {
        resolve(ret.data)
    }, reject)
}

/*收藏资讯 或者 收藏主赛*/
export function postCollect(body, resolve, reject) {
    post(api.collect_item(), body, ret => {
        resolve(ret.data)
        getCollectionList({})
    }, reject)
}

/*收藏资讯 或者 收藏主赛*/
export function postCancelCollect(body, resolve, reject) {
    post(api.cancel_collect(), body, ret => {
        resolve(ret.data)
        getCollectionList({})
    }, reject)
}

/*查看收藏列表*/
export function getCollectionList(body, resolve, reject) {
    get(api.collection_list(), body, ret => {
        resolve && resolve(ret.data)
        initCollects(ret.data.items)
    }, reject)
}

export function postChangeAccount(body, resolve, reject) {
    post(api.change_account, body, ret => {
        resolve(ret.data)
        if (body.notLogin) {
            getProfile()
        } else {
            setLoginEmpty(true)
        }
    }, reject)
}

export function postBindAccount(body, resolve, reject) {
    post(api.bind_account, body, ret => {
        resolve(ret.data)
        if (body.notLogin) {
            getProfile()
        } else {
            setLoginEmpty(true)
        }
    }, reject)
}


export function postResetPwd(body, resolve, reject) {
    post(api.reset_password, body, ret => {
        resolve(ret.data)
    }, reject)
}

export function postNotifications(body, resolve, reject) {
    post(api.post_notifications(), body, ret => {
        resolve(ret.data)
    }, reject)
}

export function postNotify(body, resolve, reject) {
    post(api.post_notify, body, ret => {
        if (ret.code === 0) {
            getProfile()
        }
        resolve(ret.data)
    }, reject)
}

export function postOffNotify(body, resolve, reject) {
    post(api.post_off_notify, body, ret => {
        if (ret.code === 0) {
            getProfile()
        }
        resolve(ret.data)
    }, reject)
}

//消息通知
export function getNotices(resolve, reject) {
    get(api.notices(), {}, ret => {
        resolve(ret.data)
    }, reject)
}

export function getUnread(user_id = getUserId(), resolve, reject) {
    get(api.unread(user_id), {}, ret => {
        dva.getDispatch()({type: 'MinePage/setUnread', params: ret.data})
        DeviceEventEmitter.emit('NoticeTab', ret.data)
        if (ret && ret.data) {
            if (ret.data.unread_count === 0) {
                JPushModule.setBadge(0, ret => {
                })
            }
        }
        resolve && resolve(ret.data)
    }, reject)
}

export function shortUrl(body, resolve, reject) {
    post(api.short_url, body, ret => {
        resolve(ret.data)
    }, reject)
}

export function getTags(resolve, reject) {
    get(api.info_tag, {page: 1}, ret => {
        resolve(ret.data)
    })
}

//Jpush删除消息
export function delCancelNoti(body, resolve, reject) {
    del(api.cancel_noti(body), body, ret => {
        resolve(ret.data)
    }, reject)
}

export function getAppVersion() {
    get(api.app_versions, {}, ret => {
        if (ret && ret.data) {
            const {ios_platform, android_platform} = ret.data
            let info = Platform.OS === 'ios' ? ios_platform : android_platform
            if (info.version !== APP_VERSION) {
                let buttons = [{
                    text: global.lang.t('cancel'),
                    style: 'cancel'
                }, {
                    text: global.lang.t('determine'),
                    onPress: () => {
                        Linking.openURL(info.download_url);
                    }
                }]
                let cancelable = !info.force_upgrade
                Alert.alert(info.title, info.content, buttons, {cancelable})
            }


        }

    })

}

export function getCertify(resolve,reject) {
    get(api.certification(''),{},ret=>{
        resolve && resolve(ret.data)
    },reject)
}

export function postCertify(body,resolve,reject) {
    post(api.certification(''),body,ret=>{
        resolve && resolve(ret.data)
    },reject)
}

export function putCertify(user_extra_id,body,resolve,reject) {
    put(api.certification(`/${user_extra_id}`),body,ret=>{
        resolve && resolve(ret.data)
    },reject)
}
