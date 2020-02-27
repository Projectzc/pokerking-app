import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from "../Setting/index.style";
import {isLogin, logMsg, strNotNull} from "../../utils/utils";
import {Images, Metrics} from "../../configs/Theme";
import style from './index.style'

@connect(({AccountSecurity,MinePage}) => ({
    ...AccountSecurity,...MinePage
}))
export default class AccountSecurity extends Component {


    componentDidMount() {

    }

    _line = () => {
        return (
            <View style={{width: Metrics.screenWidth, backgroundColor: "#303236", height: 1}}>
                <View style={{width: Metrics.screenWidth - 17, height: 1, backgroundColor: '#1A1B1F', marginLeft: 17}}/>
            </View>
        )
    };

    changeIphone = () => {

        const {profile} = this.props;
        if(isLogin() && strNotNull(profile.mobile)){
            router.toChangePhone(profile.mobile,profile.country_code)
        }else{
            router.toBindingMobile()
        }

    }

    changeMail=()=>{
        router.toModifyData()
    }

    changePWD=()=>{
        router.toModifyPWD()
    }

    render() {
        const {profile} = this.props;
        return (
            <View style={{flex: 1, backgroundColor: '#1A1B1F'}}>
                {this._item(global.lang.t('iphone'), profile.mobile, this.changeIphone)}
                {this._line()}
                {/*{this._item(global.lang.t('mailbox'), 'k215678@qq.com', this.changeMail)}*/}
                {/*<View style={{height:12}}/>*/}
                {this._item(global.lang.t('change_pwd'), null, this.changePWD)}
            </View>
        )
    }

    _item = (leftTxt, rightTitle, onPress) => {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.btn_view} onPress={onPress && onPress}>
                <Text style={styles.leftTxt}>{leftTxt}</Text>
                <View style={{flex: 1}}/>
                {strNotNull(rightTitle) ? <Text style={styles.rightTitle}>{rightTitle}</Text> : null}
                <Image style={style.right_img} source={Images.is_right}/>
            </TouchableOpacity>
        )
    }
}
