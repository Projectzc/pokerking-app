import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, TextInput} from 'react-native';
import {Colors, Images, Metrics, px2dp, px2sp, wh} from "../../configs/Theme";
import _ from 'lodash'
import {logMsg, showToast} from "../../utils/utils";
import {postChangeAccount, postCode, verify_code} from "../../services/accountDao";
import CountryPicker, {getAllCountries} from "react-native-country-picker-modal";
import DeviceInfo from "react-native-device-info";
import LinearGradient from 'react-native-linear-gradient'

export default class StepToChange extends Component {
    state = {
        step: 0,
        changeMobile: '',
        oldCode:''
    }

    setOldCode = (code)=>{
        this.setState({
            oldCode:code
        })
    }

    setChangeMobile = (txt) => {
        this.setState({changeMobile: txt})
    }

    renderStepView = () => {
        switch (this.state.step) {
            case 0:
                return <FirstCard
                    nextTo={this.nextTo}/>
            case 1://给旧手机发送验证码 验证是否是本人操作
                return <InputCodeCard
                    countryCode={this.props.country_code}
                    changeMobile={this.props.oldMobile}
                    close={this.close}
                    oldVerify={true}
                    setOldCode={this.setOldCode}
                    nextTo={this.nextTo}/>
            case 2://给新手机号发送验证码验证需要绑定的手机是本人
                return <InputPhoneCard
                    changeMobile={this.state.changeMobile}
                    setChangeMobile={this.setChangeMobile}
                    close={this.close}
                    countryCode={this.props.country_code}
                    nextTo={this.nextTo}/>
            case 3:
                return <InputCodeCard
                    countryCode={this.props.country_code}
                    changeMobile={this.state.changeMobile}
                    close={this.close}
                    oldCode={this.state.oldCode}
                    nextTo={this.nextTo}/>


        }
    }

    nextTo = (num) => {
        this.setState({
            step: num
        })
    }

    close = () => {
        this.props.closeModal && this.props.closeModal()
        this.nextTo(0)
    }


    render() {
        if (this.props.showModal) {
            return <View style={styles.container}>
                {this.renderStepView()}
            </View>
        } else {
            return null
        }

    }
}


const FirstCard = ({nextTo}) => (
    <View style={styles.card}>


        <Image style={{alignSelf: 'center', width: px2dp(64), height: px2dp(64), marginTop: px2dp(32)}}
               source={Images.set_exclamation}/>
        <View style={[styles.rowItem, {marginTop: px2dp(32)}]}>
            <View style={styles.tipDot}/>
            <Text style={styles.txtTip}>{global.lang.t('once')}</Text>
        </View>
        <View style={[styles.rowItem, {marginTop: px2dp(14)}]}>
            <View style={styles.tipDot}/>
            <Text style={styles.txtTip}>{global.lang.t('noChange')}</Text>
        </View>
        <View style={[styles.rowItem, {marginTop: px2dp(14),marginBottom:px2dp(5)}]}>
            <View style={styles.tipDot}/>
            <Text style={styles.txtTip}>{global.lang.t('useNewTle')}</Text>
        </View>
        <View style={{flex: 1}}/>

        <View style={styles.line}/>
        <TouchableOpacity
            onPress={() => {
                nextTo && nextTo(1)
            }}
            style={styles.btnConfirm}>
            <Text style={styles.btnConfirmTxt}>{global.lang.t('konw')}</Text>
        </TouchableOpacity>
    </View>
)

