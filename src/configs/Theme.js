/**
 * Theme.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/5/19.
 *
 */


import {Dimensions, Platform, StatusBar, PixelRatio} from 'react-native';
import {reallySize} from "../themes/Metrics";

const {height, width} = Dimensions.get('window');
/**
 * 状态栏高度
 * @type {number}
 */
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? width === 375 && height === 812 ? 44 : 20 : 0;
/**
 * 导航栏高度
 * @type {number}
 */
const navBarHeight = Platform.OS === "ios" ? width === 375 && height === 812 ? 88 : 64 : 44;

/**
 * 底部导航栏高度
 * @type {number}
 */
const tabBarHeight = Platform.OS === "ios" ? width === 375 && height === 812 ? 84 : 55 : 55;

export function realSize(size) {
    return size * width / 375;
}

/**
 * 内容高度
 * @type {number}
 */
const PartHeight = height - (Platform.OS === 'android' ? navBarHeight + StatusBar.currentHeight : navBarHeight);

export const DEFAULT_DENSITY = 2;
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的 defaultWidth 和 defaultHeight 为对应尺寸即可.
const defaultWidth = 750;
const defaultHeight = 1334;
const w2 = defaultWidth / DEFAULT_DENSITY;
const h2 = defaultHeight / DEFAULT_DENSITY;
//缩放比例
const _scaleWidth = width / defaultWidth;
const _scaleHeight = height / defaultHeight;
const fontScale = PixelRatio.getFontScale();

/**
 * 屏幕适配,缩放size
 * @param size 设计图的尺寸
 * @returns {number}
 */
export function px2dp(size: Number) {
    let scaleWidth = width / w2;
    let scaleHeight = height / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
}

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp ,会随系统缩放比例改变，如不需要请去掉 * fontScale
 */
export function px2sp(size: Number) {
    const scale = Math.min(_scaleWidth, _scaleHeight);
    return size * scale * fontScale;
}

/**
 * 同时设置宽高
 * @param width
 * @param height
 * @returns {{width: Number, height: Number}}
 */
export function wh(width: Number, height: Number = width) {
    return {
        width: px2dp(width),
        height: px2dp(height)
    }
}


export const Metrics = {
    reallySize: reallySize,
    screenHeight: height,
    screenWidth: width,
    navBarHeight: navBarHeight,
    statusBarHeight: STATUSBAR_HEIGHT,
    PartHeight: PartHeight,
    tabBarHeight: tabBarHeight,
    toolbar: {
        height: 44,
        paddingTop: Platform.Version >= 21 ? 20 : 0,
        //barColor: favoriteColor,
        titleColor: 'white',
        titleSize: 18,
        textBtnSize: 15
    }
}

