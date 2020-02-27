/**
 * utils.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/6/1.
 *
 */
import React from 'react';
import {Alert,Linking,Platform} from 'react-native';
import _ from 'lodash'
import moment from 'moment'
import Toast from '../components/toast';
import {Images} from "../configs/Theme";
import dva from "./dva";
import {baseUrlType, getBaseUrl} from "../configs/fetch";

export const YYYYMMDD = 'YYYY-MM-DD';

const HOST = 'http://test.h5.pokerking.deshpro.com';
const THOST = 'http://h5.pokerkinglive.com';
export const APP_VERSION = '1.1'

let locations = [];//定位城市列表
export function setLocations(arr) {
  locations = arr;
}
export let loginUser = null

let following_ids = [];
export const util = _;

export function showToast(msg) {
  if (!isStrNull(msg)) {
    const toast = Toast.show(msg, {
      testID: 'deshproToast', position: 0, duration: Toast.durations.SHORT,
      shadow: false,
      onHidden: (siblingManager) => {
        Toast.hide(toast)
      }
    });
  }
}
export function shareHost() {
    if (baseUrlType() === 'production')
        return THOST;
    else
        return HOST;
}


export function isEmptyObject(e) {
  var t;
  for (t in e)
    return !1;
  return !0
}

// 记录上次点击的时间
let lastOnPressTime = 0;
/**
 * 确保在固定时间能无法响应多次事件
 * @param {Number} times
 */
export function OnSafePress(callback = () => {}, times = 1000) {
    let curOnPressTime = new Date().getTime();
    console.log('OnSafePress', curOnPressTime - lastOnPressTime );

    if (curOnPressTime - lastOnPressTime > times) {
        lastOnPressTime = curOnPressTime;
        callback()
    }
}
export function turn2MapMark(amap_location, amap_navigation_url, amap_poiid, location, title, targetAppName) {

    let lat = '', lon = '', appUri = ''
    if (strNotNull(amap_location)) {
        let arr = amap_location.split(',')
        if (arr.length === 2) {
            lon = arr[0]
            lat = arr[1]
        }
    }

    if (Platform.OS === 'ios') {
        if (targetAppName === 'gaode') {
            appUri = `iosamap://path?sourceApplication=macuahike&slat=&slon=&sname=&dlat=${lat}&dlon=${lon}&dname=${title}&dev=0&m=0&t=0`
        } else if (targetAppName === 'pingguo') {
            // http:maps.apple.com/?daddr=${lon},${lat},${title}
            appUri = `http://maps.apple.com/?daddr=${title}&ll=${amap_location}`
        }
    } else {
        appUri = `amapuri://route/plan/?dlat=${lat}&dlon=${lon}&dname=${title}&dev=0&t=0`
        // appUri = `uri.amap.com/navigation?to=${amap_location},endpoint&via=midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`
    }

    if (strNotNull(lon) && strNotNull(lat))
        Linking.openURL(appUri).catch(e => {
            console.warn(e)
            if (strNotNull(amap_navigation_url)) {
                if (Platform.OS === 'ios')
                    router.toWebViewPage('', amap_navigation_url)
                else
                    Linking.openURL(amap_navigation_url)
            }

        });
    else if (strNotNull(amap_navigation_url))
        if (Platform.OS === 'ios')
            router.toWebViewPage('', amap_navigation_url)
        else
            Linking.openURL(amap_navigation_url)

}

/**
 * 是否已关注
 * @param user_id
 */
export function isFollowing(user_id) {
  logMsg('是否关注:', following_ids, following_ids.indexOf(user_id))
  return following_ids.indexOf(user_id) > -1
}

export function logMsg(...msg) {
  if (__DEV__)
    console.log(...msg)
}

export function needLogin(callback) {
    if(isLogin()){
        callback && callback()
    }else{
        router.toLogin()
    }
}

export function isLogin() {
  return !isEmpty(global.loginUser)
}

export function getLoginUser() {
  return global.loginUser;
}

/**
 * 时间转化
 * @param date
 * @param format
 * @returns {string}
 */
export function convertDate(date, format) {
  return moment(date).format(format)
}

//UTC 时间转化
export function utcDate(utc, formate) {
    if (strNotNull(utc))
        return moment.unix(utc).format(formate)
}

export function unix_format(timestamp, time_format) {
  return moment.unix(timestamp).format(time_format)
}

/**
 * 时间戳转 YYYY-MM-DD
 * @param {*} timestamp
 */
export function unix(timestamp) {
  return moment.unix(timestamp).format(YYYYMMDD)
}

/**
 * 首页城市
 */
export function getLocations() {
  return locations;
}

export function fileName(path) {
  let index = path.lastIndexOf('/')
  return path.substr(index + 1)
}

export function showAlert(title, message) {
  Alert.alert(title, message, [{
    text: '取消',
    style: 'cancel'
  }, {
    text: '确定',
  }])
}
export function strNotNull(str) {
    if (str == undefined || str == null || str.length == 0)
        return false;
    else
        return true;
}

export function isEmpty(param) {
  return _.isEmpty(param)
}

export function isStrNull(str) {
  return str === null || str === undefined || str.length < 1;
}

export function getCurrentDate() {
    return moment();
}



export function getUserId() {
    return isEmptyObject(global.loginUser)?'':global.loginUser.user_id
}

/*金额千分转换*/
export function moneyFormat(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

export function getBg(img) {
    if(strNotNull(img)){
        return {uri:img}
    }else{
        return Images.empty_bg
    }
}


export function getAvatar(img) {
    if(strNotNull(img)){
        return img
    }else{
        return Images.default_bg
    }
}

export function shareTo(params) {
    dva.getDispatch()({type: 'Home/showShare', params:params})
}

export function getRemainTime(endTime){
    let t = endTime - Date.parse(new Date())
    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
    let days = Math.floor(t / (1000 * 60 * 60 * 24))
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    }
}

export function getSubTime(startTime,endTime){
  let t = endTime - startTime
  let seconds = Math.floor((t / 1000) % 60)
  let minutes = Math.floor((t / 1000 / 60) % 60)
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  let days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

export function alertOrder(str, callback,cancel) {
    Alert.alert(str, '', [{
        text: `${global.lang.t('cancel')}`, onPress: () => {
            cancel && cancel()
        }
    }, {
        text: `${global.lang.t('determine')}`, onPress: () => {
            callback && callback()
        }
    }])
}

/**
 * 乘法精度问题
 * @param num1
 * @param num2
 * @returns {number}
 */
export function mul(num1, num2) {
    let m = 0, s1 = num1.toString(), s2 = num2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

export function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {
    }
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {
    }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

export function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

export function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