class InputPhoneCard extends Component {
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
    }


    render() {
        const {nextTo, close, setChangeMobile, changeMobile, countryCode} = this.props
        return <View style={[styles.card, {alignItems: 'center'}]}>
            <TouchableOpacity
                onPress={() => close && close()}
                style={{
                    ...wh(60, 60),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 13, right: 13
                }}>
                <Image style={{...wh(32, 32)}}
                       source={Images.right_close}/>
            </TouchableOpacity>
            <Text style={[styles.btnConfirmTxt, {
                marginTop: px2dp(74),
                marginBottom: px2dp(64)
            }]}>{global.lang.t('change_mobile')}</Text>

            <TouchableOpacity style={{height: px2dp(100), width:px2dp(492),flexDirection:'row'}}
                              onPress={() => {
                                  this.areaAction && this.areaAction.openModal();
                              }}>
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
                    {`${this.state.areaName} (+${this.state.ext})`}
                </Text>
                <View style={{flex: 1}}/>
                <Image style={{width: 6, height: 16, marginRight: 10}} source={Images.is_right}/>

            </TouchableOpacity>

            <View style={{height: px2dp(100), width: px2dp(492)}}>

                <TextInput
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    selectionColor={'#FFE9AD'}
                    placeholder={global.lang.t('input_number')}
                    placeholderTextColor={'#AAA'}
                    onChangeText={text => {
                        setChangeMobile && setChangeMobile(text)
                    }}
                    defaultValue={changeMobile}
                    style={styles.input}/>
                <View style={styles.line}/>
            </View>

            <View style={{flex: 1}}/>

            <View style={styles.line}/>
            <TouchableOpacity
                onPress={() => {
                    if (changeMobile && changeMobile.length > 1) {
                        let param = {
                            option_type: 'bind_account',
                            vcode_type: 'mobile',
                            mobile: changeMobile,
                            country_code: this.state.ext
                        }

                        postCode(param, ret => {
                            nextTo && nextTo(3)
                        })

                    } else {
                        showToast(global.lang.t('input_number'))
                    }

                }}
                style={styles.btnConfirm}>
                <Text style={styles.btnConfirmTxt}>{global.lang.t('next')}</Text>
            </TouchableOpacity>
        </View>
    }
}


class InputCodeCard extends Component {

    state = {
        count: 60,
        smsCode: ''
    }

    counting = () => {
        const {changeMobile, countryCode, oldVerify} = this.props
        let param = {
            option_type: 'bind_account',
            vcode_type: 'mobile',
            mobile: changeMobile,
            country_code: countryCode
        }
        if (oldVerify) {
            param = {
                option_type: 'change_old_account',
                vcode_type: 'mobile'
            }

        }
        postCode(param, ret => {
            this.start()
        })


    }

