import React, {Component} from 'react';
import {View, Text, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import styles from './index.style';
import ExtArea from '../comm/ExtArea';
import {Images, Metrics, Colors, realSize, px2dp} from "../../configs/Theme";
import {getAvatar, isStrNull, showToast} from "../../utils/utils";
import {login} from "../../services/accountDao";
import SelectPiker from "../comm/SelectPiker";
import md5 from "react-native-md5";
import LinearGradient from 'react-native-linear-gradient'

@connect(({Login}) => ({
    ...Login,
}))
export default class Login extends Component {


    constructor(props) {
        super(props)

        this.state = {
            selectedItem: 1,
            itemList: ['English', '简体中文', '繁体中文']
        };
        this.userName = ''
        this.pwd = ''
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
        let account = this.userName.trim()
        let password = this.pwd
        if (account.length > 1 && password.length > 1) {
            // 登录
            login({
                type: "account",
                account,
                password: md5.hex_md5(password)
            }, ret => {
                showToast(global.lang.t('login_success'))
                this.props.navigation.popToTop()
            }, err => {

            })
        }
        else
            showToast(`${global.lang.t('fillWhole')}`);
    };


    render() {
        return (
            <View style={styles.container}>

                <Image source={getAvatar('')} style={styles.person_img}/>

                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={20}>
                    <View style={styles.textView2}>
                        <Image source={Images.login} style={styles.login_img}/>
                        <TextInput
                            returnKeyType={'done'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                width: '85%',
                                height: 50,
                                fontSize: 14,
                                color: '#999999'
                            }}
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('nameormobile')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.userName = txt
                            }}

                        />

                    </View>
                    <View style={{height: 1}}/>
                    <View style={styles.textView2}>
                        <Image source={Images.psd} style={styles.login_img}/>
                        <TextInput
                            returnKeyType={'done'}
                            style={{
                                paddingTop: 0,
                                paddingBottom: 0,
                                width: '85%',
                                height: 50,
                                fontSize: 14,
                                color: '#999999'
                            }}
                            secureTextEntry
                            numberOfLines={1}
                            placeholderTextColor={'#CCCCCC'}
                            placeholder={global.lang.t('psd')}
                            clearTextOnFocus={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={txt => {
                                this.pwd = txt
                            }}

                        />

                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity
                    style={{
                        marginTop: 54}}
                    onPress={() => {
                    this._next();
                }}>
                    <LinearGradient  colors={['#E1BB8D', '#8B6941']}
                                     style={styles.btn}>
                        <Text style={{color: '#FFF', fontSize: 17}}>{global.lang.t('login')}</Text>
                    </LinearGradient>

                </TouchableOpacity>

                <View style={{marginTop: 20, flexDirection: 'row', marginLeft: 17, marginRight: 17}}>
                    <TouchableOpacity onPress={() => {
                        router.toRegisterNew()
                    }}>
                        <Text style={{color: "#FFE9AD", fontSize: 14}}>{global.lang.t("zhuce")}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: '#AAAAAA'}} onPress={() => {
                        router.toPwdFound()
                    }}>
                        <Text style={{color: "#AAAAAA", fontSize: 12}}>{global.lang.t("forget_pwd")}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{borderBottomWidth: 1, borderBottomColor: '#FFE9AD', alignSelf: 'center', marginTop: 30}}
                    activeOpacity={1} onPress={() => {
                    router.toVerCodeLogin()
                }}>
                    <Text numberOfLines={1} style={{
                        color: '#FFE9AD', fontSize: 17
                    }}>{global.lang.t('mobile_ver')}</Text>
                </TouchableOpacity>

                <View style={{flex:1}}/>

                <TouchableOpacity
                    style={{
                        marginLeft: 17,
                        marginRight: 17,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom:Metrics.navBarHeight

                    }}
                    onPress={() => {
                        router.toProtocolPage()
                    }}>
                    <Text style={{color: "#AAAAAA", fontSize: 12}}>{global.lang.t('protocol1')}<Text style={{
                        color: "#998E72",
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

}
