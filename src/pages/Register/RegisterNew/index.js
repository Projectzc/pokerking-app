import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, KeyboardAvoidingView, TextInput} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, Metrics, px2dp} from "../../../configs/Theme";
import md5 from "react-native-md5";
import {showToast} from "../../../utils/utils";
import {postCode, verify} from "../../../services/accountDao";
import LinearGradient from 'react-native-linear-gradient'

const reg = /^[a-zA-Z][a-zA-z0-9_@]{4,15}$/;


@connect(({RegisterNew}) => ({
    ...RegisterNew,
}))
export default class RegisterNew extends Component {

    constructor(props) {
        super(props)
        this.login_name = ''
        this.state = {
            pwd_show:true,
            password:""
        }
    }


    componentDidMount() {

    }

    render() {
        const {password} = this.state;
        return (
            <View style={{flex: 1}}>
                <View style={styles.regist_view}>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                        <View style={styles.input_view}>
                            <Image source={Images.login_gray} style={styles.login_img}/>
                            <TextInput
                                returnKeyType={'done'}
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    width: '85%',
                                    height: 50,
                                    fontSize: global.localLanguage === 'en' ? 12 : 14,
                                    color: '#999999'
                                }}
                                numberOfLines={1}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={global.lang.t('set_name')}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}
                                onChangeText={txt => {
                                    this.login_name = txt
                                }}

                            />

                        </View>
                        <View style={{
                            height: 1,
                            marginLeft: 17,
                            marginRight: 17,
                            width: Metrics.screenWidth - 34,
                            backgroundColor: "#ECECEE"
                        }}/>
                        <View style={styles.input_view}>
                            <Image source={Images.psd_gray} style={styles.login_img}/>
                            <TextInput
                                returnKeyType={'done'}
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    width: '65%',
                                    height: 50,
                                    fontSize: 14,
                                    color: '#999999'
                                }}
                                maxLength={25}
                                numberOfLines={1}
                                placeholderTextColor={'#CCCCCC'}
                                placeholder={global.lang.t('set_psd')}
                                clearTextOnFocus={true}
                                underlineColorAndroid={'transparent'}
                                value={password.trim()}
                                secureTextEntry={this.state.pwd_show}
                                onChange={txt => {
                                    this.setState({
                                        password:txt.nativeEvent.text
                                    })

                                }}

                            />

                            <View style={{flex:1}}/>
                            <TouchableOpacity activeOpacity={1} style={{marginLeft: 10,marginRight:5}} onPress={() => {
                                this.setState({
                                    pwd_show: !this.state.pwd_show
                                })
                            }}>
                                <Image style={{width: px2dp(37), height: this.state.pwd_show ? px2dp(18) : px2dp(34)}}
                                       source={this.state.pwd_show ? Images.set_eye_close : Images.set_eye}/>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>

                <TouchableOpacity
                    style={{marginTop: 54}}
                    onPress={() => {
                    let account = this.login_name.trim()
                    let password = this.state.password.trim()
                    if(!reg.test(account)){
                        showToast(global.lang.t('nickName_res'));
                        return
                    }
                    if(password.length < 6){
                        showToast(global.lang.t('pwd_length'));
                        return
                    }
                    // 查询该账户是否被注册过¶
                    verify({
                        account
                    }, ret => {

                        if (ret && ret.exist && ret.exist === 1) {
                            // 已存在
                            showToast(global.lang.t('nickName_ver'))
                        } else {
                            router.toMobileRegister({
                                account,
                                password: md5.hex_md5(password)
                            })
                        }

                    })


                }}>
                    <LinearGradient style={styles.next_btn}
                                    colors={['#E1BB8D', '#8B6941']}>
                    <Text style={{color: '#FFF', fontSize: 17}}>{global.lang.t('login_continue')}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}
