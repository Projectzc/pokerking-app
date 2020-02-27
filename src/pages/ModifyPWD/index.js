import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style'
import {Images, px2dp} from "../../configs/Theme";
import {showToast, strNotNull} from "../../utils/utils";
import {change_password} from "../../services/accountDao";
import md5 from "react-native-md5";
import LinearGradient from 'react-native-linear-gradient'

@connect(({ModifyPWD}) => ({
    ...ModifyPWD,
}))
export default class ModifyPWD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_show: true,
            old_show: true,
            old_pwd: '',
            new_pwd: ''
        }
    }

    componentDidMount() {

    }

    render() {
        const {new_pwd, new_show, old_pwd, old_show} = this.state
        return (
            <View style={{flex: 1, backgroundColor: "#161718"}}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={[styles.old_pwd_view, {marginTop: 5}]}>
                        <TextInput
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 0,
                                marginLeft: 17,
                                width: '65%',
                                height: 50,
                                fontSize: 14,
                                color: '#AAAAAA'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#DDDDDD'}
                            placeholder={global.lang.t('old_pwd')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            secureTextEntry={old_show}
                            value={old_pwd}
                            onChange={txt => {
                                this.setState({
                                    old_pwd: txt.nativeEvent.text
                                })

                            }}
                        />
                        <View style={{flex: 1}}/>
                        {old_pwd ?
                            <TouchableOpacity activeOpacity={1} style={{marginLeft: 28}} onPress={() => {
                                this.setState({old_pwd: ''})
                            }}>
                                <Image style={{width: px2dp(32), height: px2dp(32)}}
                                       source={Images.delete_pwd}/>
                            </TouchableOpacity> : null}

                        <TouchableOpacity activeOpacity={1} style={{marginLeft: 30, marginRight: 17}} onPress={() => {
                            this.setState({
                                old_show: !this.state.old_show
                            })
                        }}>
                            <Image style={{width: px2dp(36), height: this.state.old_show ? px2dp(18) : px2dp(34)}}
                                   source={this.state.old_show ? Images.set_eye_close : Images.set_eye}/>
                        </TouchableOpacity>
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
                                color: '#AAAAAA',
                            }}
                            numberOfLines={1}
                            placeholder={global.lang.t('new_pwd')}
                            placeholderTextColor={'#DDDDDD'}
                            clearTextOnFocus={true}
                            secureTextEntry={new_show}
                            underlineColorAndroid={'transparent'}
                            value={new_pwd}
                            onChange={txt => {
                                this.setState({
                                    new_pwd: txt.nativeEvent.text
                                })

                            }}
                        />
                        <View style={{flex: 1}}/>
                        {new_pwd ?
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

                <TouchableOpacity activeOpacity={1}
                                  style={{marginTop: 61}}
                                  onPress={() => {
                                      this._nextPwd()
                                  }}>
                    <LinearGradient
                        colors={['#E1BB8D', '#8B6941']}
                        style={styles.confirm_view}>
                        <Text style={styles.determine}>{global.lang.t('determine')}</Text>
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity activeOpacity={1} style={styles.iphone_pwd} onPress={() => {
                    router.toModifyPWDToMobile()
                }}>
                    <Text style={styles.iphone_change}>{global.lang.t('iphone_change')}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    _nextPwd = () => {

        const {old_pwd, new_pwd} = this.state
        if (old_pwd.length > 1 && new_pwd.length > 1) {
            // 登录
            change_password({
                type: "pwd",
                old_pwd: md5.hex_md5(old_pwd),
                new_pwd: md5.hex_md5(new_pwd)
            }, ret => {
                showToast(global.lang.t('change_pwd_success'))
                this.props.navigation.popToTop()
                router.toLogin();
            }, err => {

            })
        }
        else
            showToast(`${global.lang.t('fillWhole')}`);
    }
}
