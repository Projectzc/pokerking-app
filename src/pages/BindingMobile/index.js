import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import {Images, Metrics, Colors, px2dp} from "../../configs/Theme";
import {getAvatar, isStrNull, logMsg, showToast} from "../../utils/utils";
import {verify, postCode, register, login, verify_code, postBindAccount} from "../../services/accountDao";
import CountDownButton from '../../components/CountDownButton'
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal'
import DeviceInfo from 'react-native-device-info'
import md5 from "react-native-md5";
import dva from "../../utils/dva";

@connect(({BindingMobile}) => ({
    ...BindingMobile,
}))
export default class BindingMobile extends Component {
    constructor(props) {
        super(props)
        let userLocaleCountryCode = DeviceInfo.getDeviceCountry()
        const userCountryData = getAllCountries()
            .filter(country => country.cca2 === userLocaleCountryCode)
            .pop()
        let callingCode = '86'
        let areaName = 'China'
        let cca2 = userLocaleCountryCode
        if (!cca2 || !userCountryData) {
            cca2 = 'CN'
            callingCode = '86'
        } else {
            callingCode = userCountryData.callingCode
            areaName = userCountryData.name.common
        }


        this.state = {
            ext: callingCode,
            areaName: areaName,
            cca2: cca2,
        };
        this.iphone = ''
        this.vcode = ''
    };

    componentDidMount() {

    }


    render() {
        const {ext, areaName} = this.state;
        return (
            <View style={styles.register_container}>
                <TouchableOpacity style={styles.areaView} onPress={() => {
                    this.areaAction && this.areaAction.openModal();
                }}>
                    <View style={{width: 17}}/>
                    <CountryPicker
                        styles={{
                            touchFlag: {
                                marginBottom: 12
                            }
                        }}
                        ref={ref => this.areaAction = ref}
                        filterable
                        closeable
                        onChange={value => {
                            logMsg(value)
                            this.setState({
                                areaName: value.name,
                                ext: value.callingCode,
                                cca2: value.cca2
                            })
                        }}
                        cca2={this.state.cca2}
                        translation="eng"
                    />

                    <Text
                        style={{width: 180, marginLeft: 8, height: 28, fontSize: 16, color: '#666666'}}>
                        {`${areaName} (+${this.state.ext})`}
                    </Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 6, height: 16, marginRight: 17}} source={Images.is_right}/>

                </TouchableOpacity>
                <View style={{
                    height: 1,
                    width: Metrics.screenWidth,
                    backgroundColor: "#1A1B1F"
                }}/>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView}>
                        <TextInput
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 17,
                                width: '85%',
                                height: 50,
                                fontSize: 16,
                                color: '#DDDDDD'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#AAAAAA'}
                            placeholder={global.lang.t('please_input_phone')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.iphone = txt
                            }}

                        />

                    </View>
                    <View style={{
                        height: 1,
                        width: Metrics.screenWidth,
                        backgroundColor: "#1A1B1F"
                    }}/>
                    <View style={styles.textView}>
                        <TextInput
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 17,
                                width: 160,
                                height: 35,
                                fontSize: 16,
                                color: '#DDDDDD'
                            }}
                            maxLength={6}
                            numberOfLines={1}
                            placeholderTextColor={'#AAAAAA'}
                            placeholder={global.lang.t('vscode')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.vcode = txt
                            }}

                        />
                        <View style={{flex: 1}}/>

                        <CountDownButton
                            disableBg={'#AAAAAA'}
                            disableColor={'#FFFFFF'}
                            bgColor={'#FFE9AD'}
                            style={{
                                height: 50,
                                backgroundColor: '#AAAAAA'
                            }}
                            textStyle={styles.down_bind_txt}
                            enable
                            onClick={counting => {
                                let iphone = this.iphone
                                if (isStrNull(iphone)) {
                                    showToast(global.lang.t('please_input_phone'))
                                    return
                                }
                                // 查询该账户是否被注册过¶
                                verify({
                                    account: iphone,
                                    country_code: ext
                                }, ret => {

                                    if (ret && ret.exist && ret.exist === 1) {
                                        // 已存在
                                        showToast(global.lang.t('mobile_zhuce'))
                                    } else {
                                        postCode({
                                            mobile: iphone,
                                            country_code: ext,
                                            option_type: 'login',
                                            vcode_type: "mobile",
                                        }, data => {
                                            counting(true)
                                        }, err => {

                                        })

                                    }

                                }, err => {

                                })


                            }}/>

                    </View>
                </KeyboardAvoidingView>

                <View style={styles.bind_text}>
                    <Text style={{color: '#AAAAAA', fontSize: 12}}>{global.lang.t('bind_text')}</Text>
                </View>

                <TouchableOpacity style={styles.bind_complete} onPress={() => {
                    this._next();
                }}>
                    <Text style={{color: '#1A1B1F', fontSize: 17}}>{global.lang.t('bind')}</Text>
                </TouchableOpacity>

                {/*<View*/}
                {/*style={{*/}
                {/*marginLeft: 17,*/}
                {/*marginRight: 17,*/}
                {/*position: 'absolute',*/}
                {/*bottom:56, alignSelf:'center', flexDirection: 'row', alignItems: 'center'}}*/}
                {/*>*/}
                {/*<Text style={{color: "#999999", fontSize: 14}}>{global.lang.t('mobile_prompt')}</Text>*/}
                {/*</View>*/}


            </View>
        )
    };

    _next = () => {
        const {ext} = this.state;
        let iphone = this.iphone
        let vcode = this.vcode

        if (iphone.length > 1 && vcode.length > 1 && !isStrNull(ext)) {
            //核查验证码是否正确
            verify_code({
                account: iphone,
                country_code: ext,
                option_type: 'login',
                vcode_type: 'mobile',
                vcode: vcode
            }, ret => {

                let body = {
                    type: "mobile",
                    account: iphone,
                    code: vcode,
                    country_code: ext,
                    notLogin:true,//不是从登录界面
                }
                postBindAccount(body,ret=>{
                    showToast(global.lang.t('bind_success'))
                    router.pop();
                },err => {
                    showToast(global.lang.t('bind_fail'))
                });
            })
        } else {
            showToast(global.lang.t('fillWhole'))
        }

    };

    onSelectMenu = (index, subindex, data) => {
        this.setState({
            ext: data.subtitle,
            areaName: data.title
        });
    };

    changed_ext = (code, name) => {
        this.setState({
            ext: code,
            areaName: name
        })
    }
}