export const Images = {
    left_back: require('../asserts/left_back.jpg'),
    gray_feed: require('../asserts/races/gray_feed.png'),
    bottom: require('../asserts/home/bottom.png'),
    close: require('../asserts/home/close.png'),
    feiji: require('../asserts/home/feiji.png'),
    homepage_side: require('../asserts/home/homepage_side.png'),
    is_bottom: require('../asserts/home/is_bottom.png'),
    is_right: require('../asserts/home/is_right.png'),
    is_top: require('../asserts/home/is_top.png'),
    left: require('../asserts/home/left.png'),
    rili: require('../asserts/home/rili.png'),
    rili_gray: require('../asserts/home/rili_gray.png'),
    top: require('../asserts/home/top.png'),
    wenti: require('../asserts/home/wenti.png'),
    xiugaiziliao: require('../asserts/home/xiugaiziliao.png'),
    yduigantanhaoshixin: require('../asserts/home/yduigantanhaoshixin.png'),
    yijian: require('../asserts/home/yijian.png'),
    zixun: require('../asserts/home/zixun.png'),
    ziyuan: require('../asserts/home/ziyuan.png'),
    other_more: require('../asserts/other_more.png'),
    race_img: require('../asserts/race_img.png'),
    xianjinzhuo: require('../asserts/xianjinzhuo.png'),
    home_avatar: require('../asserts/home/home_avatar.png'),
    jinsha: require('../asserts/jinsha.png'),
    weini: require('../asserts/weini.png'),
    close_block: require('../asserts/close.png'),
    load_no_data: require('../asserts/load/load_no_data.png'),
    empty_bg: require('../asserts/empty_ticket.png'),
    web_left: require('../asserts/web_left.png'),
    web_right: require('../asserts/web_right.png'),
    web_refresh: require('../asserts/web_refresh.png'),
    web_page: require('../asserts/web_page.png'),
    shuhcu: require('../asserts/shuhcu.png'),
    jiegou: require('../asserts/jiegou.png'),
    right_gray: require('../asserts/right_gray.png'),
    default_bg: require('../asserts/default_bg.png'),
    delete_img: require('../asserts/delete.png'),
    add_image: require('../asserts/add_image.png'),
    question_bottom: require('../asserts/question_bottom.png'),
    icon_share_wechat: require('../asserts/share/weixin.png'),
    icon_share_wxcircle: require('../asserts/share/icon_share_wxcircle.png'),
    share_img: require('../asserts/share.png'),
    facebook: require('../asserts/share/facebook.png'),
    fuzhi: require('../asserts/share/fuzhi.png'),
    twitter: require('../asserts/share/tuite.png'),
    home_race: require('../asserts/home/home_race.png'),
    home_cash: require('../asserts/home/home_cash.png'),
    about: require('../asserts/about.png'),
    race_bg2: require('../asserts/race_bg2.png'),
    cash_bg: require('../asserts/cash_bg.png'),
    touanament_bg: require('../asserts/touanament_bg.png'),
    //new
    bottom_new: require('../asserts/new/bottom.png'),
    collect: require('../asserts/new/collect.png'),
    collected: require('../asserts/new/collected.png'),
    collection_gray: require('../asserts/new/collection_gray.png'),
    collected_gray: require('../asserts/new/collected_gray.png'),
    date: require('../asserts/new/date.png'),
    delete_new: require('../asserts/new/delete.png'),
    event: require('../asserts/new/event.png'),
    event_dynamics: require('../asserts/new/event_dynamics.png'),
    event_gray: require('../asserts/new/event_gray.png'),
    event_intro: require('../asserts/new/event_intro.png'),
    hot_gary: require('../asserts/new/hot_gary.png'),
    hot_races: require('../asserts/new/hot_races.png'),
    left_new: require('../asserts/new/left.png'),
    live: require('../asserts/new/live.png'),
    live_gray: require('../asserts/new/live_gray.png'),
    location: require('../asserts/new/location.png'),
    location_gary: require('../asserts/new/location_gary.png'),
    message: require('../asserts/new/message.png'),
    mine: require('../asserts/new/mine.png'),
    news: require('../asserts/new/news.png'),
    news_gray: require('../asserts/new/news_gray.png'),
    news_info: require('../asserts/new/news_info.png'),
    puke_icon: require('../asserts/new/puke_icon.png'),
    right: require('../asserts/new/right.png'),
    room: require('../asserts/new/room.png'),
    search: require('../asserts/new/search.png'),
    search2: require('../asserts/new/search2.png'),
    room_gray: require('../asserts/new/room_gray.png'),
    search_gray: require('../asserts/new/search_gray.png'),
    select_gary: require('../asserts/new/select_gary.png'),
    selected: require('../asserts/new/selected.png'),
    setting: require('../asserts/new/setting.png'),
    share: require('../asserts/new/share.png'),
    share_gray: require('../asserts/new/share_gray.png'),
    time_select: require('../asserts/new/time_select.png'),
    top_new: require('../asserts/new/top.png'),
    type_select: require('../asserts/new/type_select.png'),
    mine_gray: require('../asserts/new/mine_gray.png'),
    collection: require('../asserts/new/collection.png'),
    notice_img: require('../asserts/new/notice_img.png'),
    puke_intro: require('../asserts/new/puke_intro.png'),
    vip_img: require('../asserts/new/vip_img.png'),
    notices1: require('../asserts/new/notices1.png'),
    notices2: require('../asserts/new/notices2.png'),
    delete2: require('../asserts/new/delete2.png'),
    no_search: require('../asserts/new/no_search.png'),
    setClose: require('../asserts/new/setClose.png'),
    setOpen: require('../asserts/new/setOpen.png'),
    load_error: require('../asserts/load/load_error.png'),
    psd: require('../asserts/new/psd.png'),
    login: require('../asserts/new/login.png'),
    psd_gray: require('../asserts/new/psd_gray.png'),
    login_gray: require('../asserts/new/login_gray.png'),
    set_eye: require('../asserts/new/set_eye.png'),
    set_eye_close: require('../asserts/new/set_eye_close.png'),
    delete_pwd: require('../asserts/new/delete_pwd.png'),
    net_err: require('../asserts/new/net_err.png'),
    set_exclamation: require('../asserts/new/set_exclamation.png'),
    left_returnpng: require('../asserts/new/left_returnpng.png'),
    right_close: require('../asserts/new/right_close.png'),
    delete_collect: require('../asserts/new/delete_collect.png'),
    example_upload: require('../asserts/new/example_upload.png'),
    example_upload2: require('../asserts/new/example_upload2.png'),
    race_right:require('../asserts/races/race_right.png'),
    race_left:require('../asserts/races/race_left.png'),
    home_search:require('../asserts/home/home_search.png')

}


export const Colors = {
    _06c: '#06c8d0',
    _000: "#000000",
    _ECE: "#ECECEC",//背景色
    _333: '#333333',
    _666: '#666666',
    _999: '#999999',
    _D1D: '#D1D1D1',
    _3CB: '#3CB371',
    _00F: '#00FF00',
    _FF8: '#FF8C00',
    _02A: '#02A9EA',
    _009: '#0090C1',
    _CD5: '#CD5D67',
    _494: '#494949',//一级标题
    _818: "#818181",//二级标题
    _AEA: "#AEAEAE",//一级内容
    _B5B: "#B5B5B5",//二级内容
    _D8D: "#D8D8D8",//三级内容
    _00B: "#00BD70",//主颜色
    _BBBB: '#BBBBBB',
    _E5E5: '#E5E5E5',
    txt_666: '#666666',
    _E54: '#E54A2E',
    _CCC: '#CCCCCC',
    _FFE: '#FFE9AD',
    _998: '#998E72',
    _1A1: '#1A1B1F',
    _303: '#303236',
    _736: '#736C5B'
}

export const Styles = {
    row_center: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    column_center: {
        alignItems: 'center'
    },
    flex_center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ECECEC'
    },
    navTop: {
        height: isIphoneX ? Metrics.navBarHeight + 10 : Metrics.navBarHeight,
        width: Metrics.screenWidth,
        backgroundColor: '#1A1B1F',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.statusBarHeight
    },
    left: {
        height: 44,
        justifyContent: 'center',
        width: 90,
        paddingRight: 10,
        paddingLeft: 17
    },
    navTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    right: {
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        height: 44,
        alignItems: 'center',
        paddingLeft: 17,
        width: 90
    }
}


export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height >= 812 || dimen.width >= 812)
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight
    });
}
  
  