    start = () => {
        this.timedown = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count
                })
            } else {
                clearInterval(this.timedown)
                this.setState({
                    count: 60
                })
            }

        }, 1000)
    }

    componentWillUnmount() {
        this.timedown && clearInterval(this.timedown)
    }

    _onChange = (text) => {
        if (text.length < 7) {
            this.setState({
                smsCode: text,
            }, () => {
                if (text.length === 6) {
                    if (this.props.oldVerify) {
                        this.props.setOldCode && this.props.setOldCode(text)
                        verify_code({
                            option_type: 'change_old_account',
                            vcode: text
                        }, ret => {
                            this.props.nextTo && this.props.nextTo(2)
                        })
                    } else {
                        postChangeAccount({
                            type: 'mobile',
                            account: this.props.changeMobile,
                            country_code: this.props.countryCode,
                            new_code: text,
                            old_code:this.props.oldCode
                        }, ret => {
                            showToast(global.lang.t('changed_mobile'))
                        })
                    }

                }
            })
        }


    }

    componentDidMount() {
        if (this.props.oldVerify) {
            this.counting()
        } else {
            this.start()
        }

    }


    render() {
        const {count, smsCode} = this.state
        const {close, nextTo, changeMobile, oldVerify} = this.props

        let code0 = smsCode.substr(0, 1)
        let code1 = smsCode.substr(1, 1)
        let code2 = smsCode.substr(2, 1)
        let code3 = smsCode.substr(3, 1)
        let code4 = smsCode.substr(4, 1)
        let code5 = smsCode.substr(5, 1)

        return <View style={[styles.card, {alignItems: 'center'}]}>
            <TouchableOpacity
                onPress={() => {
                    if (oldVerify) {
                        nextTo && nextTo(1)
                    } else {
                        nextTo && nextTo(2)
                    }
                }}
                style={{
                    ...wh(60, 60),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 13, left: 13
                }}>
                <Image style={{...wh(32, 32)}}
                       source={Images.left_returnpng}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => close && close()}
                style={{
                    ...wh(60, 60),
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 13, right: 15
                }}>
                <Image style={{...wh(32, 32)}}
                       source={Images.right_close}/>
            </TouchableOpacity>
            <Text style={[styles.btnConfirmTxt, {marginTop: px2dp(54)}]}>{global.lang.t('please_input_code')}</Text>
            <Text style={{
                color: '#AAA',
                fontSize: px2dp(28),
                marginTop: px2dp(12),
                marginBottom: px2dp(28)
            }}>{global.lang.t('code_people')}{changeMobile}</Text>

            <TouchableOpacity
                disabled={count < 60}
                onPress={() => {
                    this.counting()
                }}
                >
                <LinearGradient colors={['#E1BB8D', '#8B6941']}
                                style={{
                                    paddingTop:px2dp(14),
                                    paddingBottom:px2dp(14),paddingLeft:px2dp(48),paddingRight:px2dp(48),
                                    alignItems: 'center', justifyContent: 'center', borderRadius: px2dp(4)
                                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: px2sp(28)
                    }}>{count < 60 ? `${count}${global.lang.t('time_begin')}` : global.lang.t('again_send')}</Text>
                </LinearGradient>

            </TouchableOpacity>

            <View style={{marginTop: px2dp(30), height: px2dp(88)}}>

                <View style={{flexDirection: 'row'}}>
                    <View style={[styles.smsCode, {marginLeft: 0}]}>
                        <Text style={styles.txtCode}>{code0}</Text>
                    </View>
                    <View style={styles.smsCode}>
                        <Text style={styles.txtCode}>{code1}</Text>
                    </View>
                    <View style={styles.smsCode}>
                        <Text style={styles.txtCode}>{code2}</Text>
                    </View>
                    <View style={styles.smsCode}>
                        <Text style={styles.txtCode}>{code3}</Text>
                    </View>
                    <View style={styles.smsCode}>
                        <Text style={styles.txtCode}>{code4}</Text>
                    </View>
                    <View style={styles.smsCode}>
                        <Text style={styles.txtCode}>{code5}</Text>
                    </View>
                </View>
                <TextInput
                    autoFocus
                    maxLength={6}
                    style={{height: px2dp(88), position: 'absolute', width: px2dp(88 * 4 + 30 * 3), opacity: 0}}
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    selectionColor={'#FFE9AD'}
                    onChangeText={this._onChange}
                />
            </View>

        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    card: {
        alignSelf: 'center',
        minHeight: px2dp(420),
        width: Metrics.screenWidth - 76,
        backgroundColor: '#FFFFFF',
        borderRadius: px2dp(8),
        marginTop: px2dp(256)
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(30),
        marginRight:px2dp(8)
    },
    txtTip: {
        color: Colors.txt_666,
        fontSize: px2sp(28)
    },
    tipDot: {
        backgroundColor: '#B7B7B7',
        width: px2dp(16),
        height: px2dp(16),
        borderRadius: px2dp(8),
        marginRight: px2dp(30)
    },
    line: {
        backgroundColor: '#979797',
        height: px2dp(2),
        width: '100%'
    },
    btnConfirmTxt: {
        color: '#444444',
        fontSize: px2sp(34)
    },
    btnConfirm: {
        height: px2dp(98),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        color: '#666',
        fontSize: px2sp(28),
        textAlign: 'center',
        paddingBottom: px2dp(10)
    },
    smsCode: {
        ...wh(80, 80),
        borderColor: '#AAAAAA',
        borderWidth: px2dp(2),
        marginLeft: px2dp(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtCode: {
        color: '#666666',
        fontSize: px2sp(48)
    }

})
