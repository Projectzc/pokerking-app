/**
 *作者：lorne
 *时间：2019/1/23
 *功能：
 */

import React, {Component} from 'react'
import {Button, Text, SafeAreaView, View, Image, TouchableOpacity, Clipboard,Platform} from 'react-native'
import {Actions} from 'react-native-router-flux';
import styles from './index.style';
import {Images, Metrics} from "../../configs/Theme";
import {connect} from 'react-redux';
import {
    isEmptyObject, isStrNull, getAvatar, alertOrder, logMsg, mul, showToast, shareHost,
    shareTo
} from "../../utils/utils";
import {storageLoginUser} from "../../services/accountDao";
import {getBaseUrl} from "../../configs/fetch";

const  HEIGHT = Metrics.screenHeight;
const BAR_HEIGHT = Metrics.navBarHeight;

@connect(({Home}) => ({
    ...Home
}))
export default class Drawer extends Component {

    render() {
        const {profile} = this.props
        let avatar = isEmptyObject(profile) ? Images.default_bg : isStrNull(profile.avatar) ? Images.default_bg : {uri: profile.avatar}
        let nick_name = isEmptyObject(profile) ? global.lang.t('login') : profile.nickname;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: "#212223"}}>
                <TouchableOpacity style={styles.safe_area_view} activeOpacity={1} onPress={() => {
                    if (isEmptyObject(profile)) {
                        router.toLogin();
                    }else {
                        router.toModifyData()
                    }
                }}>
                    <Image source={getAvatar(avatar)} style={styles.person_img}/>
                    <Text style={styles.person_txt}>{nick_name.toUpperCase()}</Text>
                </TouchableOpacity>
                <View style={{height: 45}}/>
                {/*{this._item(styles.select_btn, Images.xiugaiziliao, styles.change_img, global.lang.t('modifyData'), () => {*/}
                    {/*if (isEmptyObject(profile)) {*/}
                        {/*router.toLogin();*/}
                    {/*} else {*/}
                        {/*router.toModifyData()*/}
                    {/*}*/}
                {/*})}*/}
                {this._item(styles.select_btn, Images.wenti, styles.change_img, global.lang.t('common_problem'), () => {
                    router.toFAQ();
                })}
                {this._item(styles.select_btn, Images.yijian, styles.change_img, global.lang.t('feedback'), () => {
                    if (isEmptyObject(profile)) {
                        router.toLogin();
                    } else {
                        router.toFeedback();
                    }
                })}

                {this._item(styles.select_btn, Images.about, styles.change_img_about, global.lang.t('about'), () => {
                    router.toFoundBeauti();
                })}

                {this._item(styles.select_btn, Images.feiji, styles.change_img, global.lang.t('recommend'), () => {
                    // Clipboard.setString(`${shareHost()}/loadApp`);
                    // showToast(global.lang.t("copy_download"))
                    this.props.drawClose();
                    let param = {
                        shareTitle: 'Kings Live',
                        shareText: 'Kings Live',
                        shareImage: 'http://cdn-upyun.deshpro.com/deshpro_public/kingslive.png',
                        shareLink: `${shareHost()}/loadApp`
                    };
                    shareTo(param)
                })}

                {isEmptyObject(profile)?null: <TouchableOpacity
                    activeOpacity={1}
                    style={{alignSelf:'center',position:'absolute',bottom:Number(mul(HEIGHT, 0.05))}} onPress={() => {
                    alertOrder(global.lang.t('is_drop_out'), () => {
                        storageLoginUser({})
                    });
                }}>
                    <Text style={styles.safe_area_txt}>{global.lang.t('drop_out')}</Text>
                </TouchableOpacity>}


            </SafeAreaView>
        )
    }

    _item = (itemStyle, img, imgStyle, title, onPress) => {
        return <TouchableOpacity
            activeOpacity={1}
            style={itemStyle} onPress={onPress}>
            <Image style={imgStyle} source={img}/>
            <Text style={styles.safe_area_txt}>{title}</Text>
            <View style={{flex: 1}}/>
        </TouchableOpacity>
    };
}