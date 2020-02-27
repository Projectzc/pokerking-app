import React, {Component} from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity, Image, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from "../ModifyPWD/index.style";
import {Images, px2dp} from "../../configs/Theme";
import {isStrNull, showToast, strNotNull} from "../../utils/utils";
import {change_password, postCode} from "../../services/accountDao";
import CountDownButton from "../../components/CountDownButton";
import md5 from "react-native-md5";
import LinearGradient from 'react-native-linear-gradient'

@connect(({ModifyPWDToMobile}) => ({
    ...ModifyPWDToMobile
}))
export default class ModifyPWDToMobile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_show: true,
            vsCode: '',
            new_pwd: '',
            code_show: false
        }
    }

    componentDidMount() {

    }

    render() {

        const {vsCode, new_show, new_pwd, code_show} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: "#161718"}}>
                {code_show ? <View style={{
                    marginTop: 5, marginLeft: 17, marginRight: 17
                }}>
                    <Text style={{fontSize: 14, color: "#888888"}}>{`${global.lang.t('code_send')}${global.loginUser.mobile}`}</Text>
                </View> : null}

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={[styles.old_pwd_view, {marginTop: 5}]}>
                        <View style={{width:17}}/>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                width: '60%',
                                height: 50,
                                fontSize: 14,
                                color: '#DDDDDD'
                            }}
                            maxLength={20}
                            numberOfLines={1}
                            placeholderTextColor={'#AAAAAA'}
                            placeholder={global.lang.t('vscode')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            value={vsCode}
                            onChange={txt => {
                                this.setState({
                                    vsCode:txt.nativeEvent.text
                                })

                            }}
                        />
                        <View style={{flex: 1}}/>

                        <CountDownButton
                            bgColor={'#FFE9AD'}
                            disableBg={'#FFE9AD'}
                            style={{
                                height: 50,
                                backgroundColor: '#FFE9AD'
                            }}
                            textStyle={'#212325'}
                            enable
                            timerEnd={() => {
                                this.setState({code_show: false})
                            }}
                            onClick={counting => {
                                this.setState({code_show: true})
                                postCode({
                                    mobile: global.loginUser.mobile,
                                    country_code: global.loginUser.country_code,
                                    option_type: 'change_pwd',
                                    vcode_type: "mobile",
                                }, data => {

                                    counting(true)
                                }, err => {
                                    showToast(err)
                                })

                            }}/>
                    </View>

                    <View style={[styles.old_pwd_view, {marginTop: 1}]}>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 17,
                                width: '65%',
                                height: 50,
                                fontSize: 14,
                                color: '#DDDDDD'
                            }}
                            numberOfLines={1}
                            placeholder={global.lang.t('new_pwd')}
                            placeholderTextColor={'#AAAAAA'}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={new_show}
                            value={new_pwd}
                            onChange={txt => {
                                this.setState({
                                    new_pwd:txt.nativeEvent.text
                                })

                            }}
                        />
                        <View style={{flex: 1}}/>
                        {strNotNull(new_pwd) ?
                            <TouchableOpacity activeOpacity={1} style={{marginLeft: 28}} onPress={() => {
                                this.setState({new_pwd: ''})
                            }}>
                                <Image style={{width: px2dp(32), height: px2dp(32)}}
                                       source={Images.delete_pwd}/>
                            </TouchableOpacity> : null}
                        <TouchableOpacity activeOpacity={1} style={{marginLeft: 30, marginRight: 17}} onPress={() => {
                            this.setState({
                                new_show: !this.state.new_show
                            })
                        }}>
                            <Image style={{width: px2dp(36), height: this.state.new_show ? px2dp(18) : px2dp(34)}}
                                   source={this.state.new_show ? Images.set_eye_close : Images.set_eye}/>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity activeOpacity={1} style={{
                    marginTop: 61}} onPress={()=>{
                    this._determine()
                }}>
                    <LinearGradient
                        colors={['#E1BB8D', '#8B6941']}
                        style={styles.confirm_view}>
                    <Text style={styles.determine}>{global.lang.t('determine')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={styles.iphone_pwd} onPress={() => {
                    router.toModifyPWD()
                }}>
                    <Text style={styles.iphone_change}>{global.lang.t('oldPwd_change')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _determine = () =>{

        change_password({
            type : 'vcode',
            vcode:this.state.vsCode,
            new_pwd:md5.hex_md5(this.state.new_pwd.trim())
        },res=>{
            showToast(global.lang.t('change_pwd_success'))
            this.props.navigation.popToTop()
            router.toLogin();
        })
    }
}
