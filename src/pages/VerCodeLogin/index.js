import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ExtArea from '../comm/ExtArea';
import {Images, Metrics, Colors} from "../../configs/Theme";
import {isStrNull, logMsg, showToast} from "../../utils/utils";
import {verify, postCode, register, login, verify_code} from "../../services/accountDao";
import CountDownButton from '../../components/CountDownButton'
import SelectPiker from "../comm/SelectPiker";
import CountryPicker,{getAllCountries} from 'react-native-country-picker-modal'
import DeviceInfo from 'react-native-device-info'
import LinearGradient from 'react-native-linear-gradient'

@connect(({VerCodeLogin}) => ({
    ...VerCodeLogin,
}))
export default class VerCodeLogin extends Component {


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
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文'],
            ext: callingCode,
            areaName:areaName,
            cca2: cca2,
        };
        this.iphone = ''
        this.vcode = ''
        props.navigation.setParams({
            onRight: () => {
                this.selectPiker && this.selectPiker.toggle()
            }
        })
    };

    onPickerSelect = (index) => {
        this.setState({
            selectedItem: index,
        })
    };

    componentDidMount() {

    }

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
            }, res => {
                // 查询该账户是否被注册过¶
                verify({
                    account: iphone,
                    country_code: ext
                }, ret => {
                    if (ret && ret.exist && ret.exist === 1) {
                        // 登录
                        login({
                            type: 'vcode',
                            mobile: iphone,
                            vcode,
                            country_code: ext
                        }, ret => {
                            showToast(global.lang.t('login_success'))
                            this.props.navigation.popToTop()
                        }, err => {

                        })
                    } else {
                        // 注册
                        showToast(global.lang.t('not_mobile'));
                        router.pop()

                    }

                }, err => {

                })
            })
        }
        else
            showToast(`${global.lang.t('fillWhole')}`);
    };


    render() {
        const {ext, areaName} = this.state;
        return (
            <View style={styles.container}>

                {/*<Text style={styles.top_txt}>{global.lang.t('sign_vscode')}</Text>*/}

                <TouchableOpacity style={styles.areaView} onPress={() => {
                    this.areaAction && this.areaAction.openModal();
                }}>
                    <CountryPicker
                        styles={{touchFlag:{
                                marginBottom: 12
                            }
                        }}
                        ref={ref => this.areaAction = ref}
                        filterable
                        closeable
                        onChange={value => {
                            logMsg(value)
                            this.setState({ areaName: value.name,
                                ext: value.callingCode ,
                                cca2: value.cca2})
                        }}
                        cca2={this.state.cca2}
                        translation="eng"
                    />

                    <Text
                        style={{width: 180, marginLeft: 8, height: 28, fontSize: 16, color: '#666666'}}>
                        {`${areaName} (+${this.state.ext})`}
                    </Text>
                    <View style={{flex: 1}}/>
                    <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>

                </TouchableOpacity>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView}>
                        <TextInput
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 230,
                                height: 50,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('cellphone')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.iphone = txt
                            }}

                        />

                    </View>
                    <View style={styles.textView}>
                        <TextInput
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 8,
                                width: 160,
                                height: 35,
                                fontSize: 16,
                                color: '#444444'
                            }}
                            maxLength={6}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('vscode')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.vcode = txt
                            }}

                        />
                        <View style={{flex: 1}}/>
                        <View style={{height: 22, width: 1, backgroundColor: '#ECECEE', marginRight: 16}}/>
                        <CountDownButton
                            disableBg={'#F3F3F3'}
                            disableColor={'#747474'}
                            style={{
                                marginRight: 8,
                                height: 50,
                                backgroundColor: 'white'
                            }}

                            enable
                            onClick={counting => {
                                let iphone = this.iphone
                                if (isStrNull(iphone)) {
                                    showToast(global.lang.t('please_input_phone'))
                                    return
                                }
                                // 查询该账户是否被注册过
                                verify({
                                    account: iphone,
                                    country_code: ext
                                }, ret => {
                                    if (ret && ret.exist && ret.exist === 1) {
                                        postCode({
                                            mobile: iphone,
                                            country_code: ext,
                                            option_type: 'login',
                                            vcode_type: "mobile",
                                        }, data => {
                                            counting(true)
                                        }, err => {
                                            showToast(err)
                                        })
                                    } else {
                                        // 注册
                                        showToast(global.lang.t('not_mobile'));
                                    }

                                }, err => {

                                })

                            }}/>

                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity style={{marginTop:54}} onPress={() => {
                    this._next();
                }}>
                    <LinearGradient colors={['#E1BB8D', '#8B6941']}
                                    style={styles.btn}>
                    <Text style={{color: '#FFF', fontSize: 18}}>{global.lang.t('login')}</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{marginLeft:17,marginRight:17,marginTop: 36, alignSelf: 'center', flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                        router.toProtocolPage()
                    }}>
                    <Text style={{color: "#AAAAAA", fontSize: 12}}>{global.lang.t('protocol1')}<Text style={{
                        color: "#444444",
                        fontSize: 12,
                        marginLeft: 8
                    }}>{`《${global.lang.t('protocol2')}》`}</Text></Text>
                </TouchableOpacity>


                <SelectPiker
                    ref={ref => this.selectPiker = ref}
                    onPickerSelect={this.onPickerSelect}
                    selectedItem={this.state.selectedItem}
                    itemList={this.state.itemList}/>


            </View>
        )
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

